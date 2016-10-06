import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import {
  firstCharCapitalize,
  getCountryNameByCountryCode,
  getPosition,
  isUndefined,
  isNull
} from 'utils/utils';
import Cookies from 'cookies-js';
import {baseUrl, networkGraphDefaultOptions} from 'config';
// Loader will get removed after started using fetchApiData function from props object
import Loader from '../components/Loader';
import ContextualMenu from '../components/ContextualMenu';

const style = {
  networkGraph: {
    'height': '600px',
    'width': '100%'
  },
  undoGraph: {
    top: '560px',
    left: '35px',
    position: 'absolute',
    cursor: 'pointer',
    display: 'none'
  },
  resetGraph: {
    top: '530px',
    left: '35px',
    position: 'absolute',
    cursor: 'pointer',
    display: 'none'
  },
  loader: {
    position: 'absolute',
    top: '350px',
    display: 'flex',
    backgroundColor: '#898E9B',
    padding: '20px',
    left: '300px',
    width: '350px'
  }
};

let nodeObjects = {},
  edgeObjects = {},
  timeWindow = '1h',
  undoGraphCount = 0,
  physicsTrue = {
    physics: {
      'stabilization': true
    }
  },
  physicsFalse = {
    physics: false
  },
  emptyNodesEdges = {
    nodes: [],
    edges: []
  };

function createNodeObject(dataNode) {
  let nodeObject = {};

  nodeObject.id = dataNode.id;
  nodeObject.type = dataNode.type;
  nodeObject.label = '  ' + dataNode.id;
  nodeObject.title = '<b>' + firstCharCapitalize(dataNode.type) + ':</b> ' + dataNode.id;
  nodeObject.nodeDetails = firstCharCapitalize(dataNode.type) + ': ' + dataNode.id;
  nodeObject.actions = (!isUndefined(dataNode.actions)) ? dataNode.actions : [];

  let metaDataObject = handleMetaData(dataNode.metadata, nodeObject),
    nodeStatus = metaDataObject.nodeStatus;

  nodeObject = metaDataObject.nodeObject;

  nodeObject.borderWidth = '0';
  nodeObject.font = {
    face: 'Open Sans',
    color: Colors.pebble,
    size: '11',
    align: 'left'
  };
  nodeObject.shape = 'image';
  nodeObject.color = {
    color: Colors.networkNodeLabel,
    highlight: Colors.turquoise
  };
  nodeObject.image = getIcon(dataNode.type, nodeStatus, 'INACTIVE');

  let actions = [];
  if (!isNull(dataNode.actions) && !isUndefined(dataNode.actions)) {
    actions = dataNode.actions;
  }
  nodeObject.actions = actions;

  return nodeObject;
}

function createEdgeObject(dataEdge) {
  let edgeObject = {};
  edgeObject.id = dataEdge.id;
  edgeObject.type = dataEdge.type;
  edgeObject.from = dataEdge.source;
  edgeObject.to = dataEdge.target;
  edgeObject.arrows = {
    to: {
      scaleFactor: 0.5
    },
    arrowStrikethrough: false
  };
  edgeObject.label = dataEdge.label + '\n\n\n';
  edgeObject.edgeDetails = 'Edge Type: ' + dataEdge.label;
  edgeObject.edgeDetails += '<br/>Source: ' + dataEdge.source;
  edgeObject.edgeDetails += '<br/>Target: ' + dataEdge.target;
  edgeObject.font = {
    face: 'Open Sans',
    color: Colors.pebble,
    size: '11',
    align: 'left'
  };
  edgeObject.length = 1000;
  edgeObject.smooth = {
    type: 'discrete'
  };
  edgeObject.color = {
    color: Colors.pebble,
    highlight: Colors.turquoise
  };

  if (dataEdge.type === 'ioc') {
    edgeObject.dashes = true;
  }
  return edgeObject;
}

