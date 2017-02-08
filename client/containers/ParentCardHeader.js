/* eslint-disable no-return-assign */
import React, {PropTypes} from 'react';

import FontIcon from 'material-ui/FontIcon';
import SearchBar from './SearchBar';
import {Colors} from '../../commons/colors';

const styles = {
  header: {
    display: 'flex',
    paddingBottom: '33px'
  },
  title: {
    textTransform: 'capitalize',
    fontSize: '21px',
    whiteSpace: 'nowrap'
  },
  iconWrap: {
    marginLeft: 'auto',
    textAlign: 'right',
    display: 'inline-flex',
    alignItems: 'center'
  },
  icon: {
    color: Colors.grape,
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 600,
    marginLeft: '10px'
  },
  listIcon: {
    fontSize: '26px'
  },
  crossIcon: {
    fontSize: '20px'
  },
  inputWrap: {
    margin: '0 20px',
    width: '85%',
    textAlign: 'right',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle'
  }
};

export default class ParentCardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchBar: false
    };
    this.searchBar = false;

    this.loadSearchBar = this.loadSearchBar.bind(this);
    this.getData = this.getData.bind(this);
  }

  static propTypes = {
    getData: PropTypes.func.isRequired,
    updateSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    history: PropTypes.object,
    attributes: PropTypes.object
  }

  loadSearchBar(load) {
    if (load !== false) {
      load = true;
    }
    this.setState({showSearchBar: load});
  }

  getData() {
    this.props.getData();
  }

  render() {
    const {props, state} = this;

    const headerStyle = props.attributes.header || {};

    this.searchBar = (props.meta.showSearch && !props.meta.showDetailsIcon && !props.meta.showDetails &&
        !props.showComponentIconFlag) || state.showSearchBar === true;

    return <header style={{...styles.header, ...headerStyle.style}}>
      {
        state.showSearchBar === false
        ? <div>
          <span style={{...styles.title, ...headerStyle.title}}>
            {props.meta.title}
          </span>
        </div>
        : null
      }

      {
        this.searchBar === true
        ? <SearchBar
          search={props.search}
          updateSearch={props.updateSearch}
          showSearchBar={state.showSearchBar}
          loadSearchBar={this.loadSearchBar} />
        : null
      }

      <div style={styles.iconWrap}>
        {
          props.showComponentIconFlag === true && state.showSearchBar === false
          ? (
            <FontIcon className='material-icons'
              style={styles.icon}
              onClick={this.loadSearchBar}>
              search
            </FontIcon>
          )
          : null
        }

        {
          props.showComponentIconFlag === true && state.showSearchBar === false
          ? (
            <FontIcon className='material-icons'
              style={styles.icon}
              onClick={props.toggleDetailsTable}>
              equalizer
            </FontIcon>
          )
          : null
        }

        {
          props.meta.showDetailsIcon === true && props.showComponentIconFlag === false
          ? (
            <FontIcon className='material-icons'
              style={{...styles.icon, ...styles.listIcon}}
              onClick={props.toggleDetailsTable}>
                list
              </FontIcon>
          )
          : null
        }

        {
          props.meta.showRefresh === false ||
          (props.showComponentIconFlag === true && state.showSearchBar === true)
          ? null
          : (
            <FontIcon className='material-icons'
              style={styles.icon}
              onClick={this.getData}>
              replay
            </FontIcon>
          )
        }

        {
          props.meta.showBackButton === true
          ? (
            <FontIcon className='material-icons'
              style={styles.icon}
              onClick={props.history.goBack}>
              arrow_back
            </FontIcon>
          )
          : null
        }
      </div>
    </header>;
  }
};
