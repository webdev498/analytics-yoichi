import React from 'react';
import {Colors} from 'theme/colors';
import $ from 'jquery';
import {
  firstCharCapitalize
} from 'utils/utils';
import Cookies from 'cookies-js';
import {baseUrl} from 'config';

const style = {
  networkGraph: {
    'height': '600px',
    'width': '100%'
  },
  'contextualMenu': {
    width: '280px',
    height: '600px',
    backgroundColor: '#898E9B'
  },
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
  }
};

let paddingSpace1 = '\n           ',
  paddingSpace2 = '           ',
  x = 0,
  y = 0,
  contextMenu = undefined,
  contextMenuOptions = ['First Option', 'Second Option', 'Third Option'],
  xArray = [0, 350, 350, 350, 350, 80, -40, 80, 10, -60],
  yArray = [0, -100, 20, 175, 280, 180, 180, 290, 290, 290];

function getNodesEdges(data) {
  let nodes = [],
    edges = [],
    dataNodes = data.nodes,
    dataEdges = data.edges;

  for (let i = 0; i < dataNodes.length; i++) {
    let dataNode = dataNodes[i],
      nodeObject = {};

    nodeObject.id = dataNode.id;
    nodeObject.type = dataNode.type;
    // nodeObject.level = i + 1;
    nodeObject.label = '\n  <b>' + firstCharCapitalize(dataNode.type) + ':</b> ' + dataNode.id;
    nodeObject.title = '<b>' + firstCharCapitalize(dataNode.type) + ':</b> ' + dataNode.id;
    nodeObject.nodeDetails = firstCharCapitalize(dataNode.type) + ': ' + dataNode.id;
    for (let metadataType in dataNode.metadata) {
      nodeObject.label += '\n  <b>' + firstCharCapitalize(metadataType) + ':</b> ' + dataNode.metadata[metadataType];
      nodeObject.title += '<br /><b>' + firstCharCapitalize(metadataType) + ':</b> ' + dataNode.metadata[metadataType];
      nodeObject.nodeDetails += ' ' + firstCharCapitalize(metadataType) + ': ' + dataNode.metadata[metadataType];
    }
    nodeObject.borderWidth = '0';
    nodeObject.font = {
      'face': 'Open Sans',
      'color': Colors.pebble,
      'size': '11',
      'align': 'left'
    };
    nodeObject.shape = 'image';
    nodeObject.color = '#F2F2F4';
    nodeObject.image = getIcon(dataNode.type);
    nodeObject.orgImage = getIcon(dataNode.type);
    let actions = [];
    if (dataNode.actions !== null && dataNode.actions !== undefined) {
      actions = dataNode.actions;
    }
    nodeObject.actions = actions;

    if (xArray[i] !== null && xArray[i] !== undefined) {
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
    }

    nodes.push(nodeObject);
  }

  for (let i = 0; i < dataEdges.length; i++) {
    let dataEdge = dataEdges[i],
      edgeObject = {};

    edgeObject.from = dataEdge.source;
    edgeObject.to = dataEdge.target;
    edgeObject.arrows = {
      'to': {
        'scaleFactor': 0.5
      },
      'arrowStrikethrough': false
    };
    edgeObject.label = dataEdge.label + '\n\n\n';
    edgeObject.font = {
      'face': 'Open Sans',
      'color': Colors.pebble,
      'size': '11',
      'align': 'left'
    };
    edgeObject.length = 300;
    edgeObject.smooth = {
      type: 'discrete'
    };
    edgeObject.color = Colors.pebble;

    edges.push(edgeObject);
  }

  return {
    'nodes': nodes,
    'edges': edges
  };
}