function getNodesEdges(data) {
  let nodes = [],
    edges = [],
    dataNodes = data.nodes,
    dataEdges = data.edges;

  if (!isUndefined(dataNodes)) {
    for (let i = 0; i < dataNodes.length; i++) {
      let dataNode = dataNodes[i];

      if (isUndefined(nodeObjects[dataNode.id])) {
        let nodeObject = createNodeObject(dataNode);
        nodes.push(nodeObject);
        nodeObjects[dataNode.id] = nodeObject;
      }
    }
  }

  if (!isUndefined(dataEdges)) {
    for (let i = 0; i < dataEdges.length; i++) {
      let dataEdge = dataEdges[i];

      if (isUndefined(edgeObjects[dataEdge.id])) {
        let edgeObject = createEdgeObject(dataEdge);
        edges.push(edgeObject);
        edgeObjects[dataEdge.target] = edgeObject;
        edgeObjects[edgeObject.id] = edgeObject;
      }
    }
  }

  return {
    'nodes': nodes,
    'edges': edges
  };
}

function handleMetaData(metadata, nodeObject) {
  let nodeStatus = 'safe';
  nodeObject.metadata = metadata;
  for (let metadataType in metadata) {
    let metadataTypeLower = metadataType.toLowerCase(),
      newLine1 = '\n  ',
      newLine2 = '<br />';

    if (metadataTypeLower !== 'coordinates') {
      switch (metadataTypeLower) {
        case 'reputation':
          let parameters = {
              values: metadata[metadataType],
              nodeStatus: nodeStatus,
              nodeObject: nodeObject,
              newLine: {
                newLine1: newLine1,
                newLine2: newLine2
              }
            },
            tempObject = handleReputationMetaData(parameters);

          nodeObject = tempObject.nodeObject;
          nodeStatus = tempObject.nodeStatus;
          break;
        case 'country':
          nodeObject.label += newLine1 +
            getCountryNameByCountryCode[metadata[metadataType]];
          nodeObject.title += newLine2 + '<b>' + firstCharCapitalize(metadataType) + ':</b> ' +
            getCountryNameByCountryCode[metadata[metadataType]];
          nodeObject.nodeDetails += newLine2 + firstCharCapitalize(metadataType) + ': ' +
            getCountryNameByCountryCode[metadata[metadataType]];
          break;
        case 'displayname':
          nodeObject.title += newLine2 + '<b>Name:</b> ' + metadata[metadataType];
          nodeObject.nodeDetails += newLine2 + 'Name: ' + metadata[metadataType];
          break;
        default:
          if (metadataTypeLower === 'title') {
            nodeObject.label += newLine1 + firstCharCapitalize(metadataType) + ': ' +
              addNewlines(metadata[metadataType]);
          }
          nodeObject.title += newLine2 + '<b>' + firstCharCapitalize(metadataType) + ':</b> ' +
            metadata[metadataType];
          nodeObject.nodeDetails += newLine2 + firstCharCapitalize(metadataType) + ': ' +
            metadata[metadataType];
          break;
      }
    }
  }

  nodeObject.status = nodeStatus;

  return {
    nodeObject: nodeObject,
    nodeStatus: nodeStatus
  };
}

function handleReputationMetaData(parameters) {
  let {values, nodeStatus, nodeObject, newLine} = parameters,
    {newLine1, newLine2} = newLine,
    value1 = '',
    value2 = '',
    value5 = '';

  if (!isUndefined(values)) {
    if (!isUndefined(values.reputation)) {
      if ((values.reputation).length > 0) {
        let newLine = {
            newLine1: newLine1,
            newLine2: newLine2
          },
          value = {
            value1: value1,
            value2: value2,
            value5: value5
          },
          reputationText = createReputationText(values.reputation, newLine, value);
        value1 = reputationText.value1;
        value2 = reputationText.value2;
        value5 = reputationText.value5;
      }
    }

    let newLine = {
        newLine1: newLine1,
        newLine2: newLine2
      },
      value = {
        value1: value1,
        value2: value2,
        value5: value5
      },
      reputationText = parseReputationText(values, newLine, value);
    value1 = reputationText.value1;
    value2 = reputationText.value2;
    value5 = reputationText.value5;
  }
  if (value1 !== '') {
    nodeObject.label += newLine1 + value1;
    nodeObject.title += newLine2 + value2;
    nodeObject.nodeDetails += newLine2 + value5;

    if (value1.indexOf('Scanning Host') > -1) {
      nodeStatus = 'scan';
    }
    else {
      nodeStatus = 'malicious';
    }
  }
  else {
    nodeStatus = 'safe';
  }

  return {
    nodeObject: nodeObject,
    nodeStatus: nodeStatus
  };
}

