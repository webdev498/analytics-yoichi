import React from 'react';
import {Colors} from 'theme/colors';
import vis from 'vis';

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
          label: '\n  IP: 10.0.0.1\n  OS: WS-FIN-277111\n  Name: John Smith\'s PC  ',
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
          label: '\n  IP: 10.0.0.1\n  OS: WS-FIN-277111\n  Name: John Smith\'s PC  ',
          title: '<b>IP:</b> 10.0.0.1<br /><b>OS:</b> WS-FIN-277111<br /><b>Name:</b> John Smith\'s PC  ',
          color: '#F2F2F4',
          borderWidth: '0',
          'font': {
            'face': 'Open Sans',
            'color': Colors.pebble,
            'size': '11',
            'align': 'left'
          },
          'shape': 'circle',
          icon: {
            face: 'FontAwesome',
            code: '\uf108',
            size: 30,
            color: Colors.coral
          },
          // fixed: true,
          x: 0,
          y: 0
        },
        {
          id: 2,
          level: 2,
          label: '\n\n' + paddingSpace1 + 'IP: 10.0.0.2' + paddingSpace1 + 'Type: ssh' + paddingSpace1 +
            'OS: WS-FIN-277444' + paddingSpace1 + 'Name: Roger Lok’s PC',
          'font': {
            'face': 'Open Sans',
            'color': Colors.pebble,
            'size': '11',
            'align': 'left'
          },
          borderWidth: '0',
          shape: 'icon',
          color: '#F2F2F4',
          icon: {
            face: 'FontAwesome',
            code: '\uf108',
            size: 30,
            color: Colors.coral
          },
          x: 250,
          y: -100
        },
        {
          id: 3,
          level: 3,
          label: '\n\n' + paddingSpace1 + 'IP: 119.163.120.202' + paddingSpace1 + 'Type: ssh' + paddingSpace1 +
            'Country: China' + paddingSpace1 + 'OS: WS-FIN-277333' + paddingSpace1 + 'Owner: China169Backbone',
          'font': {
            'face': 'Open Sans',
            'color': Colors.pebble,
            'size': '11',
            'align': 'left'
          },
          borderWidth: '0',
          shape: 'icon',
          color: '#F2F2F4',
          icon: {
            face: 'FontAwesome',
            code: '\uf108',
            size: 30,
            color: Colors.coral
          },
          x: 350,
          y: 20
        },
        {
          id: 4,
          level: 4,
          label: paddingSpace2 + 'xyzwebsite.com' + paddingSpace1 + 'Country: China',
          'font': {
            'face': 'Open Sans',
            'color': Colors.pebble,
            'size': '11',
            'align': 'left'
          },
          borderWidth: '0',
          shape: 'image',
          color: '#F2F2F4',
          image: 'http.png',
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
          image: 'http.png',
          width: '30',
          height: '30',
          x: 350,
          y: 280
        },
        {
          id: 6,
          level: 6,
          label: paddingSpace2 + 'User 2: Tom Taylor',
          'font': {
            'face': 'Open Sans',
            'color': Colors.pebble,
            'size': '11',
            'align': 'left'
          },
          borderWidth: '0',
          shape: 'icon',
          color: '#F2F2F4',
          icon: {
            face: 'FontAwesome',
            code: '\uf007',
            size: 30,
            color: Colors.coral
          },
          x: 80,
          y: 180
        },
        {
          id: 7,
          level: 7,
          label: paddingSpace2 + 'User 1: John Smith',
          'font': {
            'face': 'Open Sans',
            'color': Colors.pebble,
            'size': '11',
            'align': 'left'
          },
          borderWidth: '0',
          shape: 'icon',
          color: '#F2F2F4',
          icon: {
            face: 'FontAwesome',
            code: '\uf007',
            size: 30,
            color: Colors.coral
          },
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
          shape: 'icon',
          color: '#F2F2F4',
          icon: {
            face: 'FontAwesome',
            code: '\uf013',
            size: 30,
            color: Colors.coral
          },
          x: 80,
          y: 250
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
          shape: 'icon',
          color: '#F2F2F4',
          icon: {
            face: 'FontAwesome',
            code: '\uf013',
            size: 30,
            color: '#FCC875'
          },
          x: 10,
          y: 250
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
          shape: 'icon',
          color: '#F2F2F4',
          icon: {
            face: 'FontAwesome',
            code: '\uf013',
            size: 30,
            color: '#90D0A4'
          },
          x: -60,
          y: 250
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

      // create a network
      let data = {
        nodes: nodes,
        edges: edges
      };

      let network = new vis.Network(this.networkGraph, data, options);
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
