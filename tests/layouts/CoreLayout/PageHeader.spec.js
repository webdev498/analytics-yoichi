import React from 'react';

import {
  createRenderer
} from 'react-addons-test-utils';

import injectTapEventPlugin from 'react-tap-event-plugin';
import {PageHeader} from 'layouts/CoreLayout/PageHeader';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import Paper from 'material-ui/Paper';

import { simulateEvent } from '../../testUtils';

injectTapEventPlugin();

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

  return {
    props,
    component
  };
}

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

  describe('timeRange dropDown', function() {
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

  describe('user dropdown', function() {
    it('should call logout', () => {
      const auth = {user: {id: 'random', name: 'John Snow'}};
      let {component} = setupPageHeader(auth, undefined, true);

      let toggleMenu = component.ref('menuToggleDiv');
      expect(toggleMenu.childAt(0).type()).to.equal('div');
      expect(toggleMenu.childAt(1).type()).to.be.null;
      expect(component.state().showMenu).to.be.false;

      toggleMenu.simulate('click');

      expect(toggleMenu.childAt(1).type()).to.not.be.null;
      expect(toggleMenu.childAt(1).type()).to.equal(Paper);
      expect(component.state().showMenu).to.be.true;

      const button = toggleMenu.find('MenuItem').first().find('EnhancedButton');

      simulateEvent(button, 'click');
      expect(component.prop('logout').callCount).to.equal(1);
    });
  });
});