function createReputationText(values, newLine, value) {
  let {value1, value2, value5} = value,
    value3 = '',
    value4 = '',
    {newLine1, newLine2} = newLine,
    newLine3 = ',\n  ',
    newLine4 = ',<br />';
  for (let i = 0; i < values.length; i++) {
    if (value1 === '') {
      newLine1 = '';
      newLine2 = '';
    }
    else {
      newLine1 = '\n  ';
      newLine2 = '<br />';
    }
    if (value3 === '') {
      newLine3 = '';
      newLine4 = '';
    }
    else {
      newLine3 = ',\n  ';
      newLine4 = ',<br />';
    }
    value3 += newLine3 + values[i];
    value4 += newLine4 + values[i];
  }
  value1 += newLine1 + 'Reputation: ' + value3;
  value2 += newLine2 + '<b>Reputation:</b> ' + value4;
  value5 += newLine2 + 'Reputation: ' + value4;
  return {
    value1: value1,
    value2: value2,
    value5: value5
  };
}

function parseReputationText(values, newLine, value) {
  let {value1, value2, value5} = value,
    {newLine1, newLine2} = newLine;

  for (let i = 0; i < values.length; i++) {
    if (value1 === '') {
      newLine1 = '';
      newLine2 = '';
    }
    else {
      newLine1 = '\n  ';
      newLine2 = '<br />';
    }
    for (let valueType in values[i]) {
      if (valueType === 'reputation') {
        if ((values[i][valueType]).length > 0) {
          let newLine = {
              newLine1: newLine1,
              newLine2: newLine2
            },
            value = {
              value1: value1,
              value2: value2,
              value5: value5
            },
            reputationText = createReputationText(values[i][valueType], newLine, value);
          value1 = reputationText.value1;
          value2 = reputationText.value2;
          value5 = reputationText.value5;
        }
      }
      else {
        value2 += newLine2 + '<b>Reputation ' + firstCharCapitalize(valueType) + ':</b> ' +
          values[i][valueType] + '<br />';
        value5 += newLine2 + 'Reputation ' + firstCharCapitalize(valueType) + ': ' +
          values[i][valueType] + '<br />';
      }
    }
  }
  return {
    value1: value1,
    value2: value2,
    value5: value5
  };
}

function getIcon(nodeType, nodeStatus, nodeAction) {
  nodeType = nodeType.toLowerCase();
  const iconPath = '/img/Node-' + nodeStatus + '-' + nodeAction + '/' + nodeType + '-' + nodeStatus + '.png';

  if (nodeType !== '') {
    return iconPath;
  }
  else {
    return '/img/inactive.png';
  }
}

function updateNodeAndEdgeObjects(updatedNodes, updatedEdges) {
  let tempNodeObjects = {},
    tempEdgeObjects = {};

  for (let key in nodeObjects) {
    if (!isUndefined(updatedNodes.length)) {
      for (let i = 0; i < updatedNodes.length; i++) {
        if (updatedNodes[i].id === key) {
          tempNodeObjects[key] = nodeObjects[key];
          tempEdgeObjects[key] = edgeObjects[key];// Remove other targets from edgeObjects
        }
      }
    }
  }
  nodeObjects = Object.assign({}, tempNodeObjects);

  for (let key in edgeObjects) {
    if (!isUndefined(updatedEdges.length)) {
      for (let i = 0; i < updatedEdges.length; i++) {
        if (updatedEdges[i].id === key) {
          tempEdgeObjects[key] = edgeObjects[key];
        }
      }
    }
  }
  edgeObjects = Object.assign({}, tempEdgeObjects);
}

