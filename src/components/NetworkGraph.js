import React from 'react';
import {Colors} from 'theme/colors';
import $ from 'jquery';
import {
  firstCharCapitalize,
  getCountryNameByCountryCode
} from 'utils/utils';
import Cookies from 'cookies-js';
import {baseUrl} from 'config';
import Loader from '../components/Loader';

const style = {
    searchTextBox: {
      backgroundColor: '#646A7D',
      padding: '10px',
      border: '0px',
      margin: '5%',
      width: '90%',
      height: '50px',
      color: '#BBBBC3',
      fontFamily: 'Open Sans'
    },
    selectedNodeDetails: {
      margin: '5%',
      width: '90%',
      color: '#24293D',
      fontFamily: 'Open Sans'
    },
    loaderStyle: {

    }
  },
  nodeObjects = {},
  edgeObjects = {};

// let x = 0,
//   y = 0,
//   xArray = [0, 350, 350, 350, 350, 80, -40, 80, 10, -60],
//   yArray = [0, -100, 20, 175, 280, 180, 180, 290, 290, 290];

function getNodesEdges(data) {
  let nodes = [],
    edges = [],
    dataNodes = data.nodes,
    dataEdges = data.edges;

  if (dataNodes !== undefined) {
    for (let i = 0; i < dataNodes.length; i++) {
      let dataNode = dataNodes[i],
        nodeObject = {},
        nodeStatus = 'safe';

      nodeObject.id = dataNode.id;
      nodeObject.type = dataNode.type;
      nodeObject.label = '\n  <b>' + firstCharCapitalize(dataNode.type) + ':</b> ' + dataNode.id;
      nodeObject.title = '<b>' + firstCharCapitalize(dataNode.type) + ':</b> ' + dataNode.id;
      nodeObject.nodeDetails = firstCharCapitalize(dataNode.type) + ': ' + dataNode.id;
      for (let metadataType in dataNode.metadata) {
        let metadataTypeLower = metadataType.toLowerCase();
        if (metadataTypeLower !== 'coordinates') {
          switch (metadataTypeLower) {
            case 'reputation':
              let values = dataNode.metadata[metadataType].reputation,
                value1 = '',
                value2 = '';
              for (let v = 0; v < values.length; v++) {
                if (v === 0) {
                  value1 = values[0];
                  value2 = values[0];
                }
                else {
                  value1 += ',\n  ' + values[0];
                  value2 += ',<br />' + values[0];
                }
              }
              if (value1 !== '') {
                nodeObject.label += '\n  <b>' + firstCharCapitalize(metadataType) + ':</b> ' +
                  value1;
                nodeObject.title += '<br /><b>' + firstCharCapitalize(metadataType) + ':</b> ' +
                  value2;
                nodeObject.nodeDetails += '<br />' + firstCharCapitalize(metadataType) + ': ' +
                  value2;

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
              break;
            case 'country':
              nodeObject.label += '\n  <b>' + firstCharCapitalize(metadataType) + ':</b> ' +
                getCountryNameByCountryCode[dataNode.metadata[metadataType]];
              nodeObject.title += '<br /><b>' + firstCharCapitalize(metadataType) + ':</b> ' +
                getCountryNameByCountryCode[dataNode.metadata[metadataType]];
              nodeObject.nodeDetails += '<br />' + firstCharCapitalize(metadataType) + ': ' +
                getCountryNameByCountryCode[dataNode.metadata[metadataType]];
              break;
            case 'displayname':
              nodeObject.label += '\n  <b>Name:</b> ' + dataNode.metadata[metadataType];
              nodeObject.title += '<br /><b>Name:</b> ' + dataNode.metadata[metadataType];
              nodeObject.nodeDetails += '<br />Name: ' + dataNode.metadata[metadataType];
              break;
            default:
              nodeObject.label += '\n  <b>' + firstCharCapitalize(metadataType) + ':</b> ' +
                addNewlines(dataNode.metadata[metadataType]);
              nodeObject.title += '<br /><b>' + firstCharCapitalize(metadataType) + ':</b> ' +
                dataNode.metadata[metadataType];
              nodeObject.nodeDetails += '<br />' + firstCharCapitalize(metadataType) + ': ' +
                dataNode.metadata[metadataType];
              break;
          }
        }
      }
      nodeObject.borderWidth = '0';
      nodeObject.font = {
        'face': 'Open Sans',
        'color': Colors.pebble,
        'size': '11',
        'align': 'left'
      };
      nodeObject.shape = 'image';
      nodeObject.color = {};
      nodeObject.color.color = '#F2F2F4';
      nodeObject.color.highlight = Colors.turquoise;
      nodeObject.status = nodeStatus;
      nodeObject.image = getIcon(dataNode.type, nodeStatus, 'INACTIVE');
      let actions = [];
      if (dataNode.actions !== null && dataNode.actions !== undefined) {
        actions = dataNode.actions;
      }
      nodeObject.actions = actions;
      /* if (xArray[i] !== null && xArray[i] !== undefined) {
        nodeObject.x = xArray[i];
      }
      else {
        nodeObject.x = 350;
      }

      if (yArray[i] !== null && yArray[i] !== undefined) {
        nodeObject.y = yArray[i];
      }
      else {
        nodeObject.y = -100;
      }*/

      nodes.push(nodeObject);
      nodeObjects[dataNode.id] = nodeObject;
    }
  }

  if (dataEdges !== undefined) {
    for (let i = 0; i < dataEdges.length; i++) {
      let dataEdge = dataEdges[i],
        edgeObject = {};

      edgeObject.id = dataEdge.id;
      edgeObject.type = dataEdge.type;
      edgeObject.from = dataEdge.source;
      edgeObject.to = dataEdge.target;
      edgeObject.arrows = {
        'to': {
          'scaleFactor': 0.5
        },
        'arrowStrikethrough': false
      };
      edgeObject.label = dataEdge.label + '\n\n\n';
      edgeObject.edgeDetails = 'Edge Type: ' + dataEdge.label;
      edgeObject.edgeDetails += '<br/>Source: ' + dataEdge.source;
      edgeObject.edgeDetails += '<br/>Target: ' + dataEdge.target;
      edgeObject.font = {
        'face': 'Open Sans',
        'color': Colors.pebble,
        'size': '11',
        'align': 'left'
      };
      edgeObject.length = 1000;
      edgeObject.smooth = {
        type: 'discrete'
      };
      edgeObject.color = {};
      edgeObject.color.color = Colors.pebble;
      edgeObject.color.highlight = Colors.turquoise;

      edges.push(edgeObject);
      edgeObjects[dataEdge.target] = edgeObject;
      edgeObjects[edgeObject.id] = edgeObject;
    }
  }

  return {
    'nodes': nodes,
    'edges': edges
  };
}

function getIcon(nodeType, nodeStatus, nodeAction) {
  nodeType = nodeType.toLowerCase();
  const iconPath = 'img/Node-' + nodeStatus + '-' + nodeAction + '/' + nodeType + '-' + nodeStatus + '.png';

  if (nodeType !== '') {
    return iconPath;
  }
  else {
    return 'img/asset.png';
  }
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
  if (parameters !== undefined && parameters.length !== undefined) {
    for (let i = 0; i < parameters.length; i++) {
      if (i === 0) {
        if (parameters[i].userInput === true) {
          otherParameters = parameters[i].name + '=' + $('#' + parameters[i].id).val();
        }
        else {
          otherParameters = parameters[i].name + '=' + parameters[i].value;
        }
      }
      else {
        if (parameters[i].userInput === true) {
          otherParameters += parameters[i].name + '=' + $('#' + parameters[i].id).val();
        }
        else {
          otherParameters += '&' + parameters[i].name + '=' + parameters[i].value;
        }
      }
    }
  }
  const accessToken = Cookies.get('access_token'),
    tokenType = Cookies.get('token_type'),
    apiUrl = baseUrl + '/api/analytics/actions/execute/' + reportId + '?' + otherParameters,
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
  if (parameters.length !== undefined) {
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
      // let last = str.lastIndexOf(' ');
      // console.log(last, str);
      result += str.substring(0, char) + '\n  '; // Math.min(char, last)
      str = str.substring(char);
    }
    return result;
  }
  return str;
}