function getIcon(nodeType) {
  let iconPath = 'img/asset.png';
  nodeType = nodeType.toLowerCase();
  switch (nodeType) {
    case 'ip':
      iconPath = 'img/asset.png';
      break;
    case 'machine':
      iconPath = 'img/asset.png';
      break;
    case 'http':
      iconPath = 'img/http.png';
      break;
    case 'user':
      iconPath = 'img/user.png';
      break;
    case 'app':
      iconPath = 'img/app_orange.png';
      break;
    case 'domain':
      iconPath = 'img/http.png';
      break;
    default:
      break;
  }
  return iconPath;
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
  const accessToken = Cookies.get('access_token'),
    tokenType = Cookies.get('token_type'),
    apiUrl = baseUrl + '/api/analytics/reporting/execute/' + reportId + '?window=' + duration,
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
    return Promise.reject(Error(error.message));
  });
}

class NetworkGraph extends React.Component {
  constructor(props) {
    super(props);
    const {duration} = this.props;
    this.state = {
      nodes: [],
      edges: [],
      style: {
        'networkGraph': {
        },
        'contextualMenu': {
          display: 'none'
        }
      },
      selectedNodeDetails: '',
      loadAgain: true,
      nodesListStatus: 'default',
      actionsData: [],
      actions: '',
      duration: duration,
      selectedNodesForExtendingGraph: []
    };

    this.loadNetworkGraph = this.loadNetworkGraph.bind(this);
    this.getContextMenu = this.getContextMenu.bind(this);
    this.loadContextMenu = this.loadContextMenu.bind(this);
    this.extendGraph = this.extendGraph.bind(this);
    this.isNodeAlreadyExists = this.isNodeAlreadyExists.bind(this);
    // this.selectNode = this.selectNode.bind(this);
    // this.deselectNode = this.deselectNode.bind(this);
  }

