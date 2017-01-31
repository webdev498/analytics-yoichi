import React, {PropTypes} from 'react';
import {Colors} from '../../../commons/colors';
import {
  firstCharCapitalize,
  isUndefined,
  isNull
} from '../../../commons/utils/utils';

import {autoScrollTo, getPosition} from 'utils/utils';

import Cookies from 'cookies-js';
import vis from 'vis';
import {baseUrl, networkGraphDefaultOptions, hierarchicalNetwork, applyHierarchicalNetwork} from 'config';

import {createNodeObject} from './GraphNode';
import {createEdgeObject} from './GraphEdge';
import {getIcon} from './GraphUtils';

import Loader from 'components/Loader';
import ContextualMenu from 'components/ContextualMenu';

import './_network.scss';

const styles = {
  graphWrap: {
    display: 'flex',
    height: '100%'
  },
  loader: {
    position: 'absolute',
    top: '350px',
    display: 'flex',
    backgroundColor: Colors.contextBG,
    padding: '20px',
    left: '300px',
    width: '350px'
  }
};

let timeWindow = '1h',
  undoGraphCount = 0,
  physicsTrue = {
    physics: {
      stabilization: true
    }
  },
  physicsFalse = {
    physics: false
  },
  emptyNodesEdges = {
    nodes: [],
    edges: []
  };

export function generateDataFromAssetDetails(data) {
  const assetData = [];
  const nodes = [];

  nodes[0] = {
    id: data.id,
    nodeId: data.id,
    label: data.info.name,
    type: data.type,
    metadata: data.info
  };

  assetData[0] = {
    nodes,
    edges: []
  };

  return assetData;
}

function getActionsByTypes(actionsData) {
  let nodeTypes = [],
    lookup = {},
    actions = [];
  actionsData.forEach((action) => {
    let types = action.types;
    types.forEach((type) => {
      if (!(type in lookup)) {
        lookup[type] = 1;
        const obj = {
          type: type
        };

        nodeTypes.push(obj);
      }
    });
  });

  nodeTypes.forEach((node) => {
    let actionObject = {},
      nodeType = (node.type).toLowerCase();
    actionObject.nodeType = nodeType;
    actionObject.actions = [];

    actionsData.forEach((action) => {
      if ((action.types).includes(nodeType)) {
        let tempObj = {
          reportId: action.name,
          targetType: action.targetType,
          label: action.label,
          parameters: action.parameters,
          actionType: action.actionType
        };
        actionObject.actions.push(tempObj);
      }
    });

    actions.push(actionObject);
  });

  return actions;
}

function isNodeOrEdgeAlreadyExists(array, id) {
  let exists = false;
  array.forEach((value) => {
    if (value.id === id) {
      exists = true;
    }
  });
  return exists;
}

function displayActionAsSelected(actionsCount, actionId) {
  for (let j = 0; j < actionsCount; j++) {
    let tempId = 'action' + j;
    let downarrowId = 'downarrow' + j;

    if (tempId === actionId) {
      document.getElementById(tempId).style.backgroundColor = Colors.selectedActionBG;
      if (document.getElementById(downarrowId) !== undefined &&
        document.getElementById(downarrowId) !== null) {
        document.getElementById(downarrowId).style.backgroundColor = Colors.selectedActionBG;
      }
    }
    else {
      document.getElementById(tempId).style.backgroundColor = 'transparent';
      if (document.getElementById(downarrowId) !== undefined &&
        document.getElementById(downarrowId) !== null) {
        document.getElementById(downarrowId).style.backgroundColor = 'transparent';
      }
    }
  }
}

function displayNotificationMessage(message, actionId) {
  let position = getPosition(document.getElementById(actionId));
  document.getElementById('notification-message').innerHTML = message;
  document.getElementById('notification-message').style.top = (position.y - 85) + 'px';
  ANIMATIONS.fadeIn(document.getElementById('notification-message'), {
    duration: 2,
    complete: function() {
      document.getElementById('notification-message').style.display = 'block';

      ANIMATIONS.fadeOut(document.getElementById('notification-message'), {
        duration: 3000,
        complete: function() {
          document.getElementById('notification-message').style.display = 'none';
        }
      });
    }
  });
}

function openFullMalwareReport(fullMalwareReportLink) {
  if (fullMalwareReportLink !== '') {
    window.open(baseUrl + fullMalwareReportLink);
  }
}

