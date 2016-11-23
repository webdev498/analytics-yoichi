import React from 'react';
import { mount } from 'enzyme';

import {wrapThemeProvider} from '../testUtils';

import {Search} from 'layouts/CoreLayout/Search';

describe('<Search />', () => {
  let component, props;

  beforeEach(function() {
    props = {
      auth: {}
    };

    component = mount(<Search {...props} />);
    component = component.find('ParentCard');
  });

  it('should exist', () => {
    expect(Search).to.exist;
  });

  it('should have type of Sidebar', () => {
    expect(component.type()).to.equal(Search);
  });
});