class NetworkGraph extends React.Component {
  constructor(props) {
    super(props);
    const {duration} = this.props,
      alertDate = this.props.params.date;

    this.state = {
      nodes: [],
      edges: [],
      style: {
        'networkGraph': {
          'height': '600px',
          'width': '100%'
        },
        'contextualMenu': {
          width: '300px',
          // height: '520px',
          backgroundColor: '#898E9B',
          display: 'none',
          position: 'absolute',
          // left: '830px'
          top: '0px',
          right: '0px'
        }
      },
      selectedNodeDetails: '',
      selectedNode: '',
      loadAgain: true,
      nodesListStatus: 'default',
      actionsData: [],
      actions: '',
      duration: duration,
      alertDate: alertDate,
      selectedNodesForExtendingGraph: [],
      zoomScale: '100%',
      isFetching: false
    };

    this.loadNetworkGraph = this.loadNetworkGraph.bind(this);
    this.getContextMenu = this.getContextMenu.bind(this);
    this.loadContextMenu = this.loadContextMenu.bind(this);
    this.extendGraph = this.extendGraph.bind(this);
  }

  loadNetworkGraph(data, loadAgain) {
    if (!loadAgain) {
      return;
    }

    if (!data) {
      return;
    }

    if (this.state.nodesListStatus === 'default') {
      let nodesEdges = getNodesEdges(data[0]);
      this.state.nodes = nodesEdges.nodes;
      this.state.edges = nodesEdges.edges;
      const actionsData = this.context.store.getState().actions;
      this.state.actionsData = getActionsByTypes(actionsData.list.actions);
    }

    if (this.networkGraph !== null && this.networkGraph !== undefined) {
      let options = {
        /*physics: {
          enabled: true,
          // barnesHut: {
          //   springLength: 10,
          //   avoidOverlap: 0
          // },
          // forceAtlas2Based: {
          //   springLength: 10,
          //   avoidOverlap: 0
          // }
          stabilization: {
            enabled: true
          }
        },*/
        // physics: false,
        physics: {
          'barnesHut': {
            'avoidOverlap': 1
          }
        },
        interaction: {
          navigationButtons: true,
          keyboard: false,
          multiselect: true,
          hover: true,
          selectConnectedEdges: false
        },
        autoResize: true,
        height: '600',
        width: '100%',
        edges: {selectionWidth: 1},
        layout: {
          improvedLayout: true
        }
      };

      // create a network
      let data = {
        nodes: this.state.nodes,
        edges: this.state.edges
      };

      if (data.nodes.length > 0) {
        const that = this;

        let network = new vis.Network(this.networkGraph, data, options);
        network.on('selectNode', this.loadContextMenu(network, 'node'));
        network.on('selectEdge', this.loadContextMenu(network, 'edge'));

        network.on('deselectNode', function(params) {
          let deselectedNode = params.previousSelection.nodes[0];
          let node = network.body.nodes[deselectedNode];
          if (nodeObjects[deselectedNode] !== undefined) {
            node.setOptions({
              image: getIcon(nodeObjects[deselectedNode].type, nodeObjects[deselectedNode].status, 'INACTIVE')
            });

            that.setState({
              'loadAgain': false,
              style: {
                'networkGraph': {
                  'height': '600px',
                  'width': '100%'
                },
                'contextualMenu': {
                  width: '300px',
                  // height: '520px',
                  backgroundColor: '#898E9B',
                  display: 'none',
                  position: 'absolute',
                  // left: '830px'
                  top: '0px',
                  right: '0px'
                }
              },
              selectedNodeDetails: '',
              actions: '',
              selectedNode: ''
            });
            $('#actions').html('');
            document.getElementById('refreshData').style.marginLeft = 'auto';
          }
        });

        network.on('hoverNode', function(params) {
          let hoverNode = params.node,
            selectedNodes = network.getSelection().nodes,
            node = network.body.nodes[hoverNode];

          if (nodeObjects[hoverNode] !== undefined) {
            if (selectedNodes.length > 0) {
              if (selectedNodes.indexOf(hoverNode) > -1) {
                node.setOptions({
                  image: getIcon(nodeObjects[hoverNode].type, nodeObjects[hoverNode].status, 'SELECTED')
                });
              }
              else {
                node.setOptions({
                  image: getIcon(nodeObjects[hoverNode].type, nodeObjects[hoverNode].status, 'HOVER')
                });
              }
            }
            else {
              node.setOptions({
                image: getIcon(nodeObjects[hoverNode].type, nodeObjects[hoverNode].status, 'HOVER')
              });
            }
          }
        });

        network.on('blurNode', function(params) {
          let blurNode = params.node,
            selectedNodes = network.getSelection().nodes,
            node = network.body.nodes[blurNode];

          if (nodeObjects[blurNode] !== undefined) {
            if (selectedNodes.length > 0) {
              if (selectedNodes.indexOf(blurNode) > -1) {
                node.setOptions({
                  image: getIcon(nodeObjects[blurNode].type, nodeObjects[blurNode].status, 'SELECTED')
                });
              }
              else {
                node.setOptions({
                  image: getIcon(nodeObjects[blurNode].type, nodeObjects[blurNode].status, 'INACTIVE')
                });
              }
            }
            else {
              node.setOptions({
                image: getIcon(nodeObjects[blurNode].type, nodeObjects[blurNode].status, 'INACTIVE')
              });
            }
          }
        });

        network.on('zoom', function(params) {
          that.setState({
            'zoomScale': parseInt(params.scale * 100) + '%'
          });
        });

        $('.vis-up').hide();
        $('.vis-down').hide();
        $('.vis-left').hide();
        $('.vis-right').hide();
      }
      else {
        document.getElementById('networkGraph').innerHTML = 'No Data Found.';
      }
    }
  }

