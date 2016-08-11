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
    // console.log('currentPage:'+this.props.currentPage);
    var li = [];
    var pageCount = this.props.Size;
    for (var i = 1; i <= pageCount; i++) {
      if (i === 1) {
        li.push(<li key='Prev' >
          <a onClick={this.props.onPrevPageChanged.bind(null, this.props.currentPage)}>Prev</a>
        </li>);
      }
      if (this.props.currentPage === i) {
        li.push(<li key={i} className='active'><a>{i}</a></li>);
      }
      else {
        li.push(<li key={i} ><a onClick={this.props.onPageChanged.bind(null, i)}>{i}</a></li>);
      }
      if (i === pageCount) {
        li.push(<li key='Next' >
          <a onClick={this.props.onNextPageChanged.bind(null, this.props.currentPage, pageCount)}>Next</a>
        </li>);
      }
    }
    return (<ul className='pagination'>{li}</ul>);
  }
}

export default PaginationWidget;