function generateDataFromAssetDetails(data) {
  const assetData = [];
  const nodes = [];

  nodes[0] = {
    id: data.id,
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
  for (let i = 0; i < actionsData.length; i++) {
    for (let j = 0; j < actionsData[i].types.length; j++) {
      let type = actionsData[i].types[j];
      if (!(type in lookup)) {
        lookup[type] = 1;
        const obj = {
          type: type
        };

        nodeTypes.push(obj);
      }
    }
  }

  for (let i = 0; i < nodeTypes.length; i++) {
    let actionObject = {},
      nodeType = (nodeTypes[i].type).toLowerCase();
    actionObject.nodeType = nodeType;
    actionObject.actions = [];

    for (let j = 0; j < actionsData.length; j++) {
      if ((actionsData[j].types).indexOf(nodeType) > -1) {
        let tempObj = {
          reportId: actionsData[j].name,
          targetType: actionsData[j].targetType,
          label: actionsData[j].label,
          parameters: actionsData[j].parameters
        };
        actionObject.actions.push(tempObj);
      }
    }

    actions.push(actionObject);
  }

  return actions;
}

function fetchExtendedNodes(reportId, duration, parameters) {
  let otherParameters = '';
  if (!isUndefined(parameters) && !isUndefined(parameters.length)) {
    for (let i = 0; i < parameters.length; i++) {
      if (parameters[i].userInput === true) {
        otherParameters += '&' + parameters[i].name + '=' + document.getElementById(parameters[i].id).value;
      }
      else {
        otherParameters += '&' + parameters[i].name + '=' + parameters[i].value;
      }
    }
  }
  const accessToken = Cookies.get('access_token'),
    tokenType = Cookies.get('token_type'),
    apiUrl = baseUrl + '/api/analytics/actions/execute/' + reportId + '?window=' + duration + otherParameters,
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
  .then(response => response.json()
  )
  .catch(error => {
    this.setState({
      isFetching: false
    });
    return Promise.reject(Error(error.message));
  });
}

function isNodeOrEdgeAlreadyExists(array, id) {
  let exists = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      exists = true;
    }
  }
  return exists;
}

function checkForUserInputs(parameters) {
  let userInputParameters = [];
  if (!isUndefined(parameters.length)) {
    for (let k = 0; k < parameters.length; k++) {
      let tempObj = {};
      if (parameters[k].userInput === true) {
        tempObj.name = parameters[k].name;
        userInputParameters.push(tempObj);
      }
    }
  }
  return userInputParameters;
}

function addNewlines(str) {
  let char = 15;
  if (str.length > char) {
    let result = '';
    while (str.length > 0) {
      result += str.substring(0, char) + '\n  ';
      str = str.substring(char);
    }
    return result;
  }
  return str;
}

