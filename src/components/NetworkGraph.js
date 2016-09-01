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

let data = {
  "graphs": [
    {
      "type": "alert",
      "label": "SSH Brute Force",
      "metadata": {
        "key": "value"
      },
      "nodes": [
        {
          "id": "10.0.0.1",
          "type": "IP",
          "metadata": {
            "OS": "Windows 8.1",
            "Name": "John Smith"
          },
          "actions" : [ "outgoing connections", "incoming connections", "users logged in"]
        },
        {
          "id": "10.0.0.2",
          "type": "IP",
          "metadata": {
            "OS": "Ubuntu 14",
            "Name": "dbserver01"
          }
        },
        {
          "id": "119.163.120.20",
          "type": "IP",
          "metadata": {
            "Country": "China",
            "Owner": "China169Backbone"
          }
        },
        {
          "id": "xyzwebsite.com",
          "type": "domain",
          "metadata": {
            "Country": "China"
          }
        },
        {
          "id": "abcwebsite.com",
          "type": "domain"
        },
        {
          "id": "ttaylor",
          "type": "user",
          "label": "Tom Taylor",
          "metadata": {
            "Title": "VP of finance"
          }
        },
        {
          "id": "app3.exe",
          "type": "app"
        }
      ],
      "edges": [
        {
          "source": "10.0.0.1",
          "relation": "ssh",
          "target": "10.0.0.2",
          "directed": true,
          "label": "lateral movement"
        },
        {
          "source": "119.163.120.202",
          "relation": "ssh",
          "target": "10.0.0.1",
          "directed": true,
          "label": "breach",
          "metadata": {
            "Date": "2016-08-15T12:01:02.123"
          }
        },
        {
          "source": "10.0.0.1",
          "relation": "http",
          "target": "xyzwebsite.com",
          "directed": true,
          "label": "data upload"
        },
        {
          "source": "10.0.0.1",
          "relation": "http",
          "target": "abcwebsite.com",
          "directed": true,
          "label": "data upload"
        },
        {
          "source": "ttaylor",
          "target": "10.0.0.1",
          "directed": true,
          "label": "login"
        },
        {
          "source": "ttaylor",
          "target": "app3",
          "directed": true,
          "label": "execute"
        }
      ]
    }
  ]
};

/*let actionsData = {
  "actions": [
    {
      "name": "taf_machines_by_user",
      "types": [
        "user"
      ],
      "group": "explore",
      "targetType": "machine",
      "edgeType": "logged_in",
      "reversed": false,
      "label": "All machines this user has logged into",
      "parameters": [
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_sudo_by_user",
      "types": [
        "user"
      ],
      "group": "explore",
      "targetType": "user",
      "edgeType": "sudo",
      "reversed": false,
      "label": "All users this user has \"sudo\" into",
      "parameters": [
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_process_by_machine",
      "types": [
        "machine"
      ],
      "group": "explore",
      "targetType": "process",
      "edgeType": "process_start",
      "reversed": false,
      "label": "All processes launched by this user",
      "parameters": [
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_process_by_user",
      "types": [
        "logged_in"
      ],
      "group": "explore",
      "targetType": "process",
      "edgeType": "process_start",
      "reversed": false,
      "label": "All processes launched by this user",
      "parameters": [
        {
          "name": "destination.id",
          "userInput": false
        },
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        },
        {
          "name": "source.id",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_outgoing_machines_internal",
      "types": [
        "machine"
      ],
      "group": "explore",
      "targetType": "machine",
      "edgeType": "connect",
      "reversed": false,
      "label": "All internal outgoing connections made by this machine",
      "parameters": [
        {
          "name": "bandwidth",
          "userInput": true,
          "label": "Bandwidth"
        },
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_incoming_machines_internal",
      "types": [
        "machine"
      ],
      "group": "explore",
      "targetType": "machine",
      "edgeType": "connect",
      "reversed": true,
      "label": "All internal incoming connections received by this machine",
      "parameters": [
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_users_by_machine",
      "types": [
        "machine"
      ],
      "group": "explore",
      "targetType": "user",
      "edgeType": "logged_in",
      "reversed": true,
      "label": "All users logged onto this machine",
      "parameters": [
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_outgoing_machines_external",
      "types": [
        "machine",
        "ip"
      ],
      "group": "explore",
      "targetType": "domain",
      "edgeType": "connect",
      "reversed": false,
      "label": "All external outgoing connections made by this machine",
      "parameters": [
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_incoming_machines_external",
      "types": [
        "machine"
      ],
      "group": "explore",
      "targetType": "domain",
      "edgeType": "connect",
      "reversed": true,
      "label": "All external incoming connections received by this machine",
      "parameters": [
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_domains_with_same_ip",
      "types": [
        "ip"
      ],
      "group": "explore",
      "targetType": "domain",
      "edgeType": "same_ip",
      "reversed": false,
      "label": "All domains using the same IP",
      "parameters": [
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_ips_with_same_asn",
      "types": [
        "ip",
        "domain"
      ],
      "group": "explore",
      "targetType": "ip",
      "edgeType": "same_asn",
      "reversed": false,
      "label": "All IPs with the same ASN",
      "parameters": [
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    },
    {
      "name": "taf_ips_with_same_domain",
      "types": [
        "domain"
      ],
      "group": "explore",
      "targetType": "ip",
      "edgeType": "same_domain",
      "reversed": false,
      "label": "All IPs resolving to the same domain",
      "parameters": [
        {
          "name": "id",
          "userInput": false
        },
        {
          "name": "type",
          "userInput": false
        }
      ]
    }
  ],
  "groups": {
    "explore": "Explore"
  }
};*/

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

