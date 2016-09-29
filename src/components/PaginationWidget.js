import React, {PropTypes} from 'react';

function getLimitsForPaginationButtons(pageCount, currentPage, maxNumbersOnLeftRight) {
  let start = currentPage - maxNumbersOnLeftRight,
    end = currentPage + maxNumbersOnLeftRight;

  console.log('start', start, end, pageCount, currentPage);

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

  // if (currentPage === pageCount) {
  //   console.log('qqq', start, end, pageCount, currentPage);
  //   start = pageCount - (maxNumbersOnLeftRight * 2);
  //   if (start < 1) {
  //     start = pageCount - maxNumbersOnLeftRight;
  //     if (start < 1) {
  //       start = 2;
  //     }
  //   }
  //   end = pageCount;
  // }
  console.log('end', start, end, pageCount, currentPage);

  return {
    start: start,
    end: end
  };
}

class PaginationWidget extends React.Component {
  static propTypes = {
    Size: PropTypes.number,
    currentPage: PropTypes.number,
    maxNumbersOnLeftRight: PropTypes.number,
    onPageChanged: PropTypes.func,
    onPrevPageChanged: PropTypes.func,
    onNextPageChanged: PropTypes.func
  }

  render() {
    let li = [],
      pageCount = this.props.Size,
      currentPage = this.props.currentPage,
      maxNumbersOnLeftRight = this.props.maxNumbersOnLeftRight,
      limits = getLimitsForPaginationButtons(pageCount, currentPage, maxNumbersOnLeftRight),
      start = limits.start,
      end = limits.end;

    console.log('currentPage', currentPage);

    if (pageCount > 0 && start > 0 && end > 0) {
      for (let i = start; i <= end; i++) {
        if (i === start) {
          li.push(<li key='Prev'>
            <button onClick={this.props.onPrevPageChanged.bind(null, this.props.currentPage)}>Prev</button>
          </li>);
        }

        if (this.props.currentPage === i) {
          li.push(<li key={i} className='active'><button>{i}</button></li>);
        }
        else {
          li.push(<li key={i} ><button onClick={this.props.onPageChanged.bind(null, i)}>{i}</button></li>);
        }

        if (i === end) {
          li.push(<li key='Next'>
            <button onClick={this.props.onNextPageChanged.bind(null, this.props.currentPage, pageCount)}>Next</button>
          </li>);
        }
      }
    }
    return (<ul className='pagination'>{li}</ul>);
  }
}

export default PaginationWidget;