  loadContextMenu(network, contextMenuType) {
    return (event) => {
      let actions = document.getElementById('tempActions');
      actions.innerHTML = '';
      let listHTML = {
        'loadAgain': false,
        'actions': ''
      };
      this.setState(listHTML);

      if (contextMenuType === 'node' && network.getSelection().nodes.length > 0) {
        let SelectedNodeIDs = network.getSelection(),
          selectedNodeDetails = '',
          nodeType = '',
          nodeID = SelectedNodeIDs.nodes[0];

        let nodeAt = network.getBoundingBox(nodeID);

        if (nodeID !== undefined) {
          for (let i = 0; i < this.state.nodes.length; i++) {
            let node = network.body.nodes[this.state.nodes[i].id];
            if (this.state.nodes[i].id === nodeID) {
              // console.log('Selected Node Id:', this.state.nodes[i]);
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

          $('#actions').html('');
          $('#actions').append(this.getContextMenu(contextMenuType, network, nodeID, nodeType, nodeAt));
          document.getElementById('refreshData').style.marginLeft = '660px';

          let statesJSON = {
            'loadAgain': false,
            'selectedNodeDetails': selectedNodeDetails,
            selectedNode: nodeID,
            style: {
              'networkGraph': {
                'height': '600px',
                'width': '100%'
              },
              'contextualMenu': {
                width: '300px',
                // height: '520px',
                backgroundColor: '#898E9B',
                position: 'absolute',
                // left: '830px'
                top: '0px',
                right: '0px'
              }
            }
          };
          this.setState(statesJSON);
        }
      }

      if (contextMenuType === 'edge' && network.getSelection().edges.length > 0) {
        let SelectedNodeIDs = network.getSelection(),
          selectedNodeDetails = '',
          nodeType = '',
          nodeID = SelectedNodeIDs.edges[0];

        let nodeAt = network.getBoundingBox(nodeID);
        // console.log('edge', nodeID);
        if (nodeID !== undefined) {
          for (let i = 0; i < this.state.edges.length; i++) {
            let node = network.body.edges[this.state.edges[i].id];
            if (this.state.edges[i].id === nodeID) {
              // console.log('aa: ', this.state.edges[i], nodeID);
              // console.log('Selected Node Id:', this.state.nodes[i]);
              selectedNodeDetails += this.state.edges[i].edgeDetails;
              nodeType = this.state.edges[i].type;
              // node.setOptions({
              //   image: getIcon(this.state.nodes[i].type, this.state.nodes[i].status, 'SELECTED')
              // });
            }
            else {
              // node.setOptions({
              //   image: getIcon(this.state.nodes[i].type, this.state.nodes[i].status, 'INACTIVE')
              // });
            }
          }

          $('#actions').html('');
          $('#actions').append(this.getContextMenu(contextMenuType, network, nodeID, nodeType, nodeAt));
          document.getElementById('refreshData').style.marginLeft = '660px';

          let statesJSON = {
            'loadAgain': false,
            'selectedNodeDetails': selectedNodeDetails,
            style: {
              'networkGraph': {
                'height': '600px',
                'width': '100%'
              },
              'contextualMenu': {
                width: '300px',
                // height: '520px',
                backgroundColor: '#898E9B',
                position: 'absolute',
                // left: '830px'
                top: '0px',
                right: '0px'
              }
            }
          };
          this.setState(statesJSON);
        }
      }
    };
  }

  getContextMenu(contextMenuType, network, nodeID, nodeType, nodeAt) {
    return (event) => {
      let actions = document.getElementById('tempActions');
      actions.innerHTML = '';
      let table = document.createElement('table');
      table.border = '0';
      table.width = '250';
      table.cellPadding = '10';
      table.cellSpacing = '10';

      let actionsData = this.state.actionsData;

      for (let i = 0; i < actionsData.length; i++) {
        if ((actionsData[i].nodeType).toLowerCase() === nodeType.toLowerCase()) {
          for (let j = 0; j < actionsData[i].actions.length; j++) {
            let parameters = actionsData[i].actions[j].parameters,
              parametersToApi = [],
              userInputParameters = [];
            if (parameters.length !== undefined) {
              for (let k = 0; k < parameters.length; k++) {
                let tempObj = {};
                if (parameters[k].userInput === false) {
                  tempObj.name = parameters[k].name;
                  if (parameters[k].value !== undefined) {
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
                    else if (parameters[k].name === 'ip' && nodeType.toLowerCase() === 'ip') {
                      tempObj.value = nodeID;
                    }
                    else if (parameters[k].name === 'sourceip') {
                      if (edgeObjects[nodeID] !== undefined) {
                        tempObj.value = edgeObjects[nodeID].from;
                      }
                      else {
                        tempObj.value = '';
                      }
                    }
                    else if (parameters[k].name === 'source.id') {
                      if (edgeObjects[nodeID] !== undefined) {
                        tempObj.value = edgeObjects[nodeID].from;
                      }
                      else {
                        tempObj.value = '';
                      }
                    }
                    else if (parameters[k].name === 'destination.id') {
                      if (edgeObjects[nodeID] !== undefined) {
                        tempObj.value = edgeObjects[nodeID].to;
                      }
                      else {
                        tempObj.value = '';
                      }
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
              }

              userInputParameters = checkForUserInputs(parameters);
            }
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            td1.appendChild(document.createTextNode(actionsData[i].actions[j].label));
            td1.id = 'action' + j;
            td1.onclick = this.extendGraph(contextMenuType, network, nodeID, nodeType,
              actionsData[i].actions[j].reportId, parametersToApi,
              actionsData[i].actions.length, 'action' + j);
            tr.appendChild(td1);

            if (userInputParameters.length > 0) {
              let td2 = document.createElement('td');
              let downArrow = document.createElement('img');
              downArrow.src = 'img/downarrow.png';
              // td1.onclick = this.displayUserInputParameter(userInputParameters[p].name + j);
              td2.appendChild(downArrow);
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
                // let newLine = document.createElement('br');
                // tdUserInput.appendChild(newLine);
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

  extendGraph(contextMenuType, network, nodeID, nodeType, reportId, parameters, actionsCount, actionId) {
    const that = this;
    return (event) => {
      this.setState({
        isFetching: true
      });
      let selectedNodesForExtendingGraph = that.state.selectedNodesForExtendingGraph;
      for (let i = 0; i < selectedNodesForExtendingGraph.length; i++) {
        if (selectedNodesForExtendingGraph[i].nodeID === nodeID &&
          selectedNodesForExtendingGraph[i].reportId === reportId) {
          alert('You have already performed this action.');
          that.setState({
            isFetching: false
          });
          return;
        }
      }

      const extendedNodes = fetchExtendedNodes(reportId, this.state.duration, parameters);
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

          if (json[0] === undefined) {
            that.setState({
              isFetching: false
            });
            return;
          }

          let nodesEdges = getNodesEdges(json[0]);

          for (let i = 0; i < nodesEdges.nodes.length; i++) {
            if (isNodeOrEdgeAlreadyExists(nodes, nodesEdges.nodes[i].id) === false) {
              nodes.push(nodesEdges.nodes[i]);
              nodeObjects[nodesEdges.nodes[i].id] = nodesEdges.nodes[i];
            }
          }

          for (let i = 0; i < nodesEdges.edges.length; i++) {
            if (isNodeOrEdgeAlreadyExists(edges, nodesEdges.edges[i].id) === false) {
              edges.push(nodesEdges.edges[i]);
              edgeObjects[nodesEdges.edges[i].to] = nodesEdges.edges[i];
              edgeObjects[nodesEdges.edges[i].id] = nodesEdges.edges[i];
            }
          }

          selectedNodesForExtendingGraph.push({
            'nodeID': nodeID,
            'reportId': reportId
          });

          network.setData({nodes: nodes, edges: edges});

          that.setState({
            'loadAgain': false,
            'nodesListStatus': 'extended',
            'nodes': nodes,
            'edges': edges,
            'selectedNodesForExtendingGraph': selectedNodesForExtendingGraph,
            isFetching: false
          });

          if (contextMenuType === 'node') {
            let node = network.body.nodes[nodeID];
            if (nodeObjects[nodeID] !== undefined) {
              node.setOptions({
                image: getIcon(nodeObjects[nodeID].type, nodeObjects[nodeID].status, 'SELECTED')
              });
            }
          }

          if (contextMenuType === 'edge') {
            // let node = network.body.nodes[nodeID];
            // if (nodeObjects[nodeID] !== undefined) {
            //   node.setOptions({
            //     image: getIcon(nodeObjects[nodeID].type, nodeObjects[nodeID].status, 'SELECTED')
            //   });
            // }
          }
        }
      );

      for (let j = 0; j < actionsCount; j++) {
        let tempId = 'action' + j;

        if (tempId === actionId) {
          document.getElementById(tempId).style.color = Colors.turquoise;
        }
        else {
          document.getElementById(tempId).style.color = Colors.white;
        }
      }
    };
  }

  render() {
    const {props} = this;

    return (
      <div style={{display: 'flex'}}>
        {this.state.isFetching ? <Loader style={style.loaderStyle} /> : null}
        <div ref={(ref) => this.networkGraph = ref} style={{...this.state.style.networkGraph,
          ...{
            // backgroundColor: Colors.networkGraphBGColor
          }}}
          id='networkGraph'>
          {this.loadNetworkGraph(props.data, this.state.loadAgain)}
        </div>
        <div ref={(ref) => this.contextualMenu = ref}
          style={{...this.state.style.contextualMenu}} id='contextualMenu'>
          <input type='text' id='searchNetworkNode'
            style={{...style.searchTextBox}}
            placeholder='Search' /><br />
          <div style={{
            height: '645px',
            overflowX: 'none',
            overflowY: 'scroll'
          }} className='contextMenu'>
            <div
              style={{...style.selectedNodeDetails}}
              dangerouslySetInnerHTML={{__html: this.state.selectedNodeDetails}}>
            </div>
            <div id='actions'></div>
            {/* dangerouslySetInnerHTML={{__html: this.state.actions}}*/}
            <div id='tempActions' style={{display: 'none'}}></div>
          </div>
        </div>
        <div style={{
          bottom: '20px',
          fontSize: '12px',
          left: '35px',
          position: 'absolute',
          backgroundColor: Colors.white
        }}>{ /* {this.state.zoomScale}*/}</div>
      </div>
    );
  }
}

NetworkGraph.contextTypes = {
  store: React.PropTypes.object
};

export default NetworkGraph;
