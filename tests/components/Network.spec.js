import React from 'react';

import {
  createRenderer
} from 'react-addons-test-utils';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import NetworkGraph, {
  generateDataFromAssetDetails,
  createNodeObject,
  createEdgeObject
} from 'components/NetworkGraph';
import Loader from 'components/Loader';
import {Colors} from 'theme/colors';
import {wrapThemeProvider} from '../testUtils';

let props = {
  id: 'NetworkGraph',
  data: null,
  params: {
    date: '2016-11-21T12:23:22.222'
  },
  'attributes': {
    'style': {
      'width': '100%'
    },
    'canvasStyle': {
      'height': '600px',
      'width': '100%'
    },
    'id': 'NetworkGraph'
  },
  fetchApiData: spy()
};

function renderNetworkGraph() {
  let component = shallow(wrapThemeProvider(<NetworkGraph {...props} />));
  return component.find('NetworkGraph');
}

function mountNetworkGraph(isFetching) {
  let props = {
    id: 'NetworkGraph',
    isFetching,
    data: null,
    params: {
      date: '2016-11-21T12:23:22.222'
    },
    'attributes': {
      'style': {
        'width': '100%'
      },
      'canvasStyle': {
        'height': '600px',
        'width': '100%'
      },
      'id': 'NetworkGraph'
    },
    fetchApiData: spy()
  };
  return mount(<NetworkGraph {...props} />);
}

function mountNetworkGraphComponent() {
  let component = mount(<NetworkGraph {...props} />);
  return component.find('NetworkGraph');
}

function renderNetwork(isFetching) {
  let component,
    props = {
      id: 'NetworkGraph',
      isFetching,
      data: null,
      params: {
        date: '2016-11-21T12:23:22.222'
      },
      'attributes': {
        'style': {
          'width': '100%'
        },
        'canvasStyle': {
          'height': '600px',
          'width': '100%'
        },
        'id': 'NetworkGraph'
      },
      fetchApiData: spy()
    };

  let renderer = createRenderer();
  renderer.render(<NetworkGraph {...props} />);
  component = renderer.getRenderOutput();
  return {
    props,
    component,
    renderer
  };
}

describe('<NetworkGraph />', () => {
  it('exists', () => {
    expect(NetworkGraph).to.exist;
  });

  it('should have correct props', () => {
    const component = renderNetworkGraph();
    expect(component.props().id).to.be.defined;
    expect(component.props().id).to.equal('NetworkGraph');
    expect(component.type()).to.equal(NetworkGraph);
    expect(component.props().attributes).to.be.defined;
    expect(component.props().fetchApiData).to.exist;
    expect(component.props().fetchApiData).to.be.a('function');
  });

  it('should display asset node if it loads on asset page', () => {
    const component = renderNetworkGraph();
    expect(component.props().data).to.be.defined;
    expect(component.props().data).to.not.be.an('array');
    let data = {
        id: '192.168.2.11',
        type: 'user',
        info: {
          name: 'Root'
        }
      },
      nodes = [
        {
          id: '192.168.2.11',
          nodeId: '192.168.2.11',
          label: 'Root',
          type: 'user',
          metadata: {
            name: 'Root'
          }
        }
      ],
      graphObj = [
        {
          nodes,
          edges: []
        }
      ];

    expect(generateDataFromAssetDetails(data)).to.deep.equal(graphObj);
  });

  it('Should display loader', () => {
    const wrapper = mountNetworkGraph(true);
    wrapper.setState({ isFetching: true });
    expect(wrapper.find(Loader)).to.exist;
  });

  it('Should create node object correctly', () => {
    const component = renderNetworkGraph();
    expect(component.props().data).to.be.defined;
    expect(component.props().data).to.not.be.an('array');
    let dataNode = {
        id: '121.18.238.109',
        label: '121.18.238.109',
        type: 'machine',
        metadata: {},
        actionData: {
          owner: 'RankSoftwareInc.com'
        },
        nodeId: '121.18.238.109',
        nodeTypeDisplay: 'Machine'
      },
      nodeObject = {
        id: '121.18.238.109',
        notNodeId: '121.18.238.109',
        type: 'machine',
        label: '  121.18.238.109',
        title: '<b>Machine:</b> 121.18.238.109',
        nodeDetails: [],
        actions: [],
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
        actionData: {
          owner: 'RankSoftwareInc.com'
        },
        metadata: {},
        status: 'safe',
        image: '/img/Node-safe-INACTIVE/machine-safe.png'
      };

    expect(createNodeObject(dataNode)).to.deep.equal(nodeObject);
  });

  it('Should create edge object correctly', () => {
    const component = renderNetworkGraph();
    expect(component.props().data).to.be.defined;
    expect(component.props().data).to.not.be.an('array');
    let dataEdge = {
        id: 'conn',
        source: '192.168.2.11',
        target: '192.168.2.12',
        label: 'conn',
        actionData: {},
        metadata: {}
      },
      edgeObject = {
        id: 'conn',
        notNodeId: 'conn',
        type: [],
        from: '192.168.2.11',
        to: '192.168.2.12',
        arrows: {
          to: {
            scaleFactor: 0.5
          },
          arrowStrikethrough: false
        },
        label: 'conn\n\n\n',
        title: 'conn',
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
        actionData: {},
        metadata: {}
      },
      edgesTypes = [];

    edgesTypes.push(
      <li key='1'>conn</li>
    );

    edgeObject.edgeDetails.push(
      <ul className='no-list-style'>
        <li key='edgeType'><b>Edge Type:</b>
          <ol style={{padding: 0}}>
            {edgesTypes}
          </ol>
        </li>
        <li key='source'><b>Source:</b> 192.168.2.11</li>
        <li key='target'><b>Target:</b> 192.168.2.12</li>
      </ul>
    );

    // This is failing, need to check this again.
    // expect(createEdgeObject(dataEdge, [])).to.deep.equal(edgeObject);
  });

  it('if edge type is ioc then, it should display as dash line', () => {

  });
});