class NetworkGraph extends React.Component {
  static propTypes = {
    duration: PropTypes.string,
    params: PropTypes.object,
    broadcastEvent: PropTypes.func
  }

  constructor(props) {
    super(props);
    const {duration, params} = this.props,
      alertDate = params.date;

    this.nodeObjects = {};
    this.edgeObjects = {};
    this.decreasePositionBy = 120;

    this.state = {
      nodes: [],
      edges: [],
      previousNodesEdges: emptyNodesEdges,
      originalNodesEdges: emptyNodesEdges,
      duration: duration,
      alertDate: alertDate,
      isFetching: false, // This flag will get removed after started using fetchApiData function from props object
      showContextMenu: false,
      showUndoResetButtons: false,
      nodesListStatus: 'default',
      selectedNodeDetails: '',
      selectedNode: '',
      selectedNodesForExtendingGraph: [],
      actionsData: [],
      loaderText: '',
      loadAgain: true
    };

    this.deselectNode = this.deselectNode.bind(this);
    this.deselectEdge = this.deselectEdge.bind(this);
    this.setHoverBlurNodeImage = this.setHoverBlurNodeImage.bind(this);

    this.loadContextMenu = this.loadContextMenu.bind(this);
    this.loadNodeEdgeContextMenu = this.loadNodeEdgeContextMenu.bind(this);

    this.loadGraph = this.loadGraph.bind(this);
    this.extendGraph = this.extendGraph.bind(this);
    this.fetchExtendedNodes = this.fetchExtendedNodes.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
    this.undoOrResetGraph = this.undoOrResetGraph.bind(this);
    this.isGraphExtended = this.isGraphExtended.bind(this);
    this.updateNodeAndEdgeObjects = this.updateNodeAndEdgeObjects.bind(this);

    this.network = null;
  }

  componentWillReceiveProps(nextProps) {
    const {props} = this;

    if (nextProps.eventData && (nextProps.eventData !== props.eventData)) {
      const {id} = nextProps.eventData;

      if (id) {
        this.deselectNodes(this.network);
        this.network.setSelection({nodes: [], edges: []});
      }

      if (this.nodeObjects[id]) {
        let nodeDetails = {
          network: this.network,
          nodeID: id,
          selected: 'node'
        };
        this.network.setSelection({nodes: [id], edges: []});
        this.loadNodeContextMenu(nodeDetails);
      }
    }
  }

  getNodesEdges(data) {
    let nodes = [],
      edges = [],
      dataNodes = data.nodes,
      dataEdges = data.edges;

    if (!isUndefined(dataNodes)) {
      dataNodes.forEach((dataNode) => {
        let nodeId = dataNode.nodeId ? dataNode.nodeId : dataNode.id;
        if (isUndefined(this.nodeObjects[nodeId])) {
          dataNode.nodeTypeDisplay = dataNode.type ? firstCharCapitalize(dataNode.type) : '';
          let nodeObject = createNodeObject(dataNode);
          nodes.push(nodeObject);
          this.nodeObjects[nodeId] = nodeObject;
        }
      });
    }

    if (!isUndefined(dataEdges)) {
      let alreadyAddedEdges = [];
      dataEdges.forEach((dataEdge) => {
        if (isUndefined(this.edgeObjects[dataEdge.id]) && !isNodeOrEdgeAlreadyExists(alreadyAddedEdges, dataEdge.id)) {
          let edgesInSameDirection = [];
          dataEdges.forEach((edgeInSameDirection) => {
            if (dataEdge.id !== edgeInSameDirection.id &&
              dataEdge.source === edgeInSameDirection.source &&
              dataEdge.target === edgeInSameDirection.target) {
              edgesInSameDirection.push(edgeInSameDirection);
              alreadyAddedEdges.push(edgeInSameDirection);
            }
          });

          let edgeObject = createEdgeObject(dataEdge, edgesInSameDirection);
          edges.push(edgeObject);
          this.edgeObjects[dataEdge.target] = edgeObject;
          this.edgeObjects[edgeObject.id] = edgeObject;
        }
      });
    }

    return {
      'nodes': nodes,
      'edges': edges
    };
  }

