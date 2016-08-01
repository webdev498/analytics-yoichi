import React from 'react';
import {
  createRenderer
} from 'react-addons-test-utils';

import {CoreLayout} from 'layouts/CoreLayout';
import PageHeader from 'layouts/CoreLayout/PageHeader';
import {PageContent} from 'layouts/CoreLayout/PageContent';
import Loader from 'components/Loader';
import ParentCard from 'containers/ParentCard';
import MetricsCard from 'components/MetricsCard';

function getLayout() {
  const layout = [
    [
      {
        'id': '1',
        'type': 'MetricsCard',
        'meta': {
          'showHeader': false,
          'api': null
        },
        'attributes': {
          'title': 'High Priority Alerts'
        }
      },
      {
        'id': '2',
        'type': 'MetricsCard',
        'meta': {
          'showHeader': false,
          'api': null
        },
        'attributes': {
          'title': 'High Priority Malwares'
        }
      }
    ]
  ];

  return layout;
}

function setup(isLoading = false) {
  let props = {
    updateApiData: sinon.spy(),
    hideKibana: sinon.spy(),
    location: {},
    auth: {
      isLoading
    }
  };

  let renderer = createRenderer();
  renderer.render(<CoreLayout {...props} />);
  let component = renderer.getRenderOutput();

  return {
    props,
    component,
    renderer
  };
}

function setupPageContent(isFetching = false, layout = []) {
  let component, props;
  props = {
    isFetching,
    layout
  };

  let renderer = createRenderer();
  renderer.render(<PageContent {...props} />);
  component = renderer.getRenderOutput();
  return {
    props,
    component,
    renderer
  };
}

describe('CoreLayout', () => {
  describe('index File', () => {
    it('should render correctly', () => {
      const { component } = setup();
      let [ header, nav, contentWrap ] = component.props.children;

      expect(nav.type).to.equal('nav');
      expect(header.type).to.equal(PageHeader);
      expect(contentWrap.type).to.equal('div');
    });

    it('should show loader if isLoading flag is true', function() {
      const { component } = setup(true);

      const content = component.props.children[2],
        loaderWrap = content.props.children[0],
        loader = loaderWrap.props.children;

      expect(loader.type).to.equal(Loader);
    });
  });

  describe('PageContent file', function() {
    const {component} = setupPageContent(true);

    it('should show loader if isFetching flag is true', function() {
      const loader = component.props.children;
      expect(loader.type).to.equal(Loader);
    });

    it('should layout components based on layout json passed to it.', function() {
      const layout = getLayout();
      const {component, props} = setupPageContent(false, layout);

      expect(props.layout).to.deep.equal(layout);

      const sections = component.props.children.props.children,
        section = sections[0];

      expect(sections.length).to.equal(1);
      expect(section.type).to.equal('section');

      const sectionChildren = section.props.children;
      expect(sectionChildren.length).to.equal(2);

      expect(sectionChildren[0].type).to.equal(ParentCard);
      expect(sectionChildren[1].type).to.equal(ParentCard);

      const firstMetricCard = sectionChildren[0].props.children,
        secondMetricCard = sectionChildren[1].props.children;

      expect(firstMetricCard.type).to.equal(MetricsCard);
      expect(secondMetricCard.type).to.equal(MetricsCard);
    });
  });
});
