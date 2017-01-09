import React, {PropTypes} from 'react';
import {Colors} from '../../commons/colors';
import {
  firstCharCapitalize,
  getPosition,
  isUndefined,
  isNull,
  whatIsIt,
  formatDateInLocalTimeZone,
  autoScrollTo
} from '../../commons/utils/utils';
import {getCountryName} from '../../commons/utils/countryUtils';
import Cookies from 'cookies-js';
import vis from 'vis';
import {baseUrl, networkGraphDefaultOptions, hierarchicalNetwork, applyHierarchicalNetwork} from 'config';

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

export function createNodeObject(dataNode) {
  let nodeId = dataNode.nodeId ? dataNode.nodeId : '',
    idDisplay = dataNode.label ? dataNode.label : (dataNode.id ? dataNode.id : dataNode.nodeId),
    nodeType = dataNode.type ? dataNode.type : '';

  if (dataNode.type === 'country') {
    idDisplay = (!isUndefined(getCountryName[idDisplay]))
      ? getCountryName[idDisplay]
      : idDisplay;
  }
  else if (dataNode.type === 'time') {
    let dateTime = formatDateInLocalTimeZone(idDisplay);
    idDisplay = dateTime.date + ' ' + dateTime.time;
  }

  let nodeObject = {
    id: nodeId,
    notNodeId: dataNode.id ? dataNode.id : '',
    type: nodeType,
    label: '  ' + idDisplay,
    title: '<b>' + dataNode.nodeTypeDisplay + ':</b> ' + idDisplay,
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
    },
    actionData: dataNode.actionData ? dataNode.actionData : {}
  };

  nodeObject.nodeDetails.push(<li key='nodeId'><b>{dataNode.nodeTypeDisplay}:</b> {idDisplay}</li>);

  let metaDataObject = handleNodeMetaData(dataNode.metadata, nodeObject),
    nodeStatus = metaDataObject.nodeStatus;
  nodeObject = metaDataObject.nodeObject;
  nodeObject.image = getIcon(dataNode.type, nodeStatus, 'INACTIVE');
  return nodeObject;
}

export function createEdgeObject(dataEdge, edgesInSameDirection) {
  let edgeObject = {
      id: dataEdge.id,
      notNodeId: dataEdge.id ? dataEdge.id : '',
      type: [],
      from: dataEdge.source,
      to: dataEdge.target,
      arrows: {
        to: {
          scaleFactor: 0.5
        },
        arrowStrikethrough: false
      },
      label: dataEdge.label ? dataEdge.label + '\n\n\n' : '',
      title: dataEdge.label ? dataEdge.label : '',
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
      edgeDetails: [],
      actionData: dataEdge.actionData ? dataEdge.actionData : {}
    },
    edgesTypes = [];

  if (displayEdgeAsDashLine(dataEdge.type)) {
    edgeObject.dashes = true;
  }

  if (dataEdge.type) {
    edgeObject.type.push(dataEdge.type);
  }

  edgesTypes.push(
    <li key='1'>{edgesInSameDirection.length > 0 ? '1. ' : ''}{dataEdge.label}</li>
  );

  if (edgesInSameDirection.length > 0) {
    edgesInSameDirection.forEach((edgeInSameDirection, index) => {
      edgeObject.type.push(edgeInSameDirection.type);
      edgeObject.title += '<br />' + edgeInSameDirection.label;
      edgesTypes.push(
        <li key={index + 2}>{index + 2}. {edgeInSameDirection.label}</li>
      );
    });
  }

  let metaDataObject = handleEdgeMetaData(dataEdge.metadata, edgeObject);
  edgeObject = metaDataObject.edgeObject;

  edgeObject.edgeDetails.push(
    <ul className='no-list-style'>
      <li key='edgeType'><b>Edge Type:</b>
        <ol style={{padding: 0}}>
          {edgesTypes}
        </ol>
      </li>
      <li key='source'><b>Source:</b> {dataEdge.source}</li>
      <li key='target'><b>Target:</b> {dataEdge.target}</li>
      {metaDataObject.edgeMetaData}
    </ul>
  );

  return edgeObject;
}

