import React from 'react';
import {Colors} from 'theme/colors';
// import vis from 'vis';

const style = {
  'height': '600px',
  'width': '100%'
};

class NetworkGraph extends React.Component {
  loadNetworkGraph() {
    if (this.networkGraph !== null && this.networkGraph !== undefined) {
      let options = {
        physics: false,
        interaction: {
          navigationButtons: true,
          keyboard: false
        },
        autoResize: true,
        height: '600',
        width: '100%'
      };

      let paddingSpace1 = '\n           ',
        paddingSpace2 = '           ';

      // create an array with nodes
      let nodes = [
        /*{
          id: 1,
          level: 1,
          label: '\n  <b>IP:</b> 10.0.0.1\n  OS: WS-FIN-277111\n  Name: John Smith\'s PC  ',
          color: '#F2F2F4',
          borderWidth: '0',
          'font': {
            'color': Colors.pebble,
            'size': '11',
            'align': 'left'
          },
          'shape': 'circle',
          x: 0,
          y: 0
        },*/
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
          x: -60,
          y: 290
        }
      ];

      // create an array with edges
      let edges = [
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
          length: 300,
          smooth: {
            type: 'discrete'
          },
          'color': Colors.pebble
        }
      ];

      /*nodes = [
        {
          id: 1,
          level: 1,
          label: paddingSpace2 + '<b>IP:</b> 10.0.0.1' + paddingSpace1 + '<b>OS:</b> Windows 8.1' + paddingSpace1 +
            '<b>Name:</b> John Smith',
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
          x: 0,
          y: 0
        },
        {
          id: 2,
          level: 2,
          label: paddingSpace2 + '<b>IP:</b> 10.0.0.2' + paddingSpace1 + '<b>OS:</b> Ubuntu 14' + paddingSpace1 +
            '<b>Name:</b> dbserver01',
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
          x: 350,
          y: -100
        },
        {
          id: 3,
          level: 3,
          label: paddingSpace2 + '<b>IP:</b> 119.163.120.20' + paddingSpace1 + '<b>Country:</b> China' +
            paddingSpace1 + '<b>Owner:</b> China169Backbone',
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
          x: 350,
          y: 330
        },
        {
          id: 6,
          level: 6,
          label: 'ttaylor',
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
          x: 80,
          y: 180
        },
        {
          id: 7,
          level: 7,
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
          x: 15,
          y: 330
        }
      ];

      edges = [
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
          arrows: {middle: {scaleFactor: 0.5}, arrowStrikethrough: false},
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
          arrows: {middle: {scaleFactor: 0.5}, arrowStrikethrough: false},
          label: 'Data Upload\n\n\n',
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
          arrows: {middle: {scaleFactor: 0.5}, arrowStrikethrough: false},
          label: 'Data Upload\n\n\n',
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
          arrows: {middle: {scaleFactor: 0.5}, arrowStrikethrough: false},
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
          from: 7,
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
        },
      ];*/

      // create a network
      let data = {
        nodes: nodes,
        edges: edges
      };

      let network = new vis.Network(this.networkGraph, data, options);
      network.on('selectNode', function(params) {
        console.log(JSON.stringify(params));
        // alert("clicked");
      });
    }
  }

  render() {
    return (
      <div>
        <div ref={(ref) => this.networkGraph = ref} style={style}></div>
        {this.loadNetworkGraph()}
      </div>
    );
  }
}

export default NetworkGraph;
