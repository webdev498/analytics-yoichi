import React, {PropTypes} from 'react';

export function getPaginationButtonsRange(pageCount, currentPage, maxNumbersOnLeftRight) {
  let start = currentPage - maxNumbersOnLeftRight,
    end = currentPage + maxNumbersOnLeftRight;

  if (currentPage < (maxNumbersOnLeftRight + 1)) {
    start = 1;
    if (pageCount < ((maxNumbersOnLeftRight * 2) + 1)) {
      end = pageCount;
    }
    else {
      end = (maxNumbersOnLeftRight * 2) + 1;
    }
  }
  if (currentPage > pageCount - maxNumbersOnLeftRight) {
    if ((pageCount - (maxNumbersOnLeftRight * 2)) < 1) {
      start = 1;
    }
    else {
      start = pageCount - (maxNumbersOnLeftRight * 2);
    }
    end = pageCount;
  }

  return {
    start: start,
    end: end
  };
}

class PaginationWidget extends React.Component {
  static propTypes = {
    pageCount: PropTypes.number,
    currentPage: PropTypes.number,
    maxNumbersOnLeftRight: PropTypes.number,
    fetchData: PropTypes.func,
    type: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.onPageChanged = this.onPageChanged.bind(this);
    this.onPrevPageChanged = this.onPrevPageChanged.bind(this);
    this.onNextPageChanged = this.onNextPageChanged.bind(this);
  }

  onPageChanged(pageNumber) {
    const {props} = this;
    return (event) => {
      console.log('test1');
      props.fetchData(pageNumber, props.type);
    };
  }

  onPrevPageChanged(pageNumber) {
    const {props} = this;
    return (event) => {
      if ((parseInt(pageNumber) - 1) > 0) {
        props.fetchData(pageNumber - 1, props.type);
      }
    };
  }

  onNextPageChanged(pageNumber, pageSize) {
    const {props} = this;
    return (event) => {
      if ((parseInt(pageNumber) + 1) <= pageSize) {
        props.fetchData(pageNumber + 1, props.type);
      }
    };
  }

  render() {
    let li = [],
      pageCount = this.props.pageCount,
      currentPage = this.props.currentPage,
      maxNumbersOnLeftRight = this.props.maxNumbersOnLeftRight,
      limits = getPaginationButtonsRange(pageCount, currentPage, maxNumbersOnLeftRight),
      start = limits.start,
      end = limits.end;

    if (pageCount > 1 && start > 0 && end > 0) {
      for (let i = start; i <= end; i++) {
        if (i === start) {
          li.push(<li key='Prev'>
            <button
              className='prev-pagination-link'
              onClick={this.onPrevPageChanged(this.props.currentPage)}>&lt;&lt;</button>
          </li>);
        }

        if (this.props.currentPage === i) {
          li.push(<li key={i} className='active'><button>{i}</button></li>);
        }
        else {
          let link = 'pagination-link-' + i;
          li.push(<li key={i}>
            <button className={link} onClick={this.onPageChanged(i)}>{i}</button>
          </li>);
        }

        if (i === end) {
          li.push(<li key='Next'>
            <button
              className='next-pagination-link'
              onClick={this.onNextPageChanged(this.props.currentPage, pageCount)}>&gt;&gt;</button>
          </li>);
        }
      }
    }
    return (<ul className='pagination'>{li}</ul>);
  }
}

export default PaginationWidget;
