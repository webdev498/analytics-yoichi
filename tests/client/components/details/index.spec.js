import React from 'react';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import DetailsTable from 'components/details';
import {wrapThemeProvider} from '../../../testUtils';

let props = {
  id: 'pagination',
  pageCount: 20,
  currentPage: 1,
  maxNumbersOnLeftRight: 5,
  fetchData: spy(),
  type: 'primary',
  style: {}
};

function renderDetailsTable(newProps) {
  let component;
  if (newProps) {
    component = shallow(wrapThemeProvider(<DetailsTable {...newProps} />));
  }
  else {
    component = shallow(wrapThemeProvider(<DetailsTable {...props} />));
  }
  return component.find('DetailsTable');
}

function mountDetailsTable(newProps) {
  let component;
  if (newProps) {
    component = mount(<DetailsTable {...newProps} />);
  }
  else {
    component = mount(<DetailsTable {...props} />);
  }
  return component.find('DetailsTable');
}

describe('<DetailsTable />', () => {
  it('exists', () => {
    expect(DetailsTable).to.exist;
  });

  it('should have correct props', () => {
    const component = renderDetailsTable();
  });
});
