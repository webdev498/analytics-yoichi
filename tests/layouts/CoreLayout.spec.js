import React from 'react';
import {
  createRenderer
} from 'react-addons-test-utils';

// import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import {CoreLayout} from 'layouts/CoreLayout';
import PageHeaderWrapped, {PageHeader} from 'layouts/CoreLayout/PageHeader';
import {PageContent} from 'layouts/CoreLayout/PageContent';
import Loader from 'components/Loader';
import ParentCard from 'containers/ParentCard';
import MetricsCard from 'components/MetricsCard';
import AppBar from 'material-ui/AppBar';

import DropDownMenu from 'material-ui/DropDownMenu';
import Menu from 'material-ui/Menu/Menu';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import Paper from 'material-ui/Paper';

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
  let component,
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

function setupPageHeader(auth = {user: null}, showKibana = false, enzymeFlag = false) {
  const props = {
    title: 'rank',
    auth,
    showKibana,
    hideKibana: sinon.spy(),
    logout: sinon.spy(),
    updateApiData: sinon.spy()
  };

  let component;

  if (enzymeFlag) {
    component = mount(<PageHeader {...props} />);
    // console.log(component);
  }
  else {
    const renderer = createRenderer();
    renderer.render(<PageHeader {...props} />);
    component = renderer.getRenderOutput();
  }

  return {
    props,
    component
  };
}

describe('CoreLayout', () => {
  describe('index File', () => {
    it('should render correctly', () => {
      const { component } = setup();
      let [ header, nav, contentWrap ] = component.props.children;

      expect(nav.type).to.equal('nav');
      expect(header.type).to.equal(PageHeaderWrapped);
      expect(contentWrap.type).to.equal('div');
    });

    it('should show loader if isLoading flag is true', () => {
      const { component } = setup(true);

      const content = component.props.children[2],
        loaderWrap = content.props.children[0],
        loader = loaderWrap.props.children;

      expect(loader.type).to.equal(Loader);
    });

    it('should show kibana', () => {

    });
  });

  describe('PageContent file', () => {
    it('should show loader if isFetching flag is true', () => {
      const {component} = setupPageContent(true),
        loader = component.props.children;

      expect(loader.type).to.equal(Loader);
    });

    it('should layout components based on layout json passed to it.', () => {
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

  describe('PageHeader component', () => {
    it('should layout Material UI\'s AppBar', () => {
      const {component} = setupPageHeader();
      expect(component.type).to.equal(AppBar);

      const children = component.props.children;
      expect(children.length).to.equal(3);

      const [menu, dropDown] = children;
      expect(menu.type).to.equal(MenuItem);
      expect(dropDown.type).to.equal(DropDownMenu);
    });

    it('should toggle menu', () => {
      const auth = {user: {id: 'random', name: 'John Snow'}};
      let {component} = setupPageHeader(auth, undefined, true);

      expect(component.props().title).to.equal('rank');
      expect(component.props().showKibana).to.be.false;
      expect(component.props().auth).to.deep.equal(auth);

      let toggleMenu = component.ref('menuToggleDiv');
      expect(toggleMenu.childAt(0).type()).to.equal('div');
      expect(toggleMenu.childAt(1).type()).to.be.null;

      toggleMenu.simulate('click');

      expect(toggleMenu.childAt(1).type()).to.not.be.null;
      expect(toggleMenu.childAt(1).type()).to.equal(Paper);
    });

    it('should hide kibana', () => {

    });

    it('should time range', () => {

    });

    it('should logout', () => {

    });
  });

  describe('Sidebar component', () => {

  });
});
