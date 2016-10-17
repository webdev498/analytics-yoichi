import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import {
  firstCharCapitalize,
  getCountryNameByCountryCode,
  getPosition,
  isUndefined,
  isNull,
  whatIsIt,
  formatDateInLocalTimeZone
} from 'utils/utils';
import Cookies from 'cookies-js';
import vis from 'vis';
import {baseUrl, networkGraphDefaultOptions} from 'config';
// Loader will get removed after started using fetchApiData function from props object
import Loader from '../components/Loader';
import ContextualMenu from '../components/ContextualMenu';

const style = {
  undoGraph: {
    bottom: '148px',
    left: '33px',
    position: 'absolute',
    cursor: 'pointer',
    display: 'none'
  },
  resetGraph: {
    bottom: '180px',
    left: '33px',
    position: 'absolute',
    cursor: 'pointer',
    display: 'none'
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
  let nodeObject = {
    id: dataNode.id,
    type: dataNode.type,
    label: '  ' + dataNode.id,
    title: '<b>' + firstCharCapitalize(dataNode.type) + ':</b> ' + dataNode.id,
    nodeDetails: [],
    actions: (!isNull(dataNode.actions) && !isUndefined(dataNode.actions)) ? dataNode.actions : [],
    borderWidth: '0',
    font: {
      face: 'Open Sans',
      color: Colors.pebble,
      size: '11',
      align: 'left'
    },
    shape: 'image',
    color: {
      color: Colors.networkNodeLabel,
      highlight: Colors.turquoise
    }
  };

  nodeObject.nodeDetails.push(<li>{firstCharCapitalize(dataNode.type)}: {dataNode.id}</li>);

  let metaDataObject = handleMetaData(dataNode.metadata, nodeObject),
    nodeStatus = metaDataObject.nodeStatus;
  nodeObject = metaDataObject.nodeObject;
  nodeObject.image = getIcon(dataNode.type, nodeStatus, 'INACTIVE');

  return nodeObject;
}

function createEdgeObject(dataEdge) {
  let edgeObject = {
    id: dataEdge.id,
    type: dataEdge.type,
    from: dataEdge.source,
    to: dataEdge.target,
    arrows: {
      to: {
        scaleFactor: 0.5
      },
      arrowStrikethrough: false
    },
    label: dataEdge.label + '\n\n\n',
    font: {
      face: 'Open Sans',
      color: Colors.pebble,
      size: '11',
      align: 'left'
    },
    length: 1000,
    smooth: {
      type: 'discrete'
    },
    color: {
      color: Colors.pebble,
      highlight: Colors.turquoise
    },
    edgeDetails: []
  };

  edgeObject.edgeDetails.push(<ul><li>Edge Type: {dataEdge.label}</li>
    <li>Source: {dataEdge.source}</li>
    <li>Target: {dataEdge.target}</li></ul>);

  if (dataEdge.type === 'ioc') {
    edgeObject.dashes = true;
  }
  return edgeObject;
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
          nodeObject.nodeDetails.push(<li>{firstCharCapitalize(metadataType)}:
            &nbsp;{getCountryNameByCountryCode[metadata[metadataType]]}</li>);
          break;
        case 'date':
          let dateTime = formatDateInLocalTimeZone(metadata[metadataType]);
          nodeObject.label += newLine1 + firstCharCapitalize(metadataType) + ': ' +
            dateTime.date + ' ' + dateTime.time;
          nodeObject.title += newLine2 + '<b>' + firstCharCapitalize(metadataType) + ':</b> ' +
            dateTime.date + ' ' + dateTime.time;
          nodeObject.nodeDetails.push(<li>{firstCharCapitalize(metadataType)}:
            &nbsp;{dateTime.date} {dateTime.time}</li>);
          break;
        case 'displayname':
          nodeObject.title += newLine2 + '<b>Name:</b> ' + metadata[metadataType];
          nodeObject.nodeDetails.push(<li>Name: {metadata[metadataType]}</li>);
          break;
        default:
          if (metadataTypeLower === 'title') {
            nodeObject.label += newLine1 + firstCharCapitalize(metadataType) + ': ' +
              addNewlines(metadata[metadataType]);
          }
          nodeObject.title += newLine2 + '<b>' + firstCharCapitalize(metadataType) + ':</b> ' +
            metadata[metadataType];
          nodeObject.nodeDetails.push(<li>{firstCharCapitalize(metadataType)}:
            &nbsp;{metadata[metadataType]}</li>);
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
    label = '',
    title = '',
    nodeDetails = '';

  if (!isUndefined(values)) {
    if (!isUndefined(values.reputation) && (values.reputation).length > 0 && whatIsIt(values.reputation) === 'Array') {
      let newLine = {
          newLine1: newLine1,
          newLine2: newLine2
        },
        value = {
          label: label,
          title: title,
          nodeDetails: nodeDetails
        },
        reputationText = createReputationText(values.reputation, newLine, value);
      label = reputationText.label;
      title = reputationText.title;
      nodeDetails = reputationText.nodeDetails;
    }

    if (!isUndefined(values[0]) && !isUndefined(values[0].reputation) &&
      whatIsIt(values[0].reputation) === 'Array') {
      let newLine = {
          newLine1: newLine1,
          newLine2: newLine2
        },
        value = {
          label: label,
          title: title,
          nodeDetails: nodeDetails
        },
        reputationText = parseReputationText(values, newLine, value);
      label = reputationText.label;
      title = reputationText.title;
      nodeDetails = reputationText.nodeDetails;
    }
  }
  nodeStatus = 'safe';

  if (label !== '') {
    nodeObject.label += newLine1 + label;
    nodeObject.title += newLine2 + title;
    if (nodeDetails.indexOf('<br />') > -1) {
      let tempNodeDetails = nodeDetails.split('<br />');
      tempNodeDetails.forEach((nodeDetail) => {
        nodeObject.nodeDetails.push(<li>{nodeDetail}</li>);
      });
    }
    else {
      nodeObject.nodeDetails.push(<li>{nodeDetails}</li>);
    }

    nodeStatus = (label.indexOf('Scanning Host') > -1) ? 'scan' : 'malicious';
  }

  return {
    nodeObject: nodeObject,
    nodeStatus: nodeStatus
  };
}

function createReputationText(values, newLine, value) {
  let {label, title, nodeDetails} = value,
    value1 = '',
    value2 = '',
    {newLine1, newLine2} = newLine,
    newLine3 = ',\n  ',
    newLine4 = ',<br />';

  values.forEach((data) => {
    newLine1 = (label === '') ? '' : '\n  ';
    newLine2 = (label === '') ? '' : '<br />';
    newLine3 = (value1 === '') ? '' : ',\n  ';
    newLine4 = (value1 === '') ? '' : ',<br />';
    value1 += newLine3 + data;
    value2 += newLine4 + data;
  });

  label += newLine1 + 'Reputation: ' + value1;
  title += newLine2 + '<b>Reputation:</b> ' + value2;
  nodeDetails += newLine2 + 'Reputation: ' + value2;
  return {
    label: label,
    title: title,
    nodeDetails: nodeDetails
  };
}

function parseReputationText(values, newLine, value) {
  let {label, title, nodeDetails} = value,
    {newLine1, newLine2} = newLine;

  values.forEach((data) => {
    newLine1 = (label === '') ? '' : '\n  ';
    newLine2 = (label === '') ? '' : '<br />';

    for (let valueType in data) {
      if (valueType === 'reputation') {
        if ((data[valueType]).length > 0) {
          let newLine = {
              newLine1: newLine1,
              newLine2: newLine2
            },
            value = {
              label: label,
              title: title,
              nodeDetails: nodeDetails
            },
            reputationText = createReputationText(data[valueType], newLine, value);
          label = reputationText.label;
          title = reputationText.title;
          nodeDetails = reputationText.nodeDetails;
        }
      }
      else {
        title += newLine2 + '<b>Reputation ' + firstCharCapitalize(valueType) + ':</b> ' +
          data[valueType] + '<br />';
        nodeDetails += newLine2 + 'Reputation ' + firstCharCapitalize(valueType) + ': ' +
          data[valueType] + '<br />';
      }
    }
  });
  return {
    label: label,
    title: title,
    nodeDetails: nodeDetails
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
      if ((action.types).indexOf(nodeType) > -1) {
        let tempObj = {
          reportId: action.name,
          targetType: action.targetType,
          label: action.label,
          parameters: action.parameters
        };
        actionObject.actions.push(tempObj);
      }
    });

    actions.push(actionObject);
  });

  return actions;
}