  updateNodeAndEdgeObjects(updatedNodes, updatedEdges) {
    let tempNodeObjects = {},
      tempEdgeObjects = {};

    for (let key in this.nodeObjects) {
      if (!isUndefined(updatedNodes)) {
        updatedNodes.forEach((updatedNode) => {
          let nodeId = updatedNode.nodeId ? updatedNode.nodeId : updatedNode.id;
          if (nodeId === key) {
            tempNodeObjects[key] = this.nodeObjects[key];
            tempEdgeObjects[key] = this.edgeObjects[key];// Remove other targets from edgeObjects
          }
        });
      }
    }

    this.nodeObjects = Object.assign({}, tempNodeObjects);

    for (let key in this.edgeObjects) {
      if (!isUndefined(updatedEdges)) {
        updatedEdges.forEach((updatedEdge) => {
          if (updatedEdge.id === key) {
            tempNodeObjects[key] = this.nodeObjects[key];
            tempEdgeObjects[key] = this.edgeObjects[key];// Remove other targets from edgeObjects
          }
        });
      }
    }
    this.edgeObjects = Object.assign({}, tempEdgeObjects);
  }

  mergeMultipleGraphs(nodes, edges, data) {
    let isGraphExtended = false;

    data.forEach((graph) => {
      let nodesEdges = this.getNodesEdges(graph);

      if (!isUndefined(nodesEdges.nodes)) {
        nodesEdges.nodes.forEach((node) => {
          if (isNodeOrEdgeAlreadyExists(nodes, node.id) === false) {
            nodes.push(node);
            isGraphExtended = true;
          }
        });
      }

      if (!isUndefined(nodesEdges.edges)) {
        nodesEdges.edges.forEach((edge) => {
          if (isNodeOrEdgeAlreadyExists(edges, edge.id) === false) {
            edges.push(edge);
            isGraphExtended = true;
          }
        });
      }
    });
    return {
      nodes: nodes,
      edges: edges,
      isGraphExtended: isGraphExtended
    };
  }

  setHoverBlurNodeImage(event, nodeID, node) {
    let selectedNodesForExtendingGraph = this.state.selectedNodesForExtendingGraph;

    if (!isUndefined(this.nodeObjects[nodeID])) {
      node.setOptions({
        image: getIcon(this.nodeObjects[nodeID].type, this.nodeObjects[nodeID].status,
          event === 'hover' ? 'HOVER' : 'INACTIVE')
      });
      if (!isUndefined(selectedNodesForExtendingGraph)) {
        selectedNodesForExtendingGraph.forEach((selectedNode) => {
          if (selectedNode.nodeID === nodeID) {
            node.setOptions({
              image: getIcon(this.nodeObjects[nodeID].type, this.nodeObjects[nodeID].status, 'SELECTED')
            });
          }
        });
      }
    }
    return node;
  }

  deselectNode(network) {
    return (event) => {
      this.deselectNodes(network);
    };
  }

  deselectNodes(network) {
    let i = 0;
    for (let obj in this.nodeObjects) {
      let deselectedNode = this.nodeObjects[obj],
        node = network.body.nodes[deselectedNode.id];

      node.setOptions({
        image: getIcon(deselectedNode.type, deselectedNode.status, 'INACTIVE')
      });

      if (i === 0) {
        this.deselect(deselectedNode);
        this.toggleHighlightAnomalyChart(deselectedNode, false);
      }
      i++;
    }
  }

  deselectEdge() {
    return (event) => {
      let i = 0;
      for (let edgeObject in this.edgeObjects) {
        let deselectedEdge = this.edgeObjects[edgeObject];

        if (!isUndefined(deselectedEdge)) {
          if (i === 0) {
            this.deselect(deselectedEdge);
          }
          i++;
        }
      }
    };
  }

  deselect(deselected) {
    if (!isUndefined(deselected)) {
      this.setState({
        loadAgain: false,
        showContextMenu: false,
        selectedNodeDetails: '',
        actions: '',
        selectedNode: '',
        selectedNodesForExtendingGraph: []
      });
      document.getElementById('actions').innerHTML = '';
      // document.getElementById('refreshData').style.marginLeft = 'auto';
    }
  }

  loadContextMenu(network, contextMenuType) {
    return (event) => {
      let listHTML = {
        loadAgain: false
      };
      this.setState(listHTML);

      let selectedIDs = network.getSelection(),
        selected = '';

      if (contextMenuType === 'node' && network.getSelection().nodes.length > 0) {
        selected = 'node';
      }
      if (contextMenuType === 'edge' && network.getSelection().edges.length > 0) {
        selected = 'edge';
      }

      this.loadNodeEdgeContextMenu(selected, selectedIDs, network);
    };
  }

