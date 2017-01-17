import React from 'react';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import PaginationWidget, {
  getPaginationButtonsLimits
} from 'components/widgets/PaginationWidget';
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

function renderPaginationWidget(newProps) {
  let component;
  if (newProps) {
    component = shallow(wrapThemeProvider(<PaginationWidget {...newProps} />));
  }
  else {
    component = shallow(wrapThemeProvider(<PaginationWidget {...props} />));
  }
  return component.find('PaginationWidget');
}

function mountPaginationWidget(newProps) {
  let component;
  if (newProps) {
    component = mount(<PaginationWidget {...newProps} />);
  }
  else {
    component = mount(<PaginationWidget {...props} />);
  }
  return component.find('PaginationWidget');
}

describe('<PaginationWidget />', () => {
  it('exists', () => {
    expect(PaginationWidget).to.exist;
  });

  it('should have correct props', () => {
    const component = renderPaginationWidget();
    expect(component.props().pageCount).to.be.defined;
    expect(component.props().pageCount).to.be.a('number');
    expect(component.props().pageCount).to.equal(20);
    expect(component.props().currentPage).to.be.defined;
    expect(component.props().currentPage).to.be.a('number');
    expect(component.props().currentPage).to.equal(1);
    expect(component.props().maxNumbersOnLeftRight).to.be.defined;
    expect(component.props().maxNumbersOnLeftRight).to.be.a('number');
    expect(component.props().maxNumbersOnLeftRight).to.equal(5);
    expect(component.type()).to.equal(PaginationWidget);
    expect(component.props().type).to.be.defined;
    expect(component.props().type).to.be.a('string');
    expect(component.props().type).to.equal('primary');
    expect(component.props().style).to.be.defined;
    expect(component.props().style).to.be.an('object');
    expect(component.props().fetchData).to.exist;
    expect(component.props().fetchData).to.be.a('function');
  });

  describe('getPaginationButtonsLimits function: should return valid buttons range', () => {
    it('if current page is first page', () => {
      const component = renderPaginationWidget(),
        pageCount = component.props().pageCount,
        currentPage = component.props().currentPage,
        maxNumbersOnLeftRight = component.props().maxNumbersOnLeftRight,
        limits = getPaginationButtonsLimits(pageCount, currentPage, maxNumbersOnLeftRight);
      expect(limits).to.be.an('object');
      expect(limits.start).to.equal(1);
      expect(limits.end).to.equal(11);
    });

    it('if current page is less than maxNumbersOnLeftRight specifed', () => {
      const newProps = {
          id: 'pagination',
          pageCount: 24,
          currentPage: 3,
          maxNumbersOnLeftRight: 4,
          fetchData: spy(),
          type: 'primary',
          style: {}
        },
        component = renderPaginationWidget(newProps),
        pageCount = component.props().pageCount,
        currentPage = component.props().currentPage,
        maxNumbersOnLeftRight = component.props().maxNumbersOnLeftRight,
        limits = getPaginationButtonsLimits(pageCount, currentPage, maxNumbersOnLeftRight);
      expect(limits).to.be.an('object');
      expect(limits.start).to.equal(1);
      expect(limits.end).to.equal(9);
    });

    it('if current page is greater than maxNumbersOnLeftRight specifed', () => {
      const newProps = {
          id: 'pagination',
          pageCount: 24,
          currentPage: 7,
          maxNumbersOnLeftRight: 4,
          fetchData: spy(),
          type: 'primary',
          style: {}
        },
        component = renderPaginationWidget(newProps),
        pageCount = component.props().pageCount,
        currentPage = component.props().currentPage,
        maxNumbersOnLeftRight = component.props().maxNumbersOnLeftRight,
        limits = getPaginationButtonsLimits(pageCount, currentPage, maxNumbersOnLeftRight);
      expect(limits).to.be.an('object');
      expect(limits.start).to.equal(3);
      expect(limits.end).to.equal(11);
    });

    it('if current page is last page', () => {
      const newProps = {
          id: 'pagination',
          pageCount: 24,
          currentPage: 24,
          maxNumbersOnLeftRight: 4,
          fetchData: spy(),
          type: 'primary',
          style: {}
        },
        component = renderPaginationWidget(newProps),
        pageCount = component.props().pageCount,
        currentPage = component.props().currentPage,
        maxNumbersOnLeftRight = component.props().maxNumbersOnLeftRight,
        limits = getPaginationButtonsLimits(pageCount, currentPage, maxNumbersOnLeftRight);
      expect(limits).to.be.an('object');
      expect(limits.start).to.equal(16);
      expect(limits.end).to.equal(24);
    });
  });

  it('should have <ul> and <li> elements', () => {
    const component = mountPaginationWidget();
    expect(component.find('ul')).to.have.length(1);
    expect(component.find('ul').children()).to.have.length(13);
    expect(component.find('ul').childAt(0).type()).to.equal('li');
    expect(component.find('li')).to.have.length(13);
  });

  it('should have one <button> element for each <li>', () => {
    const component = mountPaginationWidget();
    expect(component.find('ul').childAt(0).childAt(0).type()).to.equal('button');
  });

  it('should have key for all <li>s', () => {
    const component = mountPaginationWidget();
    expect(component.find('ul').childAt(0).key()).to.be.defined;
  });

  it('it paginates to Prev page on click of Prev button', () => {
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
    let component = mountPaginationWidget(),
      currentPageLink = component.find('.active');
    expect(currentPageLink.key()).to.equal('1');

    component.find('.next-pagination-link').simulate('click');

    const newProps = {
      id: 'pagination',
      pageCount: 20,
      currentPage: 2,
      maxNumbersOnLeftRight: 5,
      fetchData: spy(),
      type: 'primary',
      style: {}
    };

    component = mountPaginationWidget(newProps);
    currentPageLink = component.find('.active');
    expect(currentPageLink.key()).to.equal('2');
  });

  it('should have active class only for one <li>', () => {
    let component = mountPaginationWidget();
    expect(component.find('.active')).to.have.length(1);

    component.find('.next-pagination-link').simulate('click');

    const newProps = {
      id: 'pagination',
      pageCount: 20,
      currentPage: 2,
      maxNumbersOnLeftRight: 5,
      fetchData: spy(),
      type: 'primary',
      style: {}
    };

    component = mountPaginationWidget(newProps);
    expect(component.find('.active')).to.have.length(1);
  });
});
