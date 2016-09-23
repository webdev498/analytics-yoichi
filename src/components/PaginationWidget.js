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
    var li = [];
    var pageCount = this.props.Size;
    console.log(pageCount, this.props.currentPage);
    for (var i = 1; i <= pageCount; i++) {
      if (i === 1) {
        li.push(<li key='Prev' >
          <button onClick={this.props.onPrevPageChanged.bind(null, this.props.currentPage)}>Prev</button>
        </li>);
      }
      if (this.props.currentPage === i) {
        li.push(<li key={i} className='active'><button>{i}</button></li>);
      }
      else {
        li.push(<li key={i} ><button onClick={this.props.onPageChanged.bind(null, i)}>{i}</button></li>);
      }
      if (i === pageCount) {
        li.push(<li key='Next' >
          <button onClick={this.props.onNextPageChanged.bind(null, this.props.currentPage, pageCount)}>Next</button>
        </li>);
      }
    }
    return (<ul className='pagination'>{li}</ul>);
  }
}

export default PaginationWidget;