  loadNodeEdgeContextMenu(selected, selectedIDs, network) {
    let nodeID = selectedIDs.nodes[0],
      edgeID = selectedIDs.edges[0];

    switch (selected) {
      case 'node':
        let nodeDetails = {
          network,
          nodeID,
          selected
        };
        this.loadNodeContextMenu(nodeDetails);
        break;
      case 'edge':
        let edgeDetails = {
          network,
          edgeID,
          selected
        };
        this.loadEdgeContextMenu(edgeDetails);
        break;
      default:
        break;
    }
  }

  toggleHighlightAnomalyChart(nodeObject, set = true) {
    this.props.broadcastEvent('primary-timeline', {id: nodeObject.id, set});
  }

  loadNodeContextMenu(nodeDetails) {
    let {network, nodeID, selected} = nodeDetails,
      {state} = this,
      nodeType,
      selectedNodeDetails = [];

    state.nodes.forEach((nodeObject) => {
      let node = network.body.nodes[nodeObject.id];
      if (nodeObject.id === nodeID) {
        selectedNodeDetails.push(nodeObject.nodeDetails);
        nodeType = nodeObject.type;
        node.setOptions({
          image: getIcon(nodeObject.type, nodeObject.status, 'SELECTED')
        });

        this.toggleHighlightAnomalyChart(nodeObject);
      }
      else {
        node.setOptions({
          image: getIcon(nodeObject.type, nodeObject.status, 'INACTIVE')
        });
      }
    });

    let notNodeId = this.nodeObjects[nodeID] ? this.nodeObjects[nodeID].notNodeId : '';

    let sourceDetails = {
      contextMenuType: selected,
      network: network,
      itemId: nodeID,
      itemType: nodeType,
      notNodeId: notNodeId
    };

    this.ContextualMenu.getContextMenu(sourceDetails);

    let selectedNodesForExtendingGraph = [{
      nodeID: nodeID,
      reportId: '',
      timeWindow: timeWindow
    }];

    let states = {
      loadAgain: false,
      selectedNodeDetails,
      showContextMenu: true,
      selectedNode: nodeID,
      selectedNodesForExtendingGraph
    };
    this.setState(states);
  }

  loadEdgeContextMenu(edgeDetails) {
    let {network, edgeID, selected} = edgeDetails,
      {state} = this,
      edgeType,
      selectedNodeDetails = [];

    state.edges.forEach((edgeObject) => {
      if (edgeObject.id === edgeID) {
        selectedNodeDetails.push(edgeObject.edgeDetails);
        edgeType = edgeObject.type;

        this.toggleHighlightAnomalyChart(edgeObject);
      }
    });

    let notNodeId = this.edgeObjects[edgeID] ? this.edgeObjects[edgeID].notNodeId : '';

    let sourceDetails = {
      contextMenuType: selected,
      network,
      itemId: edgeID,
      itemType: edgeType,
      notNodeId
    };

    this.ContextualMenu.getContextMenu(sourceDetails);

    let states = {
      loadAgain: false,
      selectedNodeDetails,
      showContextMenu: true
    };
    this.setState(states);
  }

  loadGraph(load) {
    this.setState({
      'loadAgain': load
    });
  }

  extendGraph(sourceDetails, actionDetails) {
    return (event) => {
      let {contextMenuType, network, itemId} = sourceDetails,
        nodeID = itemId,
        {reportId, parameters, actionsCount, actionId, actionLabel, fullMalwareReportLink, actionType} = actionDetails;
      this.setState({
        isFetching: true,
        loaderText: actionLabel
      });
      let selectedNodesForExtendingGraph = this.state.selectedNodesForExtendingGraph;
      if (!isUndefined(selectedNodesForExtendingGraph)) {
        selectedNodesForExtendingGraph.forEach((selectedNode) => {
          if (selectedNode.nodeID === nodeID && selectedNode.reportId === reportId &&
            selectedNode.timeWindow === timeWindow) {
            let message = 'You have already performed this action.';
            displayNotificationMessage(message, actionId);
            this.setState({
              isFetching: false
            });
            return;
          }
        });
      }

      openFullMalwareReport(fullMalwareReportLink);
      if (fullMalwareReportLink !== '') {
        this.setState({
          isFetching: false
        });
        return;
      }

      let details = {
        network: network,
        actionId: actionId,
        reportId: reportId,
        nodeID: nodeID,
        timeWindow: timeWindow,
        parameters: parameters,
        selectedNodesForExtendingGraph: selectedNodesForExtendingGraph,
        contextMenuType: contextMenuType,
        actionsCount: actionsCount,
        actionType: actionType
      };

      this.fetchExtendedNodes(details);
    };
  }