  isNodeAlreadyExists(nodeID) {
    return (event) => {
      let nodes = this.state.nodes;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeID === nodeID) {
          return true;
        }
      }
      return false;
    };
  }

  extendGraph(nodeID, nodeType, reportId, parameters) {
    const that = this;
    // console.log(JSON.stringify(nodeAt));
    return (event) => {
      let selectedNodesForExtendingGraph = that.state.selectedNodesForExtendingGraph;
      for (let i = 0; i < selectedNodesForExtendingGraph.length; i++) {
        if (selectedNodesForExtendingGraph[i].id === nodeID) {
          return;
        }
      }
      console.log('selectedNodesForExtendingGraph', selectedNodesForExtendingGraph);
      // return;

      const extendedNodes = fetchExtendedNodes(reportId, this.state.duration, parameters);
      let rows = extendedNodes;
      if (!extendedNodes) {
        return;
      }
      extendedNodes.then(
        function(json) {
          rows = json.rows;
          let nodes = that.state.nodes,
            edges = that.state.edges;

          for (let i = 0; i < rows.length; i++) {
            // if (that.isNodeAlreadyExists(rows[i][0]) === false) {
              let nodeObject = {
                  id: rows[i][0],
                  type: nodeType,
                  label: '\n  <b>' + nodeType + ':</b> ' + rows[i][0],
                  title: '<b>' + nodeType + ':</b> ' + rows[i][0],
                  nodeDetails: nodeType + ': ' + rows[i][0],
                  borderWidth: '0',
                  'font': {
                    'face': 'Open Sans',
                    'color': Colors.pebble,
                    'size': '11',
                    'align': 'left'
                  },
                  shape: 'image',
                  color: '#F2F2F4',
                  image: getIcon(nodeType),
                  orgImage: getIcon(nodeType),
                  x: 550,
                  y: -100
                },
                edgeObject = {
                  from: nodeID,
                  to: rows[i][0],
                  arrows: {to: {scaleFactor: 0.5}, arrowStrikethrough: false},
                  label: '',
                  'font': {
                    'face': 'Open Sans',
                    'color': Colors.pebble,
                    'size': '11',
                    'align': 'left'
                  },
                  length: 300,
                  smooth: {
                    type: 'discrete'
                  },
                  'color': Colors.pebble
                };

              nodes.push(nodeObject);
              edges.push(edgeObject);
            }
          // }

          selectedNodesForExtendingGraph.push({
            'nodeID': nodeID,
            'reportId': reportId
          });

          that.setState({
            'loadAgain': true,
            'nodesListStatus': 'extended',
            'nodes': nodes,
            'edges': edges,
            'networkGraph': {
              width: '100%'
            },
            'contextualMenu': {
              display: 'done'
            },
            selectedNodesForExtendingGraph: selectedNodesForExtendingGraph
          });
        }
      );
    };
  }

  getContextMenu(nodeID, nodeType, nodeAt) {
    return (event) => {
      // Create the list element:
      let actions = document.getElementById('tempActions');
      actions.innerHTML = '';
      let list = document.createElement('ul');
      // list.setAttribute('id', 'actionList');

      let actionsData = this.state.actionsData;

      console.log(nodeType);
      // let actionsHtml = '<ul>';

      for (let i = 0; i < actionsData.length; i++) {
        if ((actionsData[i].nodeType).toLowerCase() === nodeType.toLowerCase()) {
          for (let j = 0; j < actionsData[i].actions.length; j++) {
            // actionsHtml += "<li onclick=\"this.extendGraph('" + actionsData[i].actions[j].reportId + "')\">" +
            //   actionsData[i].actions[j].label + '</li>';
            let item = document.createElement('li');
            let parameters = actionsData[i].actions[j].parameters;
            // list.setAttribute('onclick', this.extendGraph(actionsData[i].actions[j].reportId));
            item.onclick = this.extendGraph(nodeID, nodeType, actionsData[i].actions[j].reportId, parameters);
            item.appendChild(document.createTextNode(actionsData[i].actions[j].label));
            list.appendChild(item);
            // (function(value) {
            //   item.addEventListener('click', function() {
            //     alert('test');
            //   }, false); })(data[i]);
          }
        }
      }

      // actionsHtml += '</ul>';

      // actions.appendChild(list);
      // list.appendChild(actions.cloneNode(true));

      // Finally, return the constructed list:
      let listHTML = {
        'loadAgain': false,
        'actions': '<ul>' + list.innerHTML + '</ul>'
        // 'actions': actionsHtml
      };
      this.setState(listHTML);

      return list;
    };
  }

  loadContextMenu(network) {
    return (event) => {
      let actions = document.getElementById('tempActions');
      actions.innerHTML = '';
      let listHTML = {
        'loadAgain': false,
        'actions': ''
      };
      this.setState(listHTML);

      if (network.getSelection().nodes.length > 0) {
        let SelectedNodeIDs = network.getSelection(),
          selectedNodeIndex = 0,
          selectedNodeDetails = '',
          nodeType = '';
        let nodeAt = network.getBoundingBox(SelectedNodeIDs.nodes[0]);

        if (SelectedNodeIDs.nodes[0] !== undefined) {
          for (let i = 0; i < this.state.nodes.length; i++) {
            if (this.state.nodes[i].id === SelectedNodeIDs.nodes[0]) {
              console.log('Selected Node Id:', this.state.nodes[i]);
              selectedNodeDetails += this.state.nodes[i].nodeDetails;
              console.log('test: ', this.state.nodes[i].type);
              nodeType = this.state.nodes[i].type;
              // if (this.state.nodes[i].actions !== undefined) {
              //   contextMenuOptions = this.state.nodes[i].actions;
              //   selectedNodeIndex = i;
              //   break;
              // }
              break;
            }
          }

          // $('#tempActions').append(this.getContextMenu(SelectedNodeIDs.nodes[0], nodeType));
          $('#actions').html('');
          $('#actions').append(this.getContextMenu(SelectedNodeIDs.nodes[0], nodeType, nodeAt));

          let statesJSON = {
            'loadAgain': false,
            'selectedNodeDetails': selectedNodeDetails,
            style: {
              'networkGraph': {
                width: '80%'
              },
              'contextualMenu': {
              }
            }
          };
          this.setState(statesJSON);
        }
      }
    };
  }

  /*selectNode(network) {
    return (event) => {
      let SelectedNodeIDs = network.getSelection();
      console.log(SelectedNodeIDs.nodes[0]);
      if (SelectedNodeIDs.nodes[0] !== undefined) {
        for (let i = 0; i < this.state.nodes.length; i++) {
          if (this.state.nodes[i].id === SelectedNodeIDs.nodes[0]) {
            this.state.nodes[i].image = (this.state.nodes[i].orgImage).replace('.png', '_select.png');
          }
          else {
            this.state.nodes[i].image = this.state.nodes[i].orgImage;
          }
        }
        this.loadNetworkGraph();
      }
      console.log(JSON.stringify(this.state.nodes));
    };
  }*/

  deselectNode(network) {
    return (event) => {
      this.setState({
        'loadAgain': false,
        networkGraph: {
          width: '100%'
        },
        contextualMenu: {
          display: 'done'
        },
        selectedNodeDetails: ''
      });
      console.log('test deselect node');
      // let SelectedNodeIDs = network.getSelection();
      // console.log(SelectedNodeIDs.nodes[0]);
      // if (SelectedNodeIDs.nodes[0] !== undefined) {
      //   for (let i = 0; i < this.state.nodes.length; i++) {
      //     if (this.state.nodes[i].id === SelectedNodeIDs.nodes[0]) {
      //       this.state.nodes[i].image = 'img/asset.png';
      //     }
      //   }
      // }
    };
  }

  loadNetworkGraph(data, loadAgain) {
    if (!loadAgain) {
      return;
    }

    if (!data) {
      return;
    }

    console.log('loadNetworkGraph', data);
    if (this.state.nodesListStatus === 'default') {
      let nodesEdges = getNodesEdges(data[0]);
      this.state.nodes = nodesEdges.nodes;
      this.state.edges = nodesEdges.edges;
      const actionsData = this.context.store.getState().actions;
      // this.state.actionsData = getActionsByTypes(this.context.store.getState().actions);
      this.state.actionsData = getActionsByTypes(actionsData.list.actions);
    }

    // console.log(JSON.stringify(data.actions));

    if (this.networkGraph !== null && this.networkGraph !== undefined) {
      let options = {
        physics: false,
        interaction: {
          navigationButtons: true,
          keyboard: false,
          multiselect: true
        },
        autoResize: true,
        height: '600',
        width: '100%'
      };

      // create a network
      let data = {
        nodes: this.state.nodes,
        edges: this.state.edges
      };

      // console.log(JSON.stringify(data));

      // if (data.nodes.length > 0) {
        let network = new vis.Network(this.networkGraph, data, options),
          networkGraphContainer = document.getElementById('networkGraph');
        // getContextMenuFunction = this.getContextMenu;
        // network.on('selectNode', this.selectNode(network));
        network.on('deselectNode', this.deselectNode(network));

        /* Following code is for left click context menu */
        network.on('select', this.loadContextMenu(network));
      // }
    }
  }

  render() {
    const {props} = this;

    console.log('render');

    return (
      <div style={{display: 'flex'}}>
        <div ref={(ref) => this.networkGraph = ref} style={{...style.networkGraph, ...this.state.style.networkGraph}}
          id='networkGraph'>
          {this.loadNetworkGraph(props.data, this.state.loadAgain)}
        </div>
        <div ref={(ref) => this.contextualMenu = ref}
          style={{...style.contextualMenu, ...this.state.style.contextualMenu}}
          id='contextualMenu' className='contextMenu'>
          <input type='text' id='searchNetworkNode'
            style={{...style.searchTextBox}}
            placeholder='Search' /><br />
          <div
            style={{...style.selectedNodeDetails}}
            dangerouslySetInnerHTML={{__html: this.state.selectedNodeDetails}}>
          </div>
          <div id='actions' className='contextMenu'></div>
          {/* dangerouslySetInnerHTML={{__html: this.state.actions}}*/}
          <div id='tempActions' style={{display: 'none'}}></div>
        </div>
      </div>
    );
  }
}

NetworkGraph.contextTypes = {
  store: React.PropTypes.object
};

export default NetworkGraph;