function fetchExtendedNodes(reportId, duration) {
  const accessToken = Cookies.get('access_token'),
    tokenType = Cookies.get('token_type'),
    apiUrl = baseUrl + '/api/analytics/reporting/execute/' + reportId + '?window=' + duration,
    customHeaders = {
      'Accept': 'application/json'
    },
    defaultHeaders = Object.assign({
      'Authorization': `${tokenType} ${accessToken}`
    }, customHeaders);

  /*return fetch(apiUrl, {
    method: 'GET',
    headers: defaultHeaders
  })
  .then(function(response) {
    return response.json();
  })
  .catch((ex) => {
    return null;
  });*/

  return fetch(apiUrl, { // let fetchApiData =
    method: 'GET',
    headers: defaultHeaders
  })
  .then(response => response.json()
    // .then(function(json) {
    //   return json.rows;
    // })
  )

  // .then(function(response) {
  //   response.json().then(
  //     function(json) {
  //       return json;
  //     }
  //   );
  // })

  // .then(function(response) {
  //   return response.json().then(function(json) {
  //     Promise.resolve(json).then(function(value) {
  //       return value;
  //     }, function(value) {
  //       // not called
  //     });
  //     // json => json.rows
  //     // {
  //     //   return response.ok ? json.rows : Promise.reject(json);
  //     // }
  //   });
  // })
  .catch(error => {
    return Promise.reject(Error(error.message));
  });

  // fetchApiData.then(
  //   function(json) {
  //     return json.rows;
  //   }
  // );
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
      duration: duration
    };

    /*this.state.nodes = [
      {
        id: 1,
        level: 1,
        label: '\n  <b>IP:</b> 10.0.0.1\n  <b>OS:</b> WS-FIN-277111\n  <b>Name:</b> John Smith\'s PC  ',
        title: '<b>IP:</b> 10.0.0.1<br /><b>OS:</b> WS-FIN-277111<br /><b>Name:</b> John Smith\'s PC  ',
        borderWidth: '0',
        'font': {
          'face': 'Open Sans',
          'color': Colors.pebble,
          'size': '11',
          'align': 'left'
        },
        shape: 'image',
        color: '#F2F2F4',
        image: 'img/asset.png',
        orgImage: 'img/asset.png',
        actions: ['Outgoing Connections', 'Incoming Connections', 'Outgoing Connections', 'Users Logged in'],
        // fixed: true,
        x: 0,
        y: 0
      },
      {
        id: 2,
        level: 2,
        label: paddingSpace2 + '<b>IP:</b> 10.0.0.2' + paddingSpace1 + '<b>Type:</b> ssh' + paddingSpace1 +
          '<b>OS:</b> WS-FIN-277444' + paddingSpace1 + '<b>Name:</b> Roger Lok’s PC',
        'font': {
          'face': 'Open Sans',
          'color': Colors.pebble,
          'size': '11',
          'align': 'left'
        },
        borderWidth: '0',
        shape: 'image',
        color: '#F2F2F4',
        image: 'img/asset.png',
        orgImage: 'img/asset.png',
        actions: ['Outgoing Connections1', 'Incoming Connections2', 'Outgoing Connections3', 'Users Logged in4'],
        x: 350,
        y: -100
      },
      {
        id: 3,
        level: 3,
        label: paddingSpace2 + '<b>IP:</b> 119.163.120.202' + paddingSpace1 + '<b>Type:</b> ssh' + paddingSpace1 +
          '<b>Country:</b> China' + paddingSpace1 + '<b>OS:</b> WS-FIN-277333' + paddingSpace1 +
          '<b>Owner:</b> China169Backbone',
        'font': {
          'face': 'Open Sans',
          'color': Colors.pebble,
          'size': '11',
          'align': 'left'
        },
        borderWidth: '0',
        shape: 'image',
        color: '#F2F2F4',
        image: 'img/asset.png',
        orgImage: 'img/asset.png',
        x: 350,
        y: 20
      },
      {
        id: 4,
        level: 4,
        label: paddingSpace2 + 'xyzwebsite.com' + paddingSpace1 + '<b>Country:</b> China',
        'font': {
          'face': 'Open Sans',
          'color': Colors.pebble,
          'size': '11',
          'align': 'left'
        },
        borderWidth: '0',
        shape: 'image',
        color: '#F2F2F4',
        image: 'img/http.png',
        orgImage: 'img/http.png',
        width: '30',
        height: '30',
        x: 350,
        y: 175
      },
      {
        id: 5,
        level: 5,
        label: paddingSpace2 + 'abcwebsite.com',
        'font': {
          'face': 'Open Sans',
          'color': Colors.pebble,
          'size': '11',
          'align': 'left'
        },
        borderWidth: '0',
        shape: 'image',
        color: '#F2F2F4',
        image: 'img/http.png',
        orgImage: 'img/http.png',
        width: '30',
        height: '30',
        x: 350,
        y: 280
      },
      {
        id: 6,
        level: 6,
        label: paddingSpace2 + '<b>User 2:</b> Tom Taylor',
        'font': {
          'face': 'Open Sans',
          'color': Colors.pebble,
          'size': '11',
          'align': 'left'
        },
        borderWidth: '0',
        shape: 'image',
        color: '#F2F2F4',
        image: 'img/user.png',
        orgImage: 'img/user.png',
        x: 80,
        y: 180
      },
      {
        id: 7,
        level: 7,
        label: paddingSpace2 + '<b>User 1:</b> John Smith',
        'font': {
          'face': 'Open Sans',
          'color': Colors.pebble,
          'size': '11',
          'align': 'left'
        },
        borderWidth: '0',
        shape: 'image',
        color: '#F2F2F4',
        image: 'img/user.png',
        orgImage: 'img/user.png',
        x: -40,
        y: 180
      },
      {
        id: 8,
        level: 8,
        label: 'App3.exe',
        'font': {
          'face': 'Open Sans',
          'color': Colors.pebble,
          'size': '11',
          'align': 'left'
        },
        borderWidth: '0',
        shape: 'image',
        color: '#F2F2F4',
        image: 'img/app_orange.png',
        orgImage: 'img/app_orange.png',
        x: 80,
        y: 290
      },
      {
        id: 9,
        level: 9,
        label: 'App2.exe',
        'font': {
          'face': 'Open Sans',
          'color': Colors.pebble,
          'size': '11',
          'align': 'left'
        },
        borderWidth: '0',
        shape: 'image',
        color: '#F2F2F4',
        image: 'img/app_yellow.png',
        orgImage: 'img/app_yellow.png',
        x: 10,
        y: 290
      },
      {
        id: 10,
        level: 10,
        label: 'App2.exe',
        'font': {
          'face': 'Open Sans',
          'color': Colors.pebble,
          'size': '11',
          'align': 'left'
        },
        borderWidth: '0',
        shape: 'image',
        color: '#F2F2F4',
        image: 'img/app_green.png',
        orgImage: 'img/app_green.png',
        x: -60,
        y: 290
      }
    ];
    this.state.edges = [
      {
        from: 1,
        to: 2,
        arrows: {middle: {scaleFactor: 0.5}, arrowStrikethrough: false},
        label: 'Lateral Movement\n\n\n',
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
      },
      {
        from: 3,
        to: 1,
        arrows: {to: {scaleFactor: 0.5}, arrowStrikethrough: false},
        label: 'Breach\n\n\n',
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
      },
      {
        from: 1,
        to: 4,
        arrows: {to: {scaleFactor: 0.5}, arrowStrikethrough: false},
        label: 'Data upload\n\n\n',
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
      },
      {
        from: 1,
        to: 5,
        arrows: {to: {scaleFactor: 0.5}, arrowStrikethrough: false},
        label: 'Data upload\n\n\n',
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
      },
      {
        from: 6,
        to: 1,
        arrows: {to: {scaleFactor: 0.5}, arrowStrikethrough: false},
        label: 'Login\n\n\n',
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
      },
      {
        from: 8,
        to: 6,
        arrows: {middle: {scaleFactor: 0.5}, arrowStrikethrough: false},
        label: 'Execute\n\n\n',
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
      }
    ];*/

    this.loadNetworkGraph = this.loadNetworkGraph.bind(this);
    this.getContextMenu = this.getContextMenu.bind(this);
    this.loadContextMenu = this.loadContextMenu.bind(this);
    this.extendGraph = this.extendGraph.bind(this);
    // this.selectNode = this.selectNode.bind(this);
    // this.deselectNode = this.deselectNode.bind(this);
  }

  // componentDidMount() {
  //   this.setState({map: map});
  //   window.map = this;
  // }

  extendGraph(nodeID, nodeType, reportId) {
    const that = this;
    // console.log(JSON.stringify(nodeAt));
    return (event) => {
      const extendedNodes = fetchExtendedNodes(reportId, this.state.duration);
      let rows = extendedNodes;
      if (!extendedNodes) {
        return;
      }
      extendedNodes.then(
        function(json) {
          rows = json.rows;
          for (let i = 0; i < rows.length; i++) {
            let nodes = that.state.nodes,
              edges = that.state.edges,
              nodeObject = {
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

            that.setState({
              'loadAgain': true,
              'nodesListStatus': 'extended',
              'nodes': nodes,
              'edges': edges
            });
          }
        }
      );

      // console.log(extendedNodes.then(
      //   function(json) {
      //     return json.rows;
      //   }
      //   ));

      // console.log(extendedNodes['[[PromiseValue]]']);
      /*this.state.nodes.push(
        {
          id: nodeID,
          level: nodeID,
          label: '\n  <b>IP:</b> 192.168.2.21\n  <b>OS:</b> Win 2008\n  <b>Name:</b> Peter Patter\'s PC  ',
          title: '<b>IP:</b> 192.168.2.21<br /><b>OS:</b> Win 2008<br /><b>Name:</b> Peter Patter\'s PC  ',
          borderWidth: '0',
          'font': {
            'face': 'Open Sans',
            'color': Colors.pebble,
            'size': '11',
            'align': 'left'
          },
          shape: 'image',
          color: '#F2F2F4',
          image: 'img/asset.png',
          orgImage: 'img/asset.png',
          actions: ['Outgoing Connections', 'Incoming Connections', 'Outgoing Connections', 'Users Logged in'],
          // fixed: true,
          x: 550,
          y: -100
        }
      );
      this.state.edges.push(
        {
          from: 2,
          to: nodeID,
          arrows: {middle: {scaleFactor: 0.5}, arrowStrikethrough: false},
          label: 'Lateral Movement\n\n\n',
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
        }
      );*/
      // this.loadNetworkGraph();
      // contextMenu = undefined;
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
            // list.setAttribute('onclick', this.extendGraph(actionsData[i].actions[j].reportId));
            item.onclick = this.extendGraph(nodeID, nodeType, actionsData[i].actions[j].reportId);
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

    console.log('loadNetworkGraph');

    if (this.state.nodesListStatus === 'default') {
      let nodesEdges = getNodesEdges(data.graphs[0]);
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
    const {props} = this,
      rawData = {
        graphs: data.graphs
      };

    console.log('render');

    return (
      <div style={{display: 'flex'}}>
        <div ref={(ref) => this.networkGraph = ref} style={{...style.networkGraph, ...this.state.style.networkGraph}}
          id='networkGraph'>
          {/*{this.loadNetworkGraph(props.data, this.state.loadAgain)}*/}
          {this.loadNetworkGraph(rawData, this.state.loadAgain)}
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