  fetchExtendedNodes(details) {
    let {
      network,
      actionId,
      reportId,
      nodeID,
      selectedNodesForExtendingGraph,
      contextMenuType,
      actionsCount,
      actionType
    } = details;

    const extendedNodes = this.fetchData(details),
      that = this;

    if (actionType !== 'timeline') {
      if (!extendedNodes) {
        this.setState({
          isFetching: false
        });
        return;
      }

      extendedNodes.then(
        function(json) {
          let graphDetails = {
            extendedNodes: json,
            network: network,
            actionId: actionId,
            selectedNodesForExtendingGraph: selectedNodesForExtendingGraph,
            nodeID: nodeID,
            reportId: reportId,
            contextMenuType: contextMenuType
          };
          that.updateGraph(graphDetails);
        }
      );
    }
    else {
      this.setState({
        isFetching: false
      });
    }

    displayActionAsSelected(actionsCount, actionId);
  }

  fetchData(details) {
    const {props} = this;
    let {
        reportId,
        nodeID,
        timeWindow,
        parameters,
        selectedNodesForExtendingGraph,
        actionType
      } = details,
      otherParameters = '',
      params = {};

    if (Array.isArray(parameters)) {
      parameters.forEach((parameter) => {
        if (parameter.userInput === true) {
          otherParameters += `&${parameter.name}=${document.getElementById(parameter.id).value}`;
          params[parameter.name] = document.getElementById(parameter.id).value;
        }
        else {
          otherParameters += `&${parameter.name}=${parameter.value}`;
          params[parameter.name] = parameter.value;
        }
      });
    }

    if (actionType === 'timeline') {
      const apiObj = {
        'path': '/api/analytics/reporting/execute/{reportId}',
        'pathParams': {
          'reportId': reportId
        },
        'queryParams': Object.assign({
          'window': '',
          'from': 0,
          'count': 10
        }, params)
      };

      props.fetchApiData({id: props.timelineId, api: apiObj, params: {}, options: {}});

      selectedNodesForExtendingGraph.push({
        'nodeID': nodeID,
        'reportId': reportId,
        'timeWindow': timeWindow
      });

      autoScrollTo('primary-timeline', this.decreasePositionBy);
    }
    else {
      const accessToken = Cookies.get('access_token'),
        tokenType = Cookies.get('token_type'),
        apiUrl = baseUrl + '/api/analytics/actions/execute/' + reportId + '?window=' + timeWindow + otherParameters,
        customHeaders = {
          'Accept': 'application/json'
        },
        defaultHeaders = Object.assign({
          'Authorization': `${tokenType} ${accessToken}`
        }, customHeaders);

      return fetch(apiUrl, {
        method: 'GET',
        headers: defaultHeaders
      })
      .then(response => response.json())
      .catch(error => {
        this.setState({
          isFetching: false
        });
        return Promise.reject(Error(error.message));
      });
    }
  }