function displayActionAsSelected(actionsCount, actionId) {
  for (let j = 0; j < actionsCount; j++) {
    let tempId = 'action' + j;
    let downarrowId = 'downarrow' + j;

    if (tempId === actionId) {
      document.getElementById(tempId).style.backgroundColor = '#979BA7';
      if (document.getElementById(downarrowId) !== undefined &&
        document.getElementById(downarrowId) !== null) {
        document.getElementById(downarrowId).style.backgroundColor = '#979BA7';
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
  document.getElementById('actionPerformed').innerHTML = message;
  document.getElementById('actionPerformed').style.top = (position.y - 85) + 'px';
  ANIMATIONS.fadeIn(document.getElementById('actionPerformed'), {
    duration: 2,
    complete: function() {
      document.getElementById('actionPerformed').style.display = 'block';

      ANIMATIONS.fadeOut(document.getElementById('actionPerformed'), {
        duration: 3000,
        complete: function() {
          document.getElementById('actionPerformed').style.display = 'none';
        }
      });
    }
  });
}

class NetworkGraph extends React.Component {
  static propTypes = {
    duration: PropTypes.string,
    params: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {duration, params} = this.props,
      alertDate = params.date;

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
      actions: '',
      loaderText: '',
      loadAgain: true
    };

    this.loadNetworkGraph = this.loadNetworkGraph.bind(this);
    this.createNetworkGraph = this.createNetworkGraph.bind(this);
    this.getGraphAndActions = this.getGraphAndActions.bind(this);
    this.deselectNode = this.deselectNode.bind(this);
    this.deselectEdge = this.deselectEdge.bind(this);
    this.deselect = this.deselect.bind(this);
    this.setHoverBlurNodeImage = this.setHoverBlurNodeImage.bind(this);

    this.loadContextMenu = this.loadContextMenu.bind(this);
    this.loadNodeEdgeContextMenu = this.loadNodeEdgeContextMenu.bind(this);

    this.loadGraph = this.loadGraph.bind(this);
    this.extendGraph = this.extendGraph.bind(this);
    this.undoOrResetGraph = this.undoOrResetGraph.bind(this);
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

    nodeObjects = {};
    edgeObjects = {};

    let networkData = this.getGraphAndActions(data);

    if (!isNull(this.networkGraph) && !isUndefined(this.networkGraph)) {
      if (networkData.nodes.length > 0) {
        this.createNetworkGraph(networkData);
      }
      else {
        document.getElementById('networkGraph').innerHTML = 'No additional results were found.';
      }
    }
  }

  getGraphAndActions(data) {
    let networkData = {
      nodes: [],
      edges: []
    };
    if (this.state.nodesListStatus === 'default') {
      let nodesEdges = getNodesEdges(data[0]);
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

  createNetworkGraph(networkData) {
    const that = this;
    let options = networkGraphDefaultOptions,
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
  }

  setHoverBlurNodeImage(event, nodeID, node) {
    let selectedNodesForExtendingGraph = this.state.selectedNodesForExtendingGraph;

    if (!isUndefined(nodeObjects[nodeID])) {
      node.setOptions({
        image: getIcon(nodeObjects[nodeID].type, nodeObjects[nodeID].status,
          event === 'hover' ? 'HOVER' : 'INACTIVE')
      });

      for (let i = 0; i < selectedNodesForExtendingGraph.length; i++) {
        if (selectedNodesForExtendingGraph[i].nodeID === nodeID) {
          node.setOptions({
            image: getIcon(nodeObjects[nodeID].type, nodeObjects[nodeID].status, 'SELECTED')
          });
        }
      }
    }
    return node;
  }

  deselectNode(network) {
    return (event) => {
      let i = 0;
      for (let nodeObject in nodeObjects) {
        let deselectedNode = nodeObjects[nodeObject],
          node = network.body.nodes[deselectedNode.id];

        if (!isUndefined(deselectedNode)) {
          node.setOptions({
            image: getIcon(deselectedNode.type, deselectedNode.status, 'INACTIVE')
          });

          if (i === 0) {
            this.deselect(deselectedNode);
          }
          i++;
        }
      }
    };
  }

  deselectEdge() {
    return (event) => {
      let i = 0;
      for (let edgeObject in edgeObjects) {
        let deselectedEdge = edgeObjects[edgeObject];

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
      document.getElementById('refreshData').style.marginLeft = 'auto';
    }
  }

  loadContextMenu(network, contextMenuType) {
    return (event) => {
      let listHTML = {
        loadAgain: false
      };
      this.setState(listHTML);

      let SelectedIDs = network.getSelection(),
        selected = '';

      if (contextMenuType === 'node' && network.getSelection().nodes.length > 0) {
        selected = 'node';
      }
      if (contextMenuType === 'edge' && network.getSelection().edges.length > 0) {
        selected = 'edge';
      }

      this.loadNodeEdgeContextMenu(selected, SelectedIDs, network);
    };
  }

  loadNodeEdgeContextMenu(selected, SelectedIDs, network) {
    const {state} = this;
    let nodeType = '',
      edgeType = '',
      nodeID = SelectedIDs.nodes[0],
      edgeID = SelectedIDs.edges[0],
      selectedNodeDetails = '',
      selectedNodesForExtendingGraph = [];

    switch (selected) {
      case 'node':
        if (!isUndefined(nodeID)) {
          for (let i = 0; i < state.nodes.length; i++) {
            let node = network.body.nodes[state.nodes[i].id];
            if (state.nodes[i].id === nodeID) {
              selectedNodeDetails += state.nodes[i].nodeDetails;
              nodeType = state.nodes[i].type;
              node.setOptions({
                image: getIcon(state.nodes[i].type, state.nodes[i].status, 'SELECTED')
              });
            }
            else {
              node.setOptions({
                image: getIcon(state.nodes[i].type, state.nodes[i].status, 'INACTIVE')
              });
            }
          }

          let sourceDetails = {
            contextMenuType: selected,
            network: network,
            itemId: nodeID,
            itemType: nodeType
          };

          this.ContextualMenu.getContextMenu(sourceDetails);

          selectedNodesForExtendingGraph.push({
            nodeID: nodeID,
            reportId: '',
            timeWindow: timeWindow
          });

          let states = {
            loadAgain: false,
            selectedNodeDetails: selectedNodeDetails,
            showContextMenu: true,
            selectedNode: nodeID,
            selectedNodesForExtendingGraph: selectedNodesForExtendingGraph
          };
          this.setState(states);
        }
        break;
      case 'edge':
        if (!isUndefined(edgeID)) {
          for (let i = 0; i < state.edges.length; i++) {
            if (state.edges[i].id === edgeID) {
              selectedNodeDetails += state.edges[i].edgeDetails;
              edgeType = state.edges[i].type;
            }
          }

          let sourceDetails = {
            contextMenuType: selected,
            network: network,
            itemId: edgeID,
            itemType: edgeType
          };

          this.ContextualMenu.getContextMenu(sourceDetails);

          let states = {
            loadAgain: false,
            selectedNodeDetails: selectedNodeDetails,
            showContextMenu: true
          };
          this.setState(states);
        }
        break;
      default:
        break;
    }
  }

  loadGraph(load) {
    this.setState({
      'loadAgain': load
    });
  }

  extendGraph(sourceDetails, actionDetails) {
    const that = this;
    return (event) => {
      let {contextMenuType, network, itemId} = sourceDetails,
        nodeID = itemId,
        {reportId, parameters, actionsCount, actionId, actionLabel, fullMalwareReportLink} = actionDetails;

      this.setState({
        isFetching: true,
        loaderText: actionLabel
      });
      let selectedNodesForExtendingGraph = that.state.selectedNodesForExtendingGraph;
      for (let i = 0; i < selectedNodesForExtendingGraph.length; i++) {
        if (selectedNodesForExtendingGraph[i].nodeID === nodeID &&
          selectedNodesForExtendingGraph[i].reportId === reportId &&
          selectedNodesForExtendingGraph[i].timeWindow === timeWindow) {
          let message = 'You have already performed this action.';
          displayNotificationMessage(message, actionId);
          that.setState({
            isFetching: false
          });
          return;
        }
      }

      if (fullMalwareReportLink !== '') {
        window.open(baseUrl + fullMalwareReportLink);
      }

      const extendedNodes = fetchExtendedNodes(reportId, timeWindow, parameters);
      if (!extendedNodes) {
        this.setState({
          isFetching: false
        });
        return;
      }
      extendedNodes.then(
        function(json) {
          let nodes = that.state.nodes,
            edges = that.state.edges;

          if (isUndefined(json[0])) {
            let message = 'No additional results found.';
            displayNotificationMessage(message, actionId);
            that.setState({
              isFetching: false
            });
            return;
          }

          if (that.state.previousNodesEdges.nodes.length > 0) {
            undoGraphCount++;
          }
          else {
            undoGraphCount = 0;
          }

          let nodesPrevious = [],
            edgesPrevious = [];

          nodesPrevious.push(Object.assign([], nodes));
          edgesPrevious.push(Object.assign([], edges));

          let nodesEdges = getNodesEdges(json[0]),
            isGraphExtended = false;

          for (let i = 0; i < nodesEdges.nodes.length; i++) {
            if (isNodeOrEdgeAlreadyExists(nodes, nodesEdges.nodes[i].id) === false) {
              nodes.push(nodesEdges.nodes[i]);
              nodeObjects[nodesEdges.nodes[i].id] = nodesEdges.nodes[i];
              isGraphExtended = true;
            }
          }

          for (let i = 0; i < nodesEdges.edges.length; i++) {
            if (isNodeOrEdgeAlreadyExists(edges, nodesEdges.edges[i].id) === false) {
              edges.push(nodesEdges.edges[i]);
              edgeObjects[nodesEdges.edges[i].to] = nodesEdges.edges[i];
              edgeObjects[nodesEdges.edges[i].id] = nodesEdges.edges[i];
              isGraphExtended = true;
            }
          }

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

          that.setState({
            'loadAgain': false,
            'nodesListStatus': 'extended',
            'nodes': Object.assign([], nodes),
            'edges': Object.assign([], edges),
            'selectedNodesForExtendingGraph': selectedNodesForExtendingGraph,
            isFetching: false,
            loaderText: '',
            previousNodesEdges: {
              nodes: (nodesPrevious.length > 0) ? that.state.previousNodesEdges.nodes.concat(nodesPrevious)
                : that.state.previousNodesEdges.nodes,
              edges: (edgesPrevious.length > 0) ? that.state.previousNodesEdges.edges.concat(edgesPrevious)
                : that.state.previousNodesEdges.edges
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
            if (nodeObjects[nodeID] !== undefined) {
              node.setOptions({
                image: getIcon(nodeObjects[nodeID].type, nodeObjects[nodeID].status, 'SELECTED')
              });
            }
          }

          if (!isGraphExtended) {
            let message = 'No additional results found.';
            displayNotificationMessage(message, actionId);
            that.setState({
              isFetching: false
            });
            return;
          }

          document.getElementById('undo').onclick = that.undoOrResetGraph(network, 'undo');
          document.getElementById('reset').onclick = that.undoOrResetGraph(network, 'reset');
        }
      );

      displayActionAsSelected(actionsCount, actionId);
    };
  }

  render() {
    const {props, state} = this;

    let assetData;
    if (props.data && !Array.isArray(props.data)) {
      assetData = generateDataFromAssetDetails(props.data);
    }

    let undoResetStyle = {display: state.showUndoResetButtons ? 'block' : 'none'};

    return (
      <div style={{display: 'flex'}}>
        {state.isFetching ? <Loader style={{}} loaderStyle={style.loader}
          text={state.loaderText} /> : null}
        <div ref={(ref) => this.networkGraph = ref} style={{...style.networkGraph,
          ...{
            width: '1100px'
          }}}
          id='networkGraph'>
          {
            assetData
            ? this.loadNetworkGraph(assetData, state.loadAgain, props.duration)
            : this.loadNetworkGraph(props.data, state.loadAgain, props.duration)
          }
        </div>

        {
          state.actionsData && state.actionsData.length > 0
          ? <ContextualMenu
            ref={(ref) => this.ContextualMenu = ref}
            showContextMenu={state.showContextMenu}
            nodeObjects={nodeObjects}
            edgeObjects={edgeObjects}
            alertDate={this.state.alertDate}
            selectedDetails={state.selectedNodeDetails}
            actions={state.actionsData}
            loadParent={this.loadGraph}
            doAction={this.extendGraph} />
          : null
        }

        {/*<ContextualMenu
          ref={(ref) => this.ContextualMenu = ref}
          showContextMenu={state.showContextMenu}
          selectedDetails={state.selectedNodeDetails}
          setActions={this.setActions}
          actions={state.actionsData} />*/}

        <div id='undoGraph' style={{...style.undoGraph, ...undoResetStyle}}>
          <img id='undo' src='/img/undo.png' />
        </div>

        <div id='resetGraph' style={{...style.resetGraph, ...undoResetStyle}}>
          <img id='reset' src='/img/reset.png' />
        </div>
      </div>
    );
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

          updateNodeAndEdgeObjects(updatedNodes, updatedEdges);

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
            selectedNodeDetails: '',
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
      }
    };
  }
}

NetworkGraph.contextTypes = {
  store: React.PropTypes.object
};

export default NetworkGraph;
