import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {fetchSearchData} from 'actions/core';
import FontIcon from 'material-ui/FontIcon';

import AssetWidget from 'components/AssetWidget';
import Loader from 'components/Loader';

import {Colors} from 'theme/colors';

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const styles = {
  wrap: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(200, 200, 200, 0.7)',
    top: 0,
    bottom: 0
  },
  searchWrap: {
    display: 'flex',
    backgroundColor: Colors.pebble
  },
  textField: {
    margin: 0,
    border: '1px solid'
  },
  search: {
    display: 'block',
    backgroundColor: 'transparent',
    border: 0,
    outline: 0,
    width: '100%',
    color: Colors.turquoise
  },
  icon: {
    color: Colors.navigation,
    display: 'block',
    height: '72px',
    lineHeight: '72px',
    margin: '0 30px',
    textAlign: 'center',
    cursor: 'pointer'
  },
  results: {
    position: 'relative',
    backgroundColor: Colors.arctic,
    margin: '30px 50px',
    padding: '30px',
    minHeight: '300px'
  },
  error: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: 'center',
    padding: '30px'
  }
};

export class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      showLoader: false,
      isError: false,
      errorMessage: ''
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  clear = () => {
    this.refs.searchInput.value = '';
    this.setState({data: []});
  };

  search = (evt) => {
    const {refs, props} = this;
    let query = refs.searchInput.value;

    if (query.length < 2) return;

    this.setState({showLoader: true, isError: false});
    debounce(fetchSearchData(props.auth, query)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else {
          throw new Error({message: 'Error in search'});
        }
      })
      .then(json => {
        this.setState({showLoader: false, isError: false});
        this.setState({data: json.rows});
      })
      .catch(ex => {
        this.setState({showLoader: false});
        this.setState({isError: true, errorMessage: 'Error in search'});
      }), 200);
  }

  getResults() {
    const {state} = this;
    return state.data.map((item, index) => {
      return (
        <AssetWidget
          headingStyle={{textTransform: 'none'}}
          data={item[0]}
          key={`asset${index}`}
          link />
      );
    });
  }

  getErrorMessage() {
    return (
      <div style={styles.error}>
        {this.state.errorMessage}
      </div>
    );
  }

  render() {
    const {props, state} = this;
    return (
      <div style={styles.wrap}>
        <div style={styles.searchWrap}>
          <FontIcon style={styles.icon} className='material-icons' onClick={props.toggleSearch}>
            arrow_back
          </FontIcon>

          <input ref='searchInput'
            placeholder='Search Assets'
            style={styles.search}
            onKeyPress={this.search} />

          <FontIcon style={styles.icon} className='material-icons' onClick={this.clear}>clear</FontIcon>
        </div>
        <div style={styles.results}>
          {state.showLoader ? <Loader /> : null}
          {state.isError ? this.getErrorMessage() : null}
          {this.getResults()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {auth} = state;

  return {
    auth
  };
}

export default connect(mapStateToProps, {})(Search);
