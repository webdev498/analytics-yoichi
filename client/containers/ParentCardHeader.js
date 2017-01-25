/* eslint-disable no-return-assign */
import React, {PropTypes} from 'react';

import FontIcon from 'material-ui/FontIcon';
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
  },
  searchIcon: {
    color: Colors.grape,
    cursor: 'pointer',
    bottom: '5px',
    fontSize: '21px',
    height: '14px',
    margin: 'auto',
    position: 'absolute',
    right: '12px',
    top: 0,
    fontWeight: 500
  },
  clearIcon: {
    color: Colors.white,
    cursor: 'initial',
    fontSize: '21px',
    height: '35px',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    background: Colors.grape,
    lineHeight: '35px',
    width: '45px',
    textAlign: 'center',
    fontWeight: 600
  },
  clearDiv: {
    color: 'transparent',
    cursor: 'initial',
    fontSize: '21px',
    height: '35px',
    lineHeight: '35px',
    width: '45px',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    background: 'transparent',
    textAlign: 'center',
    fontWeight: 600,
    display: 'inline'
  }
};

export default class ParentCardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clearIconStyle: {
        color: 'transparent',
        background: 'transparent'
      },
      searchTextStyle: {
        paddingLeft: '12px'
      }
    };

    this.clearSearchText = this.clearSearchText.bind(this);
    this.hideClearIcon = this.hideClearIcon.bind(this);
    this.showClearIcon = this.showClearIcon.bind(this);
    this.focusSearchText = this.focusSearchText.bind(this);
  }

  static propTypes = {
    getData: PropTypes.func.isRequired,
    updateSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    attributes: PropTypes.object
  }

  clearSearchText(ev) {
    this.setState({ search: '' });
    this.props.updateSearch({ target: {value: ''} });
  }

  focusSearchText() {
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  }

  hideClearIcon() {
    this.setState({
      clearIconStyle: {
        color: 'transparent',
        background: 'transparent'
      },
      searchTextStyle: {
        paddingLeft: '12px'
      }
    });
  }

  showClearIcon() {
    this.setState({
      clearIconStyle: {
        color: Colors.white,
        background: Colors.grape
      },
      searchTextStyle: {
        paddingLeft: '53px'
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.myTextInput && newProps.search !== this.myTextInput.value) {
      this.myTextInput.value = newProps.search;
    }
  }

  render() {
    const {props} = this;

    const headerStyle = props.attributes.header || {};

    return <header style={{...styles.header, ...headerStyle.style}}>
      <div>
        <span style={{...styles.title, ...headerStyle.title}}>
          {props.meta.title}
        </span>
      </div>

      {
        props.meta.showSearch
        ? <div style={styles.inputWrap}>
          <FontIcon className='material-icons'
            style={{...styles.clearIcon, ...this.state.clearIconStyle}}
            ref={(ref) => this.clearIcon = ref}>
            close
          </FontIcon>

          <div style={{...styles.clearDiv}} onClick={this.clearSearchText} />

          <input
            id='searchText'
            type='text'
            className='searchText'
            onChange={props.updateSearch}
            onFocus={this.showClearIcon}
            onBlur={this.hideClearIcon}
            ref={(ref) => this.myTextInput = ref} />

          <FontIcon className='material-icons'
            style={styles.searchIcon}
            onClick={this.focusSearchText}>
            search
          </FontIcon>
        </div>
        : null
      }

      <div style={styles.iconWrap}>
        {
          props.showComponentIconFlag === true
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
          props.meta.showTable === true && props.showComponentIconFlag === false
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
          props.meta.showRefresh === false
          ? null
          : (
            <FontIcon className='material-icons'
              style={styles.icon}
              onClick={props.getData}>
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
