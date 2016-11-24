import React from 'react';
import { mount } from 'enzyme';
import {spy} from 'sinon';

import Sidebar from 'layouts/CoreLayout/Sidebar';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppTheme from 'theme/AppTheme';

const muiTheme = getMuiTheme(AppTheme);

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const links = [
  {
    to: '/alerts',
    icon: 'warning',
    text: 'alerts'
  },
  {
    to: '/country',
    icon: 'public',
    text: 'country'
  },
  {
    to: '/traffic',
    icon: 'swap_vert',
    text: 'traffic'
  },
  {
    to: '/assets',
    icon: 'desktop_mac',
    text: 'asset'
  },
  {
    to: '/user-agent',
    icon: 'dvr',
    text: 'user-agent'
  }
];

function getSidebar(propObj = {}) {
  const props = Object.assign({
    location: {pathname: '/'},
    sidebar: links,
    showSearch: false,
    toggleSearch: spy()
  }, propObj);

  const root = mount(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <Sidebar {...props} />
    </MuiThemeProvider>
    );

  const component = root.find('Sidebar');

  return { root, component };
}

describe('<Sidebar />', () => {
  let component, root;

  before(function() {
    ({root, component} = getSidebar());
  });

  it('should exist', () => {
    expect(Sidebar).to.exist;
  });

  it('should have type of Sidebar', () => {
    expect(component.type()).to.equal(Sidebar);
  });

  it('should have one search element', () => {
    expect(component.find('.search-link')).to.exist;
  });

  it('should not show search by default', () => {
    expect(root.find('.search')).to.have.length(0);
  });

  it('should call toggleSearch on click of search link', () => {
    expect(root.find('.search')).to.have.length(0);
    const searchLink = component.find('.search-link');
    searchLink.simulate('click');
    expect(component.props().toggleSearch.callCount).to.equal(1);
  });

  // it('should show search if showSearch is true', function() {
  //   const comp = getSidebar({ showSearch: true }).component;
  //   expect(comp.find('.search')).to.have.length(1);
  // });

  it('should have 5 links', () => {
    expect(component.find('Link').length).to.equal(5);
  });

  it('should have correct text', () => {
    component.find('Link').forEach((node, index) => {
      expect(node.text()).to.have.string(links[index].text);
    });
  });

  it('should have apt urls', () => {
    component.find('Link').forEach((node, index) => {
      expect(node.prop('to')).to.exist;
      expect(node.prop('to')).to.equal(links[index].to);
    });
  });

  it('should have 6 font icons', () => {
    expect(component.find('FontIcon').length).to.equal(6);
    component.find('Link').forEach((node, index) => {
      expect(node.text()).to.have.string(links[index].icon);
    });
  });
});
