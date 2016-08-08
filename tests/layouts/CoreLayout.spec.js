import React from 'react';
import {
  createRenderer
} from 'react-addons-test-utils';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { mount, render, shallow } from 'enzyme';
import {spy} from 'sinon';

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

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppTheme from 'theme/AppTheme';

const muiTheme = getMuiTheme(AppTheme);

injectTapEventPlugin();

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
    updateApiData: spy(),
    hideKibana: spy(),
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
    hideKibana: spy(),
    logout: spy(),
    updateApiData: spy()
  };

  let component;

  if (enzymeFlag) {
    component = mount(<PageHeader {...props} />);
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

function setupPageHeaderShallow(auth = {user: null}, showKibana = false) {
  const props = {
    title: 'rank',
    auth,
    showKibana,
    hideKibana: spy(),
    logout: spy(),
    updateApiData: spy()
  };

  let component = shallow(<PageHeader {...props} />);
  // const component = (node) => shallow(node, {context: {muiTheme}});

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
      expect(component.state().showMenu).to.be.false;

      toggleMenu.simulate('click');

      expect(toggleMenu.childAt(1).type()).to.not.be.null;
      expect(toggleMenu.childAt(1).type()).to.equal(Paper);
      expect(component.state().showMenu).to.be.true;
    });

    it('should show BackToSummary button and on click should hide kibana', () => {
      let {component} = setupPageHeader(undefined, true, true),
        menu = component.ref('backBtn');

      expect(component.prop('title')).to.equal('rank');
      expect(component.prop('showKibana')).to.be.true;

      expect(menu.type()).to.equal(MenuItem);
      expect(menu.text()).to.equal('Back to Summary');
      expect(menu.childAt(0)).to.have.style('display');
      expect(menu.childAt(0)).to.not.have.style('display', 'none');

      menu.simulate('click');
      // console.log(component.prop('hideKibana').callCount);
      // expect(menu.childAt(0)).to.have.style('display', 'none');
      // expect(component.prop('hideKibana')).to.be.true;
    });

    describe('dropDown', function() {
      it('should have dropdown with 6 children', () => {
        let {component} = setupPageHeaderShallow(undefined, false),
          dropDown = component.childAt(1);

        expect(dropDown.type()).to.equal(DropDownMenu);
        expect(dropDown.children().length).to.equal(6);
        expect(dropDown.childAt(0).type()).to.equal(MenuItem);
        expect(dropDown.childAt(1).type()).to.equal(MenuItem);
        expect(dropDown.childAt(2).type()).to.equal(MenuItem);
        expect(dropDown.childAt(3).type()).to.equal(MenuItem);
        expect(dropDown.childAt(4).type()).to.equal(MenuItem);
        expect(dropDown.childAt(5).type()).to.equal(MenuItem);
        expect(dropDown.find(MenuItem).length).to.equal(6);
      });

      it('should call time range on click', () => {
        let {component} = setupPageHeaderShallow(undefined, false),
          dropDown = component.childAt(0);
        dropDown.childAt(2).simulate('touchTap');
        // expect(component.state().value).to.equal(2);
      });
    });

    it('should logout', () => {

    });
  });

  describe('Sidebar component', () => {

  });
});
