import React from 'react';
import { mount } from 'enzyme';

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

describe('Page Sidebar', () => {
  let component, props;

  beforeEach(function() {
    props = {
      location: {pathname: '/'}
    };

    component = mount(
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Sidebar {...props} />
      </MuiThemeProvider>
    );

    component = component.find('Sidebar');
  });

  it('should exist', () => {
    expect(Sidebar).to.exist;
  });

  it('should have type of Sidebar', () => {
    expect(component.type()).to.equal(Sidebar);
  });

  it('should have one child of type LeftNav', () => {
    expect(component.find('LeftNav').length).to.equal(0);
  });

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

  it('should have 5 font icons', () => {
    expect(component.find('FontIcon').length).to.equal(5);
    component.find('Link').forEach((node, index) => {
      expect(node.text()).to.have.string(links[index].icon);
    });
  });
});
