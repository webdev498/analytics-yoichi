import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import $ from 'jquery';
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
  undoGraphStyle: {
    top: '560px',
    left: '35px',
    position: 'absolute',
    cursor: 'pointer',
    display: 'none'
  },
  resetGraphStyle: {
    top: '530px',
    left: '35px',
    position: 'absolute',
    cursor: 'pointer',
    display: 'none'
  },
  loaderStyle: {
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
    color: Colors.networkNodeLabelColor,
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

    let reputationText = parseReputationText(values, newLine1, newLine2, value1, value2, value5);
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

function parseReputationText(values, newLine1, newLine2, value1, value2, value5) {
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

class NetworkGraph extends React.Component {
  static propTypes = {
    duration: PropTypes.string,
    params: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {duration, params} = this.props,
      alertDate = params.date;
    let emptyNodesEdges = {
      nodes: [],
      edges: []
    };

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
    this.deselectNode = this.deselectNode.bind(this);
    this.deselectEdge = this.deselectEdge.bind(this);

    this.loadContextMenu = this.loadContextMenu.bind(this);
    this.getContextMenu = this.getContextMenu.bind(this);

    this.extendGraph = this.extendGraph.bind(this);

    this.undoGraph = this.undoGraph.bind(this);
    this.resetGraph = this.resetGraph.bind(this);
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

    if (!isNull(this.networkGraph) && !isUndefined(this.networkGraph)) {
      if (networkData.nodes.length > 0) {
        this.createNetworkGraph(networkData);
      }
      else {
        document.getElementById('networkGraph').innerHTML = 'No additional results were found.';
      }
    }
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
        node = network.body.nodes[hoverNode],
        selectedNodesForExtendingGraph = that.state.selectedNodesForExtendingGraph;

      if (!isUndefined(nodeObjects[hoverNode])) {
        node.setOptions({
          image: getIcon(nodeObjects[hoverNode].type, nodeObjects[hoverNode].status, 'HOVER')
        });

        for (let i = 0; i < selectedNodesForExtendingGraph.length; i++) {
          if (selectedNodesForExtendingGraph[i].nodeID === hoverNode) {
            node.setOptions({
              image: getIcon(nodeObjects[hoverNode].type, nodeObjects[hoverNode].status, 'SELECTED')
            });
          }
        }
      }
    });

    network.on('blurNode', function(params) {
      let blurNode = params.node,
        node = network.body.nodes[blurNode],
        selectedNodesForExtendingGraph = that.state.selectedNodesForExtendingGraph;

      if (!isUndefined(nodeObjects[blurNode])) {
        node.setOptions({
          image: getIcon(nodeObjects[blurNode].type, nodeObjects[blurNode].status, 'INACTIVE')
        });

        for (let i = 0; i < selectedNodesForExtendingGraph.length; i++) {
          if (selectedNodesForExtendingGraph[i].nodeID === blurNode) {
            node.setOptions({
              image: getIcon(nodeObjects[blurNode].type, nodeObjects[blurNode].status, 'SELECTED')
            });
          }
        }
      }
    });

    document.getElementsByClassName('vis-up')[0].style.visibility = 'hidden';
    document.getElementsByClassName('vis-down')[0].style.visibility = 'hidden';
    document.getElementsByClassName('vis-left')[0].style.visibility = 'hidden';
    document.getElementsByClassName('vis-right')[0].style.visibility = 'hidden';
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
          i++;
        }
      }
    };
  }

  loadContextMenu(network, contextMenuType) {
    return (event) => {
      let listHTML = {
        loadAgain: false,
        actions: ''
      };
      this.setState(listHTML);

      if (contextMenuType === 'node' && network.getSelection().nodes.length > 0) {
        let SelectedNodeIDs = network.getSelection(),
          selectedNodeDetails = '',
          nodeType = '',
          nodeID = SelectedNodeIDs.nodes[0],
          selectedNodesForExtendingGraph = [];

        let nodeAt = network.getBoundingBox(nodeID);

        if (!isUndefined(nodeID)) {
          for (let i = 0; i < this.state.nodes.length; i++) {
            let node = network.body.nodes[this.state.nodes[i].id];
            if (this.state.nodes[i].id === nodeID) {
              selectedNodeDetails += this.state.nodes[i].nodeDetails;
              nodeType = this.state.nodes[i].type;
              node.setOptions({
                image: getIcon(this.state.nodes[i].type, this.state.nodes[i].status, 'SELECTED')
              });
            }
            else {
              node.setOptions({
                image: getIcon(this.state.nodes[i].type, this.state.nodes[i].status, 'INACTIVE')
              });
            }
          }

          document.getElementById('actions').innerHTML = '';
          let test = this.getContextMenu(contextMenuType, network, nodeID, nodeType, nodeAt);
          console.log(test);
          document.getElementById('actions').innerHTML =
            this.getContextMenu(contextMenuType, network, nodeID, nodeType, nodeAt);
          // $('#actions').append(this.getContextMenu(contextMenuType, network, nodeID, nodeType, nodeAt));

          document.getElementById('actionPerformed').style.width = '259px';
          document.getElementById('rightArrow').style.display = 'block';
          document.getElementById('contextualMenuContents').style.display = 'block';
          // This is needed when we add search text box in contextual menu. Currently, it is commented.
          // document.getElementById('searchNetworkNode').style.display = 'block';
          document.getElementById('expandCM').style.display = 'none';

          document.getElementById('refreshData').style.marginLeft = '735px';

          selectedNodesForExtendingGraph.push({
            nodeID: nodeID,
            reportId: '',
            timeWindow: timeWindow
          });

          let states = {
            loadAgain: false,
            selectedNodeDetails: selectedNodeDetails,
            selectedNode: nodeID,
            showContextMenu: true,
            selectedNodesForExtendingGraph: selectedNodesForExtendingGraph
          };
          this.setState(states);
        }
      }

      if (contextMenuType === 'edge' && network.getSelection().edges.length > 0) {
        let SelectedNodeIDs = network.getSelection(),
          selectedNodeDetails = '',
          nodeType = '',
          nodeID = SelectedNodeIDs.edges[0],
          nodeAt = network.getBoundingBox(nodeID);

        if (!isUndefined(nodeID)) {
          for (let i = 0; i < this.state.edges.length; i++) {
            if (this.state.edges[i].id === nodeID) {
              selectedNodeDetails += this.state.edges[i].edgeDetails;
              nodeType = this.state.edges[i].type;
            }
          }

          let test = this.getContextMenu(contextMenuType, network, nodeID, nodeType, nodeAt);
          console.log(test);
          document.getElementById('actions').innerHTML =
            this.getContextMenu(contextMenuType, network, nodeID, nodeType, nodeAt);
          // $('#actions').append(this.getContextMenu(contextMenuType, network, nodeID, nodeType, nodeAt));

          document.getElementById('actionPerformed').style.width = '259px';
          document.getElementById('rightArrow').style.display = 'block';
          document.getElementById('contextualMenuContents').style.display = 'block';
          // This is needed when we add search text box in contextual menu. Currently, it is commented.
          // document.getElementById('searchNetworkNode').style.display = 'block';
          document.getElementById('expandCM').style.display = 'none';

          document.getElementById('refreshData').style.marginLeft = '735px';

          let states = {
            loadAgain: false,
            selectedNodeDetails: selectedNodeDetails,
            showContextMenu: true
          };
          this.setState(states);
        }
      }
    };
  }

  getContextMenu(contextMenuType, network, nodeID, nodeType, nodeAt) {
    return (event) => {
      let table = document.createElement('table');
      table.border = '0';
      table.width = '259';
      table.cellPadding = '10';
      table.cellSpacing = '10';

      let actionsData = this.state.actionsData,
        actionsList = [];

      for (let i = 0; i < actionsData.length; i++) {
        if ((actionsData[i].nodeType).toLowerCase() === nodeType.toLowerCase()) {
          actionsList = Object.assign(actionsList, actionsData[i].actions);
        }
      }

      // Append the actions associated with nodes
      if (!isUndefined(nodeObjects[nodeID]) && !isUndefined(nodeObjects[nodeID].actions) &&
        nodeObjects[nodeID].actions.length > 0) {
        actionsList = Object.assign(actionsList, nodeObjects[nodeID].actions);
      }

      for (let j = 0; j < actionsList.length; j++) {
        let parameters = actionsList[j].parameters,
          parametersToApi = [],
          userInputParameters = [],
          linkValueForFullMalwareReport = '';

        if (!isUndefined(parameters.length)) {
          for (let k = 0; k < parameters.length; k++) {
            let tempObj = {};
            if (parameters[k].userInput === false && parameters[k].name !== 'link') {
              tempObj.name = parameters[k].name;
              if (!isUndefined(parameters[k].value)) {
                tempObj.value = parameters[k].value;
              }
              else {
                if (parameters[k].name === 'id') {
                  tempObj.value = nodeID;
                }
                else if (parameters[k].name === 'type') {
                  tempObj.value = nodeType;
                }
                else if (parameters[k].name === 'date') {
                  tempObj.value = this.state.alertDate;
                }
                else if (parameters[k].name === 'ip' && (nodeType.toLowerCase() === 'internal_ip' ||
                  nodeType.toLowerCase() === 'external_ip')) {
                  tempObj.value = nodeID;
                }
                else if (parameters[k].name === 'source.id') {
                  if (!isUndefined(edgeObjects[nodeID])) {
                    tempObj.value = edgeObjects[nodeID].from;
                  }
                  else {
                    tempObj.value = '';
                  }
                }
                else if (parameters[k].name === 'target.id') {
                  if (!isUndefined(edgeObjects[nodeID])) {
                    tempObj.value = edgeObjects[nodeID].to;
                  }
                  else {
                    tempObj.value = '';
                  }
                }
                else if ((parameters[k].name).indexOf('metadata') > -1) {
                  let paramName = (parameters[k].name).replace('metadata.', ''),
                    metadataValue = nodeObjects[nodeID].metadata[paramName];
                  tempObj.value = (!isUndefined(metadataValue)) ? metadataValue : '';
                }
                else {
                  tempObj.value = '';
                }
              }

              tempObj.userInput = false;
              parametersToApi.push(tempObj);
            }
            if (parameters[k].userInput === true) {
              tempObj.name = parameters[k].name;
              tempObj.id = parameters[k].name + j;
              tempObj.value = '';
              tempObj.userInput = true;
              parametersToApi.push(tempObj);
            }
            if (parameters[k].name === 'link') {
              linkValueForFullMalwareReport = !isUndefined(parameters[k].value)
              ? parameters[k].value : '';
            }
          }

          userInputParameters = checkForUserInputs(parameters);
        }
        let tr = document.createElement('tr'),
          td1 = document.createElement('td'),
          reportId = (!isUndefined(actionsList[j].reportId)) ? actionsList[j].reportId
          : (!isUndefined(actionsList[j].name) ? actionsList[j].name : ''),
          actionType = (!isUndefined(actionsList[j].actionType)) ? actionsList[j].actionType : '';

        td1.appendChild(document.createTextNode(actionsList[j].label));
        td1.id = 'action' + j;
        td1.onclick = this.extendGraph(contextMenuType, network, nodeID, nodeType,
          reportId, parametersToApi, actionsList.length, 'action' + j, actionsList[j].label,
          linkValueForFullMalwareReport);

        let td2 = document.createElement('td');
        if (userInputParameters.length > 0) {
          td2.id = 'downarrow' + j;
          td2.style = 'padding-left:0px;';
          let downArrow = document.createElement('img');
          downArrow.src = '/img/downarrow.png';
          td2.appendChild(downArrow);
        }
        else {
          td1.colSpan = '2';
        }

        tr.appendChild(td1);

        if (userInputParameters.length > 0) {
          tr.appendChild(td2);
        }

        table.appendChild(tr);

        if (userInputParameters.length > 0) {
          for (let p = 0; p < userInputParameters.length; p++) {
            let trUserInput = document.createElement('tr');
            let tdUserInput = document.createElement('td');
            tdUserInput.style = 'cursor:auto;';
            tdUserInput.appendChild(document.createTextNode(
              firstCharCapitalize(userInputParameters[p].name + ' :')));
            let inputParameter = document.createElement('input');
            inputParameter.setAttribute('type', 'text');
            inputParameter.setAttribute('style', 'color:black;');
            inputParameter.setAttribute('placeholder', userInputParameters[p].name);
            inputParameter.setAttribute('name', userInputParameters[p].name + j);
            inputParameter.setAttribute('id', userInputParameters[p].name + j);
            tdUserInput.appendChild(inputParameter);
            trUserInput.appendChild(tdUserInput);
            table.appendChild(trUserInput);
          }
        }
      }

      let listHTML = {
        'loadAgain': false,
        'actions': '<ul>' + table.innerHTML + '</ul>'
      };
      this.setState(listHTML);

      return table;
    };
  }

  extendGraph(contextMenuType, network, nodeID, nodeType, reportId, parameters, actionsCount, actionId, actionLabel,
    linkValueForFullMalwareReport) {
    const that = this;
    return (event) => {
      this.setState({
        isFetching: true,
        loaderText: actionLabel
      });
      let selectedNodesForExtendingGraph = that.state.selectedNodesForExtendingGraph;
      for (let i = 0; i < selectedNodesForExtendingGraph.length; i++) {
        if (selectedNodesForExtendingGraph[i].nodeID === nodeID &&
          selectedNodesForExtendingGraph[i].reportId === reportId &&
          selectedNodesForExtendingGraph[i].timeWindow === timeWindow) {
          let position = getPosition(document.getElementById(actionId));
          document.getElementById('actionPerformed').innerHTML = 'You have already performed this action.';
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

          that.setState({
            isFetching: false
          });
          return;
        }
      }

      if (linkValueForFullMalwareReport !== '') {
        window.open(baseUrl + linkValueForFullMalwareReport);
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
            let position = getPosition(document.getElementById(actionId));
            document.getElementById('actionPerformed').innerHTML =
              'No additional results found.';
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
            let position = getPosition(document.getElementById(actionId));
            document.getElementById('actionPerformed').innerHTML =
              'No additional results found.';
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

            that.setState({
              isFetching: false
            });
            return;
          }

          document.getElementById('undo').onclick = that.undoGraph(network);
          document.getElementById('reset').onclick = that.resetGraph(network);
        }
      );

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
    };
  }

  render() {
    const {props} = this;

    let assetData;
    if (props.data && !Array.isArray(props.data)) {
      assetData = generateDataFromAssetDetails(props.data);
    }

    let undoResetStyle = {display: this.state.showUndoResetButtons ? 'block' : 'none'};

    return (
      <div style={{display: 'flex'}}>
        {this.state.isFetching ? <Loader style={{}} loaderStyle={style.loaderStyle}
          text={this.state.loaderText} /> : null}
        <div ref={(ref) => this.networkGraph = ref} style={{...style.networkGraph,
          ...{
            width: '1100px'
          }}}
          id='networkGraph'>
          {
            assetData
            ? this.loadNetworkGraph(assetData, this.state.loadAgain, props.duration)
            : this.loadNetworkGraph(props.data, this.state.loadAgain, props.duration)
          }
        </div>

        <ContextualMenu
          showContextMenu={this.state.showContextMenu}
          selectedDetails={this.state.selectedNodeDetails} />

        <div id='undoGraph' style={{...style.undoGraphStyle, ...undoResetStyle}}>
          <img id='undo' src='/img/undo.png' />
        </div>

        <div id='resetGraph' style={{...style.resetGraphStyle, ...undoResetStyle}}>
          <img id='reset' src='/img/reset.png' />
        </div>
      </div>
    );
  }

  undoGraph(network) {
    return (event) => {
      let previousNodesEdges = this.state.previousNodesEdges;
      if (!isUndefined(previousNodesEdges.nodes) &&
        !isUndefined(previousNodesEdges.edges)) {
        if (!isUndefined(previousNodesEdges.nodes[undoGraphCount]) &&
          !isUndefined(previousNodesEdges.edges[undoGraphCount])) {
          let updatedNodes = Object.assign([], previousNodesEdges.nodes[undoGraphCount]),
            updatedEdges = Object.assign([], previousNodesEdges.edges[undoGraphCount]);

          network.setData({nodes: previousNodesEdges.nodes[undoGraphCount],
            edges: previousNodesEdges.edges[undoGraphCount]});

          if (previousNodesEdges.nodes[undoGraphCount].length <= 10) {
            network.setOptions(physicsFalse);
          }
          else {
            network.setOptions(physicsTrue);
          }

          for (let key in nodeObjects) {
            if (!isUndefined(updatedNodes.length)) {
              for (let i = 0; i < updatedNodes.length; i++) {
                if (updatedNodes[i].id !== key) {
                  delete nodeObjects[key];
                }
              }
            }
          }

          for (let key in edgeObjects) {
            if (!isUndefined(updatedEdges.length)) {
              for (let i = 0; i < updatedEdges.length; i++) {
                if (updatedEdges[i].id !== key) {
                  delete edgeObjects[key];
                }
              }
            }
          }

          let tempNodesArray = Object.assign([], previousNodesEdges.nodes),
            tempEdgesArray = Object.assign([], previousNodesEdges.edges);

          tempNodesArray.splice(undoGraphCount, 1);
          tempEdgesArray.splice(undoGraphCount, 1);

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
            previousNodesEdges: {
              nodes: Object.assign([], tempNodesArray),
              edges: Object.assign([], tempEdgesArray)
            }
          });

          document.getElementById('actions').innerHTML = '';
          undoGraphCount--;
        }
      }
    };
  }

  resetGraph(network) {
    return (event) => {
      let originalNodesEdges = this.state.originalNodesEdges;
      if (!isUndefined(originalNodesEdges.nodes) &&
        !isUndefined(originalNodesEdges.edges)) {
        let updatedNodes = Object.assign([], originalNodesEdges.nodes),
          updatedEdges = Object.assign([], originalNodesEdges.edges);

        network.setData({nodes: originalNodesEdges.nodes,
          edges: originalNodesEdges.edges});

        if (originalNodesEdges.nodes.length <= 10) {
          network.setOptions(physicsFalse);
        }
        else {
          network.setOptions(physicsTrue);
        }

        for (let key in nodeObjects) {
          if (!isUndefined(updatedNodes.length)) {
            for (let i = 0; i < updatedNodes.length; i++) {
              if (updatedNodes[i].id !== key) {
                delete nodeObjects[key];
              }
            }
          }
        }

        for (let key in edgeObjects) {
          if (!isUndefined(updatedEdges.length)) {
            for (let i = 0; i < updatedEdges.length; i++) {
              if (updatedEdges[i].id !== key) {
                delete edgeObjects[key];
              }
            }
          }
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
          previousNodesEdges: {
            nodes: [],
            edges: []
          }
        });

        document.getElementById('actions').innerHTML = '';
        undoGraphCount = 0;
      }
    };
  }
}

NetworkGraph.contextTypes = {
  store: React.PropTypes.object
};

export default NetworkGraph;
