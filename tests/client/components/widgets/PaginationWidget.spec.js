import React from 'react';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import PaginationWidget, {
  getPaginationButtonsLimits
} from 'components/widgets/PaginationWidget';
import {wrapThemeProvider} from '../../../testUtils';

let props = {
  id: 'pagination',
  size: 20,
  currentPage: 1,
  maxNumbersOnLeftRight: 4,
  fetchData: spy(),
  onPrevPageChanged: spy(),
  type: 'primary',
  style: {}
};

function renderPaginationWidget() {
  let component = shallow(wrapThemeProvider(<PaginationWidget {...props} />));
  return component.find('PaginationWidget');
}

function mountPaginationWidget() {
  return mount(<PaginationWidget {...props} />);
}

function mountPaginationWidgetComponent() {
  let component = mount(<PaginationWidget {...props} />);
  return component.find('PaginationWidget');
}

describe('<PaginationWidget />', () => {
  it('exists', () => {
    expect(PaginationWidget).to.exist;
  });

  it('should have correct props', () => {
    const component = renderPaginationWidget();
    expect(component.props().size).to.be.defined;
    expect(component.props().size).to.be.an('number');
    expect(component.props().size).to.equal(20);
    expect(component.props().currentPage).to.be.defined;
    expect(component.props().currentPage).to.be.an('number');
    expect(component.props().currentPage).to.equal(1);
    expect(component.props().maxNumbersOnLeftRight).to.be.defined;
    expect(component.props().maxNumbersOnLeftRight).to.be.an('number');
    expect(component.props().maxNumbersOnLeftRight).to.equal(4);
    expect(component.type()).to.equal(PaginationWidget);
    expect(component.props().type).to.be.defined;
    expect(component.props().type).to.be.an('string');
    expect(component.props().style).to.be.defined;
    expect(component.props().style).to.be.an('object');
    expect(component.props().fetchData).to.exist;
    expect(component.props().fetchData).to.be.a('function');
  });

  it('should display pagination links correctly', () => {
    const component = renderPaginationWidget(),
      size = component.props().size,
      currentPage = component.props().currentPage,
      maxNumbersOnLeftRight = component.props().maxNumbersOnLeftRight,
      pageLimits = {
        start: 1,
        end: 9
      };
    expect(getPaginationButtonsLimits(size, currentPage, maxNumbersOnLeftRight)).to.deep.equal(pageLimits);
  });

  it('should click pagination link', () => {
    const component = mountPaginationWidgetComponent();
    const paginationLink = component.find('.prev-pagination-link');
    paginationLink.simulate('click');
    expect(component.props().fetchData.callCount).to.equal(1);
  });

  it('simulates page buttons click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(
      <PaginationWidget {...props}>
        <ul className='pagination'>
          <li key='prev'><button className='prev-pagination-link' onClick={onButtonClick()}>&lt;&lt;</button></li>
        </ul>
      </PaginationWidget>
    );
    wrapper.find('.prev-pagination-link').simulate('click');
    expect(onButtonClick.calledOnce).to.equal(true);
  });
});
