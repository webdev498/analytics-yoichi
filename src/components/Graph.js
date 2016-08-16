// import {default as React, Component} from 'react';
// const vis = require('vis');
// const uuid = require('uuid');

// class Graph extends Component {
//   constructor(props) {
//     super(props);
//     const {identifier} = this.props;
//     this.updateGraph = this.updateGraph.bind(this);
//     this.state = {
//       hierarchicalLayout: true,
//       identifier : identifier ? identifier : uuid.v4()
//     };
//   }

//   componentDidMount() {
//     this.updateGraph();
//   }

//   componentDidUpdate() {
//     this.updateGraph();
//   }

//   changeMode(event) {
//     this.setState({hierarchicalLayout: !this.state.hierarchicalLayout});
//     this.updateGraph();
//   }

//   updateGraph() {
//     let container = document.getElementById(this.state.identifier);
//     let options = {
//       stabilize: false,
//       smoothCurves: false,
//       edges: {
//         color: '#000000',
//         width: 0.5,
//         arrowScaleFactor: 0.5,
//         style: 'arrow'
//       }
//     };

//     if (this.state.hierarchicalLayout) {
//       options.hierarchicalLayout = {
//         enabled: true,
//         direction: 'UD',
//         levelSeparation: 100,
//         nodeSpacing: 1
//       };
//     }
//     else {
//       options.hierarchicalLayout = {
//         enabled: false
//       };
//     }

//     new vis.Network(container, this.props.graph, options);
//   }

//   render() {
//     const {identifier,style} = this.state;
//     return React.createElement('div', {onDoubleClick: this.changeMode.bind(this), id: identifier, style}, identifier);
//   }
// }

// Graph.defaultProps = {
//   graph: {},
//   style: {width: '640px', height: '480px'}
// };

// export default Graph;

// // these are all options in full.
// var options = {
//   edges:{
//     arrows: {
//       to:     {enabled: false, scaleFactor:1},
//       middle: {enabled: false, scaleFactor:1},
//       from:   {enabled: false, scaleFactor:1}
//     },
//     arrowStrikethrough: true,
//     color: {
//       color:'#848484',
//       highlight:'#848484',
//       hover: '#848484',
//       inherit: 'from',
//       opacity:1.0
//     },
//     dashes: false,
//     font: {
//       color: '#343434',
//       size: 14, // px
//       face: 'arial',
//       background: 'none',
//       strokeWidth: 2, // px
//       strokeColor: '#ffffff',
//       align:'horizontal'
//     },
//     hidden: false,
//     hoverWidth: 1.5,
//     label: undefined,
//     labelHighlightBold: true,
//     length: undefined,
//     physics: true,
//     scaling:{
//       min: 1,
//       max: 15,
//       label: {
//         enabled: true,
//         min: 14,
//         max: 30,
//         maxVisible: 30,
//         drawThreshold: 5
//       },
//       customScalingFunction: function (min,max,total,value) {
//         if (max === min) {
//           return 0.5;
//         }
//         else {
//           var scale = 1 / (max - min);
//           return Math.max(0,(value - min)*scale);
//         }
//       }
//     },
//     selectionWidth: 1,
//     selfReferenceSize:20,
//     shadow:{
//       enabled: false,
//       color: 'rgba(0,0,0,0.5)',
//       size:10,
//       x:5,
//       y:5
//     },
//     smooth: {
//       enabled: true,
//       type: "dynamic",
//       roundness: 0.5
//     },
//     title:undefined,
//     width: 1,
//     value: undefined
//   }
// }

// network.setOptions(options);