function displayEdgeAsDashLine(type) {
  let dashes = false;
  switch (type) {
    case 'ioc':
      dashes = true;
      break;
    default:
      break;
  }
  return dashes;
}

function handleEdgeMetaData(metadata, edgeObject) {
  edgeObject.metadata = metadata;
  let edgeMetaData = [];
  for (let metadataType in metadata) {
    let metadataTypeLower = metadataType.toLowerCase();
    if (metadataTypeLower === 'date' || metadataTypeLower === 'datetime') {
      let dateTime = formatDateInLocalTimeZone(metadata[metadataType]);
      edgeObject.title += '<br />' + dateTime.date + ' ' + dateTime.time;
      edgeMetaData.push(<li key='date'> {dateTime.date} {dateTime.time}</li>);
    }
    else {
      edgeObject.title += '<br /><b>' + firstCharCapitalize(metadataType) + ':</b> ' +
        metadata[metadataType];
      edgeMetaData.push(
        <li key={metadataType}><b>{firstCharCapitalize(metadataType)}:</b> {metadata[metadataType]}</li>
      );
    }
  }
  return {
    edgeMetaData: edgeMetaData,
    edgeObject: edgeObject
  };
}

function handleNodeMetaData(metadata, nodeObject) {
  let nodeStatus = 'safe',
    isNameDisplayed = false;
  nodeObject.metadata = metadata;
  for (let metadataType in metadata) {
    let metadataTypeLower = metadataType.toLowerCase(),
      newLine1 = '\n  ',
      newLine2 = '<br />';

    metadataTypeLower = (metadataTypeLower === 'date' ||
      metadataTypeLower === 'start_date' ||
      metadataTypeLower === 'end_date')
    ? 'date'
    : metadataTypeLower;

    metadataTypeLower = (nodeObject.type === 'anomaly' && metadataTypeLower === 'date')
      ? 'anomalyDate'
      : nodeObject.type === 'anomaly' && (metadataTypeLower === 'start_date' || metadataTypeLower === 'end_date')
        ? 'date'
        : nodeObject.type !== 'anomaly' &&
          (metadataTypeLower === 'date' || metadataTypeLower === 'start_date' || metadataTypeLower === 'end_date')
          ? 'date'
          : metadataTypeLower;

    let displayMetaData = (metadataTypeLower !== '' &&
      metadataTypeLower !== 'coordinates' &&
      metadataTypeLower !== 'multiple');

    if (displayMetaData) {
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
            getCountryName[metadata[metadataType]];
          nodeObject.title += newLine2 + '<b>' + firstCharCapitalize(metadataType) + ':</b> ' +
            getCountryName[metadata[metadataType]];
          nodeObject.nodeDetails.push(<li key={metadataType}><b>{firstCharCapitalize(metadataType)}:</b>
            &nbsp;{getCountryName[metadata[metadataType]]}</li>);
          break;
        case 'anomalyDate':
          let dateTimeAnomaly = formatDateInLocalTimeZone(metadata[metadataType]),
            time = nodeObject.type === 'anomaly' ? '' : ' ' + dateTimeAnomaly.time;
          nodeObject.label += newLine1 + dateTimeAnomaly.date + time;
          if (nodeObject.type === 'anomaly' &&
            ((!isUndefined(metadata.multiple) && !metadata.multiple) || isUndefined(metadata.multiple))) {
            nodeObject.title += newLine2 + dateTimeAnomaly.date + time;
          }
          nodeObject.nodeDetails.push(
            <li key={metadataType}>{dateTimeAnomaly.date}{time}</li>
          );
          break;
        case 'date':
          let dateTime = formatDateInLocalTimeZone(metadata[metadataType]);
          nodeObject.label += newLine1 + firstCharCapitalize(metadataType) + ': ' +
            dateTime.date + ' ' + dateTime.time;
          nodeObject.title += newLine2 + '<b>' + firstCharCapitalize(metadataType) + ':</b> ' +
            dateTime.date + ' ' + dateTime.time;
          nodeObject.nodeDetails.push(
            <li key={metadataType}><b>{firstCharCapitalize(metadataType)}:</b> {dateTime.date} {dateTime.time}</li>
          );
          break;
        case 'displayname':
          if (!isNameDisplayed) {
            nodeObject.title += newLine2 + '<b>Name:</b> ' + metadata[metadataType];
            nodeObject.nodeDetails.push(<li key={metadataType}><b>Name:</b> {metadata[metadataType]}</li>);
            isNameDisplayed = true;
          }
          break;
        default:
          if (isNameDisplayed && metadataTypeLower === 'name') {
            break;
          }
          if (metadataTypeLower === 'title') {
            nodeObject.label += newLine1 + firstCharCapitalize(metadataType) + ': ' +
              addNewlines(metadata[metadataType]);
          }
          if (whatIsIt(metadata[metadataType]) === 'Array') {
            let metadataArray = metadata[metadataType];
            nodeObject.nodeDetails.push(
              <li key={metadataType}><b>{firstCharCapitalize(metadataType)}:</b></li>
            );
            metadataArray.forEach((value, index) => {
              nodeObject.nodeDetails.push(
                <li key={metadataType + index}>{index + 1}. {value}</li>
              );
            });
          }
          else {
            nodeObject.title += newLine2 + '<b>' + firstCharCapitalize(metadataType) + ':</b> ' +
              metadata[metadataType];
            nodeObject.nodeDetails.push(
              <li key={metadataType}><b>{firstCharCapitalize(metadataType)}:</b> {metadata[metadataType]}</li>
            );
          }
          if (metadataTypeLower === 'name') {
            isNameDisplayed = true;
          }
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
    let key = 'nodeDetails_' + nodeObject.id;
    nodeObject.label += newLine1 + label;
    nodeObject.title += newLine2 + title;
    if (nodeDetails.includes('<br />')) {
      let tempNodeDetails = nodeDetails.split('<br />');
      tempNodeDetails.forEach((nodeDetail, index) => {
        key = key + '_' + index;
        nodeObject.nodeDetails.push(<li key={key}>{nodeDetail}</li>);
      });
    }
    else {
      nodeObject.nodeDetails.push(<li key={key}>{nodeDetails}</li>);
    }

    nodeStatus = (label.includes('Scanning Host')) ? 'scan' : 'malicious';
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
  if (nodeType === 'anomaly') {
    nodeStatus = 'malicious';
  }
  const iconPath = '/img/Node-' + nodeStatus + '-' + nodeAction + '/' + nodeType + '-' + nodeStatus + '.png';

  if (nodeType !== '') {
    return iconPath;
  }
  else {
    return '/img/inactive.png';
  }
}

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

    this.network = null;
  }

  componentWillReceiveProps(nextProps) {
    const {props} = this;

    if (nextProps.eventData && (nextProps.eventData !== props.eventData)) {
      // const {id} = nextProps.eventData;
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

    this.network = network;

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

        if (nodeObject.type === 'anomaly') {
          this.toggleHighlightAnomalyChart(nodeObject);
        }
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

      props.fetchApiData(props.timelineId, apiObj, {}, {});

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
      }
    };
  }

  render() {
    const {props, state} = this;

    let assetData;
    if (props.data && !Array.isArray(props.data)) {
      assetData = generateDataFromAssetDetails(props.data);
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
      </div>
    );
  }
}

NetworkGraph.contextTypes = {
  store: React.PropTypes.object
};

export default NetworkGraph;
