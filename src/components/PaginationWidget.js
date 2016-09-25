import React, {PropTypes} from 'react';

class PaginationWidget extends React.Component {
  static propTypes = {
    Size: PropTypes.number,
    onPageChanged: PropTypes.func,
    onPrevPageChanged: PropTypes.func,
    onNextPageChanged: PropTypes.func,
    currentPage: PropTypes.number
  }

  render() {
    let li = [];
    let pageCount = this.props.Size,
      currentPage = this.props.currentPage;
    let start = currentPage - 4;
    let end = currentPage + 4;
    if (currentPage < 5) {
      start = 1;
      if (pageCount < 9) {
        end = pageCount;
      }
      else {
        end = 9;
      }
    }
    if (currentPage > pageCount - 4) {
      if ((pageCount - 8) < 1) {
        start = 1;
      }
      else {
       start = pageCount - 8; 
      }
      end = pageCount;
    }
    if (pageCount > 0 && start > 0 && end > 0) {
      for (let i = start; i <= end; i++) {
        li.push(<li key='Prev' >
          <button onClick={this.props.onPrevPageChanged.bind(null, this.props.currentPage)}>Prev</button>
        </li>);

        if (this.props.currentPage === i) {
          li.push(<li key={i} className='active'><button>{i}</button></li>);
        }
        else {
          li.push(<li key={i} ><button onClick={this.props.onPageChanged.bind(null, i)}>{i}</button></li>);
        }
        if (i === end) {
          li.push(<li key='Next' >
            <button onClick={this.props.onNextPageChanged.bind(null, this.props.currentPage, pageCount)}>Next</button>
          </li>);
        }
      }
    }
    return (<ul className='pagination'>{li}</ul>);
  }
}

export default PaginationWidget;