function fetchExtendedNodes(reportId, duration, parameters) {
  let otherParameters = '';
  if (!isUndefined(parameters) && !isUndefined(parameters.length)) {
    parameters.forEach((parameter) => {
      if (parameter.userInput === true) {
        otherParameters += '&' + parameter.name + '=' + document.getElementById(parameter.id).value;
      }
      else {
        otherParameters += '&' + parameter.name + '=' + parameter.value;
      }
    });
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
  array.forEach((value) => {
    if (value.id === id) {
      exists = true;
    }
  });
  return exists;
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
    params: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {duration, params} = this.props,
      alertDate = params.date;

    this.nodeObjects = {};
    this.edgeObjects = {};

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

    this.getNodesEdges = this.getNodesEdges.bind(this);
    this.loadNetworkGraph = this.loadNetworkGraph.bind(this);
    this.createNetworkGraph = this.createNetworkGraph.bind(this);
    this.getGraphAndActions = this.getGraphAndActions.bind(this);
    this.deselectNode = this.deselectNode.bind(this);
    this.deselectEdge = this.deselectEdge.bind(this);
    this.deselect = this.deselect.bind(this);
    this.setHoverBlurNodeImage = this.setHoverBlurNodeImage.bind(this);

    this.loadContextMenu = this.loadContextMenu.bind(this);
    this.loadNodeEdgeContextMenu = this.loadNodeEdgeContextMenu.bind(this);
    this.loadNodeContextMenu = this.loadNodeContextMenu.bind(this);
    this.loadEdgeContextMenu = this.loadEdgeContextMenu.bind(this);

    this.loadGraph = this.loadGraph.bind(this);
    this.extendGraph = this.extendGraph.bind(this);
    this.fetchExtendedNodes = this.fetchExtendedNodes.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
    this.undoOrResetGraph = this.undoOrResetGraph.bind(this);
    this.isGraphExtended = this.isGraphExtended.bind(this);
    this.updateNodeAndEdgeObjects = this.updateNodeAndEdgeObjects.bind(this);
  }

  getNodesEdges(data) {
    let nodes = [],
      edges = [],
      dataNodes = data.nodes,
      dataEdges = data.edges;

    if (!isUndefined(dataNodes)) {
      dataNodes.forEach((dataNode) => {
        if (isUndefined(this.nodeObjects[dataNode.id])) {
          let nodeObject = createNodeObject(dataNode);
          nodes.push(nodeObject);
          this.nodeObjects[dataNode.id] = nodeObject;
        }
      });
    }

    if (!isUndefined(dataEdges)) {
      dataEdges.forEach((dataEdge) => {
        if (isUndefined(this.edgeObjects[dataEdge.id])) {
          let edgeObject = createEdgeObject(dataEdge);
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
          if (updatedNode.id === key) {
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

  getGraphAndActions(data) {
    let networkData = {
      nodes: [],
      edges: []
    };
    if (this.state.nodesListStatus === 'default') {
      let nodesEdges = this.getNodesEdges(data[0]);
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
    const that = this,
      {props} = this,
      {attributes} = props;

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
      let i = 0;
      for (let nodeObject in this.nodeObjects) {
        let deselectedNode = this.nodeObjects[nodeObject],
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
      document.getElementById('refreshData').style.marginLeft = 'auto';
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
    let nodeType = '',
      edgeType = '',
      nodeID = selectedIDs.nodes[0],
      edgeID = selectedIDs.edges[0],
      selectedNodeDetails = [],
      selectedNodesForExtendingGraph = [];

    switch (selected) {
      case 'node':
        let nodeDetails = {
          network: network,
          nodeID: nodeID,
          nodeType: nodeType,
          selectedNodeDetails: selectedNodeDetails,
          selected: selected,
          selectedNodesForExtendingGraph: selectedNodesForExtendingGraph
        };
        this.loadNodeContextMenu(nodeDetails);
        break;
      case 'edge':
        let edgeDetails = {
          network: network,
          edgeID: edgeID,
          edgeType: edgeType,
          selectedNodeDetails: selectedNodeDetails,
          selected: selected
        };
        this.loadEdgeContextMenu(edgeDetails);
        break;
      default:
        break;
    }
  }

  loadNodeContextMenu(nodeDetails) {
    let {network, nodeID, nodeType, selectedNodeDetails, selected, selectedNodesForExtendingGraph} = nodeDetails,
      {state} = this;
    if (!isUndefined(nodeID)) {
      state.nodes.forEach((nodeObject) => {
        let node = network.body.nodes[nodeObject.id];
        if (nodeObject.id === nodeID) {
          selectedNodeDetails.push(nodeObject.nodeDetails);
          nodeType = nodeObject.type;
          node.setOptions({
            image: getIcon(nodeObject.type, nodeObject.status, 'SELECTED')
          });
        }
        else {
          node.setOptions({
            image: getIcon(nodeObject.type, nodeObject.status, 'INACTIVE')
          });
        }
      });

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
  }

  loadEdgeContextMenu(edgeDetails) {
    let {network, edgeID, edgeType, selectedNodeDetails, selected} = edgeDetails,
      {state} = this;

    if (!isUndefined(edgeID)) {
      state.edges.forEach((edgeObject) => {
        if (edgeObject.id === edgeID) {
          selectedNodeDetails.push(edgeObject.edgeDetails);
          edgeType = edgeObject.type;
        }
      });

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
        {reportId, parameters, actionsCount, actionId, actionLabel, fullMalwareReportLink} = actionDetails;

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

      let details = {
        network: network,
        actionId: actionId,
        reportId: reportId,
        nodeID: nodeID,
        timeWindow: timeWindow,
        parameters: parameters,
        selectedNodesForExtendingGraph: selectedNodesForExtendingGraph,
        contextMenuType: contextMenuType,
        actionsCount: actionsCount
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
      timeWindow,
      parameters,
      selectedNodesForExtendingGraph,
      contextMenuType,
      actionsCount
    } = details;

    const extendedNodes = fetchExtendedNodes(reportId, timeWindow, parameters),
      that = this;
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

    displayActionAsSelected(actionsCount, actionId);
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
  }

  isGraphExtended(nodes, edges, extendedNodes) {
    let isGraphExtended = false,
      nodesEdges = this.getNodesEdges(extendedNodes[0]);

    if (!isUndefined(nodesEdges.nodes)) {
      nodesEdges.nodes.forEach((node) => {
        if (isNodeOrEdgeAlreadyExists(nodes, node.id) === false) {
          nodes.push(node);
          this.nodeObjects[node.id] = node;
          isGraphExtended = true;
        }
      });
    }

    if (!isUndefined(nodesEdges.edges)) {
      nodesEdges.edges.forEach((edge) => {
        if (isNodeOrEdgeAlreadyExists(edges, edge.id) === false) {
          edges.push(edge);
          this.edgeObjects[edge.to] = edge;
          this.edgeObjects[edge.id] = edge;
          isGraphExtended = true;
        }
      });
    }

    return isGraphExtended;
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
      }
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
        <div ref={(ref) => this.networkGraph = ref} style={props.attributes.canvasStyle}
          id='network-graph'>
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

        <div id='undoGraph' style={{...style.undoGraph, ...undoResetStyle}}>
          <img id='undo' src='/img/undo.png' />
        </div>

        <div id='resetGraph' style={{...style.resetGraph, ...undoResetStyle}}>
          <img id='reset' src='/img/reset.png' />
        </div>
      </div>
    );
  }
}

NetworkGraph.contextTypes = {
  store: React.PropTypes.object
};

export default NetworkGraph;