  updateGraph(details) {
    let {
        extendedNodes,
        network,
        actionId,
        selectedNodesForExtendingGraph,
        nodeID,
        reportId,
        contextMenuType
      } = details,
      {state} = this,
      nodes = state.nodes,
      edges = state.edges;

    if (isUndefined(extendedNodes[0])) {
      let message = 'No additional results found.';
      displayNotificationMessage(message, actionId);
      this.setState({
        isFetching: false
      });
      return;
    }

    if (state.previousNodesEdges.nodes.length > 0) {
      undoGraphCount++;
    }
    else {
      undoGraphCount = 0;
    }

    let nodesPrevious = [],
      edgesPrevious = [];

    nodesPrevious.push(Object.assign([], nodes));
    edgesPrevious.push(Object.assign([], edges));

    let isGraphExtended = this.isGraphExtended(nodes, edges, extendedNodes);

    selectedNodesForExtendingGraph.push({
      'nodeID': nodeID,
      'reportId': reportId,
      'timeWindow': timeWindow
    });

    network.setData({nodes: nodes, edges: edges});

    if (!isGraphExtended) {
      nodesPrevious = [];
      edgesPrevious = [];
      undoGraphCount--;
    }

    this.setState({
      loadAgain: false,
      nodesListStatus: 'extended',
      nodes: Object.assign([], nodes),
      edges: Object.assign([], edges),
      selectedNodesForExtendingGraph: selectedNodesForExtendingGraph,
      isFetching: false,
      loaderText: '',
      previousNodesEdges: {
        nodes: (nodesPrevious.length > 0) ? state.previousNodesEdges.nodes.concat(nodesPrevious)
          : state.previousNodesEdges.nodes,
        edges: (edgesPrevious.length > 0) ? state.previousNodesEdges.edges.concat(edgesPrevious)
          : state.previousNodesEdges.edges
      },
      showUndoResetButtons: true
    });

    if (nodes.length <= 10) {
      network.setOptions(physicsFalse);
    }
    else {
      network.setOptions(physicsTrue);
    }

    if (contextMenuType === 'node') {
      let node = network.body.nodes[nodeID];
      if (this.nodeObjects[nodeID] !== undefined) {
        node.setOptions({
          image: getIcon(this.nodeObjects[nodeID].type, this.nodeObjects[nodeID].status, 'SELECTED')
        });
      }
    }

    if (!isGraphExtended) {
      let message = 'No additional results found.';
      displayNotificationMessage(message, actionId);
      this.setState({
        isFetching: false
      });
      return;
    }

    document.getElementById('undo').onclick = this.undoOrResetGraph(network, 'undo');
    document.getElementById('reset').onclick = this.undoOrResetGraph(network, 'reset');

    this.network = network;
  }

  isGraphExtended(nodes, edges, extendedNodes) {
    let nodesEdges = this.mergeMultipleGraphs(nodes, edges, extendedNodes);
    return nodesEdges.isGraphExtended;
  }

  undoOrResetGraph(network, action) {
    return (event) => {
      let nodesEdges = (action === 'undo') ? this.state.previousNodesEdges
        : this.state.originalNodesEdges,
        nodes = (action === 'undo') ? nodesEdges.nodes[undoGraphCount] : nodesEdges.nodes,
        edges = (action === 'undo') ? nodesEdges.edges[undoGraphCount] : nodesEdges.edges;

      if (!isUndefined(nodesEdges.nodes) && !isUndefined(nodesEdges.edges)) {
        if (!isUndefined(nodes) &&
          !isUndefined(edges)) {
          let updatedNodes = Object.assign([], nodes),
            updatedEdges = Object.assign([], edges);

          network.setData({nodes: nodes, edges: edges});

          if (nodes.length <= 10) {
            network.setOptions(physicsFalse);
          }
          else {
            network.setOptions(physicsTrue);
          }

          this.updateNodeAndEdgeObjects(updatedNodes, updatedEdges);

          let previousNodesEdges = emptyNodesEdges;

          if (action === 'undo') {
            let tempNodesArray = Object.assign([], nodesEdges.nodes),
              tempEdgesArray = Object.assign([], nodesEdges.edges);

            tempNodesArray.splice(undoGraphCount, 1);
            tempEdgesArray.splice(undoGraphCount, 1);

            previousNodesEdges = {
              nodes: Object.assign([], tempNodesArray),
              edges: Object.assign([], tempEdgesArray)
            };
          }

          this.setState({
            loadAgain: false,
            nodesListStatus: 'extended',
            nodes: updatedNodes,
            edges: updatedEdges,
            isFetching: false,
            showContextMenu: false,
            selectedNodeDetails: [],
            actions: '',
            selectedNode: '',
            selectedNodesForExtendingGraph: [],
            previousNodesEdges: previousNodesEdges
          });

          document.getElementById('actions').innerHTML = '';
          if (action === 'undo') {
            undoGraphCount--;
          }
          else {
            undoGraphCount = 0;
          }
        }
        this.network = network;
      }
    };
  }

