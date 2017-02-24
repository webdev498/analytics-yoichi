import React from 'react';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import SearchBar from 'containers/SearchBar';
import FontIcon from 'material-ui/FontIcon';

function shallowRenderSearchBar(propsOptions) {
  let props = {
    floatingSearchBar: true,
    loadFloatingSearchBar: spy(),
    updateSearch: spy(),
    searchText: ''
  };

  props = Object.assign({}, props, propsOptions);

  let component = shallow(<SearchBar {...props} />);
  return component;
}

function mountSearchBar(propsOptions) {
  let props = {
    floatingSearchBar: true,
    loadFloatingSearchBar: spy(),
    updateSearch: spy(),
    searchText: ''
  };

  props = Object.assign({}, props, propsOptions);

  let component = mount(<SearchBar {...props} />);
  return component.find('SearchBar');
}

describe('<SearchBar />', () => {
  it('exists', () => {
    expect(SearchBar).to.exist;
  });

  it('has correct props', () => {
    const component = mountSearchBar({floatingSearchBar: true, searchText: 'malware'});

    expect(component.props().floatingSearchBar).to.equal(true);
    expect(component.props().loadFloatingSearchBar).to.exist;
    expect(component.props().loadFloatingSearchBar).to.be.a('function');
    expect(component.props().updateSearch).to.exist;
    expect(component.props().updateSearch).to.be.a('function');
    expect(component.props().searchText).to.equal('malware');
  });

  // it('should display clear icon if search bar is floating', () => {
  //   const component = mountSearchBar({floatingSearchBar: true});
  //   expect(component.state().showClearIcon).to.equal(true);
  //   expect(component.find('div').childAt(0).childAt(0).type()).to.equal(FontIcon);
  // });
});
