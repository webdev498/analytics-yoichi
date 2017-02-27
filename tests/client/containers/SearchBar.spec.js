import React from 'react';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import SearchBar from 'containers/SearchBar';
import FontIcon from 'material-ui/FontIcon';
import {wrapThemeProvider} from '../../testUtils';

function shallowRenderSearchBar(propsOptions) {
  let props = {
    floatingSearchBar: true,
    loadFloatingSearchBar: spy(),
    updateSearch: spy(),
    searchText: ''
  };

  props = Object.assign({}, props, propsOptions);

  let component = shallow(wrapThemeProvider(<SearchBar {...props} />));
  return component.find('SearchBar');
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
  return component;
  // let component = mount(<SearchBar {...props} />);
  // return component;
  // let component = mount(<SearchBar {...props} />);
  // return component;
}

describe('<SearchBar />', () => {
  it('exists', () => {
    expect(SearchBar).to.exist;
  });

  it('has correct props', () => {
    const component = shallowRenderSearchBar({floatingSearchBar: true, searchText: 'malware'});

    expect(component.props().floatingSearchBar).to.equal(true);
    expect(component.props().loadFloatingSearchBar).to.exist;
    expect(component.props().loadFloatingSearchBar).to.be.a('function');
    expect(component.props().updateSearch).to.exist;
    expect(component.props().updateSearch).to.be.a('function');
    expect(component.props().searchText).to.equal('malware');
  });

  it('should display clear icon if search bar is floating', () => {
    const component = mountSearchBar({floatingSearchBar: true});
    console.log(component.state());
    expect(component.state().showClearIcon).to.be.defined;
    expect(component.state().showClearIcon).to.equal(true);
  });

  // it('should not display clear icon if search bar is not floating', () => {
  //   const component = mountSearchBar({floatingSearchBar: false});
  //   expect(component.state().showClearIcon).to.equal(false);
  // });
});