  createNetworkGraph(networkData) {
    const that = this,
      {props} = this,
      {attributes} = props;

    networkGraphDefaultOptions.layout = applyHierarchicalNetwork
      ? Object.assign(networkGraphDefaultOptions.layout, hierarchicalNetwork)
      : networkGraphDefaultOptions.layout;

    let options = Object.assign(networkGraphDefaultOptions,
      {
        height: (!isUndefined(attributes.canvasStyle.height))
          ? attributes.canvasStyle.height
          : networkGraphDefaultOptions.height
      }),
      network = new vis.Network(this.networkGraph, networkData, options);

    if (networkData.nodes.length <= 10) {
      network.setOptions(physicsFalse);
    }
    else {
      network.setOptions(physicsTrue);
    }

    network.on('selectNode', this.loadContextMenu(network, 'node'));
    network.on('selectEdge', this.loadContextMenu(network, 'edge'));
    network.on('deselectNode', this.deselectNode(network));
    network.on('deselectEdge', this.deselectEdge());

    network.on('dragStart', this.loadContextMenu(network, 'node'));

    network.on('hoverNode', function(params) {
      let hoverNode = params.node,
        node = network.body.nodes[hoverNode];
      node = that.setHoverBlurNodeImage('hover', hoverNode, node);
    });

    network.on('blurNode', function(params) {
      let blurNode = params.node,
        node = network.body.nodes[blurNode];
      node = that.setHoverBlurNodeImage('blur', blurNode, node);
    });

    document.getElementsByClassName('vis-up')[0].style.visibility = 'hidden';
    document.getElementsByClassName('vis-down')[0].style.visibility = 'hidden';
    document.getElementsByClassName('vis-left')[0].style.visibility = 'hidden';
    document.getElementsByClassName('vis-right')[0].style.visibility = 'hidden';

    let undoDiv = document.createElement('div');
    undoDiv.id = 'undo';
    undoDiv.className = 'vis-button vis-undo';
    document.getElementsByClassName('vis-navigation')[0].appendChild(undoDiv);

    let resetDiv = document.createElement('div');
    resetDiv.id = 'reset';
    resetDiv.className = 'vis-button vis-reset';
    document.getElementsByClassName('vis-navigation')[0].appendChild(resetDiv);

    this.network = network;
  }

  getGraphAndActions(data) {
    let networkData = { nodes: [], edges: [] };
    if (this.state.nodesListStatus === 'default') {
      let nodes = [],
        edges = [],
        nodesEdges = this.mergeMultipleGraphs(nodes, edges, data);
      this.state.nodes = nodesEdges.nodes;
      this.state.edges = nodesEdges.edges;
      this.state.originalNodesEdges = {
        nodes: Object.assign([], nodesEdges.nodes),
        edges: Object.assign([], nodesEdges.edges)
      };
      const actionsData = this.context.store.getState().actions;
      this.state.actionsData = getActionsByTypes(actionsData.list.actions);

      networkData = {
        nodes: nodesEdges.nodes,
        edges: nodesEdges.edges
      };
    }
    return networkData;
  }

  loadNetworkGraph(data, loadAgain, duration) {
    if (timeWindow !== duration) {
      timeWindow = duration;
      return;
    }

    if (!loadAgain && timeWindow === duration) {
      return;
    }

    if (!data) {
      return;
    }

    let networkData = this.getGraphAndActions(data);

    if (!isNull(this.networkGraph) && !isUndefined(this.networkGraph)) {
      if (networkData.nodes.length > 0) {
        this.createNetworkGraph(networkData);
        this.state.loadAgain = false;
      }
      else {
        document.getElementById('network-graph').innerHTML = 'No additional results were found.';
      }
    }
  }

  render() {
    const {props, state} = this;

    let data = props.data;
    if (props.data && props.params.assetId) {
      data = generateDataFromAssetDetails(data);
    }

    return (
      <div style={styles.graphWrap}>
        {
          state.isFetching
          ? <Loader loaderStyle={styles.loader} text={state.loaderText} />
          : null
        }

        <div ref={(ref) => this.networkGraph = ref}
          style={props.attributes.canvasStyle}
          id='network-graph'>
          { this.loadNetworkGraph(data, state.loadAgain, props.duration) }
        </div>

        {
          state.actionsData && state.actionsData.length > 0
          ? <ContextualMenu
            ref={(ref) => this.ContextualMenu = ref}
            showContextMenu={state.showContextMenu}
            nodeObjects={this.nodeObjects}
            edgeObjects={this.edgeObjects}
            alertDate={this.state.alertDate}
            selectedDetails={state.selectedNodeDetails}
            actions={state.actionsData}
            loadParent={this.loadGraph}
            doAction={this.extendGraph}
            style={props.attributes.canvasStyle} />
          : null
        }
      </div>
    );
  }
}

NetworkGraph.contextTypes = {
  store: React.PropTypes.object
};

export default NetworkGraph;
