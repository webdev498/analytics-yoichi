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
  maxNumbersOnLeftRight: 5,
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
    expect(component.props().maxNumbersOnLeftRight).to.equal(5);
    expect(component.type()).to.equal(PaginationWidget);
    expect(component.props().type).to.be.defined;
    expect(component.props().type).to.be.an('string');
    expect(component.props().type).to.equal('primary');
    expect(component.props().style).to.be.defined;
    expect(component.props().style).to.be.an('object');
    expect(component.props().fetchData).to.exist;
    expect(component.props().fetchData).to.be.a('function');
  });

  it('should display pagination buttons correctly', () => {
    const component = renderPaginationWidget(),
      size = component.props().size,
      currentPage = component.props().currentPage,
      maxNumbersOnLeftRight = component.props().maxNumbersOnLeftRight,
      limits = getPaginationButtonsLimits(size, currentPage, maxNumbersOnLeftRight);
    expect(limits).to.be.an('object');
    expect(limits.start).to.equal(1);
    expect(limits.end).to.equal(11);
  });

  it('should have <ul> and <li> elements', () => {
    const component = mountPaginationWidget();
    expect(component.find('ul')).to.have.length(1);
    expect(component.find('ul').children()).to.have.length(13);
    expect(component.find('ul').childAt(0).type()).to.equal('li');
    expect(component.find('li')).to.have.length(13);
  });

  it('each <li> should have one <button> element', () => {
    const component = mountPaginationWidget();
    expect(component.find('ul').childAt(0).childAt(0).type()).to.equal('button');
  });

  it('all <li> should have key', () => {
    const component = mountPaginationWidget();
    expect(component.find('ul').childAt(0).key()).to.be.defined;
  });

  it('simulates page buttons click events', () => {
    const onPrevPageChanged = sinon.spy(),
      onNextPageChanged = sinon.spy(),
      wrapper = mount(
        <PaginationWidget {...props}>
          <ul className='pagination'>
            <li key='Prev'><button className='prev-pagination-link' onClick={onPrevPageChanged()}>&lt;&lt;</button></li>
            <li key='Next'><button className='next-pagination-link' onClick={onNextPageChanged()}>&gt;&gt;</button></li>
          </ul>
        </PaginationWidget>
      );
    wrapper.find('.prev-pagination-link').simulate('click');
    expect(onPrevPageChanged.calledOnce).to.equal(true);
    expect(onPrevPageChanged.callCount).to.equal(1);

    wrapper.find('.next-pagination-link').simulate('click');
    expect(onNextPageChanged.calledOnce).to.equal(true);
    expect(onNextPageChanged.callCount).to.equal(1);
  });

  it('should have active class for the current page button', () => {
    const component = mountPaginationWidget();
    const currentPageLink = component.find('.active');
    expect(currentPageLink.key()).to.equal('1');
  });

  it('should have active class only for one <li>', () => {
    const component = mountPaginationWidget();
    expect(component.find('.active')).to.have.length(1);
  });
});
