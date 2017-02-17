/* eslint-disable no-return-assign */
import React, {PropTypes} from 'react';

import FontIcon from 'material-ui/FontIcon';
import SearchBar from './SearchBar';
import {Colors} from '../../commons/colors';

const styles = {
  header: {
    display: 'flex',
    paddingBottom: '30px'
  },
  title: {
    textTransform: 'capitalize',
    fontSize: '21px',
    whiteSpace: 'nowrap',
    fontWeight: 'normal'
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
  },
  exitWrap: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center'
  },
  backIcon: {
    marginLeft: 0,
    marginRight: '15px'
  }
};

export default class ParentCardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floatingSearchBar: false
    };
    this.loadSearchBar = false;

    this.loadFloatingSearchBar = this.loadFloatingSearchBar.bind(this);
    this.getData = this.getData.bind(this);
  }

  static propTypes = {
    getData: PropTypes.func.isRequired,
    updateSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    history: PropTypes.object,
    attributes: PropTypes.object
  }

  loadFloatingSearchBar(load) {
    this.setState({floatingSearchBar: load});
  }

  getData() {
    this.props.getData();
  }

  render() {
    const {props, state} = this;

    const headerStyle = props.attributes.header || {};

    this.loadSearchBar = (
      props.meta.showSearch &&
      !props.meta.showDetailsIcon &&
      !props.meta.showDetails &&
      !props.showComponentIconFlag) ||
    state.floatingSearchBar === true;

    return <header style={{...styles.header, ...headerStyle.style}}>
      {
        props.meta.showBack === true
        ? <div style={styles.exitWrap} onClick={props.hideDetails}>
          <FontIcon className='material-icons'
            style={{...styles.icon, ...styles.backIcon}}>
              arrow_back
          </FontIcon>
        </div>
        : null
      }
      {
        state.floatingSearchBar === false
        ? <div style={{...headerStyle.titleWrap}}>
          <span style={{...styles.title, ...headerStyle.title}}>
            {props.meta.title}
          </span>
        </div>
        : null
      }

      {
        this.loadSearchBar === true
        ? <SearchBar
          searchText={props.search}
          updateSearch={props.updateSearch}
          floatingSearchBar={state.floatingSearchBar}
          loadFloatingSearchBar={this.loadFloatingSearchBar} />
        : null
      }

      <div style={styles.iconWrap}>
        {
          props.showComponentIconFlag === true && state.floatingSearchBar === false
          ? (
            <FontIcon className='material-icons'
              style={styles.icon}
              onClick={() => this.loadFloatingSearchBar(true)}>
              search
            </FontIcon>
          )
          : null
        }

        {
          props.showComponentIconFlag === true && state.floatingSearchBar === false
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
          (props.showComponentIconFlag === true && state.floatingSearchBar === true)
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

        {
          props.meta.showClose === true
          ? (
            <FontIcon className='material-icons'
              style={styles.icon}
              onClick={props.hideDetails}>
              close
            </FontIcon>
          )
          : null
        }
      </div>
    </header>;
  }
};
