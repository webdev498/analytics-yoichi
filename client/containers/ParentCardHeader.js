import React, {PropTypes} from 'react';

import FontIcon from 'material-ui/FontIcon';
import {Colors} from '../../commons/colors';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '50px'
  },
  title: {
    textTransform: 'capitalize',
    fontSize: '21px',
    whiteSpace: 'nowrap'
  },
  iconWrap: {
    marginLeft: 'auto',
    textAlign: 'right'
  },
  icon: {
    verticalAlign: 'bottom',
    color: Colors.grape
  },
  refreshIcon: {
    cursor: 'pointer',
    fontSize: '20px',
    color: Colors.grape,
    fontWeight: 600,
    height: '35px',
    paddingTop: '7px'
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
    bottom: '5px',
    color: Colors.grape,
    cursor: 'pointer',
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
    margin: 'auto',
    position: 'absolute',
    top: 0,
    background: 'transparent',
    lineHeight: '35px',
    width: '45px',
    textAlign: 'center',
    fontWeight: 600,
    display: 'inline'
  }
};

export default class ParentCardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      clearIconStyle: {
        color: 'transparent',
        background: 'transparent'
      },
      searchTextStyle: {
        paddingLeft: '12px'
      }
    };
  }

  updateSearch() {
    return (event) => {
      this.setState({
        search: event.target.value
      });
    };
  }

  clearSearchText() {
    return (event) => {
      if (this.myTextInput !== null) {
        this.myTextInput.value = '';
      }
      this.setState({
        search: event.target.value
      });
    };
  }

  focusSearchText() {
    return (event) => {
      if (this.myTextInput !== null) {
        this.myTextInput.focus();
      }
    };
  }

  displayClearIcon(display) {
    return (event) => {
      if (display) {
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
      else {
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
    };
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

          <div style={{...styles.clearDiv}}
            onClick={this.clearSearchText()} />

          <input
            id='searchText'
            type='text'
            className='searchText'
            onChange={this.updateSearch()}
            onFocus={this.displayClearIcon(true)}
            onBlur={this.displayClearIcon(false)}
            ref={(ref) => this.myTextInput = ref} />

          <FontIcon className='material-icons'
            style={styles.searchIcon}
            onClick={this.focusSearchText()}>
            search
          </FontIcon>
        </div>
        : null
      }

      {
        props.meta.showRefresh === false
        ? null
        : (
          <div style={styles.iconWrap}>
            <FontIcon className='material-icons'
              style={styles.refreshIcon}
              onClick={this.refreshData}>
              replay
            </FontIcon>
          </div>
        )
      }

      {
        props.meta.showBackButton === true
        ? (
          <div style={styles.iconWrap}>
            <FontIcon className='material-icons'
              style={{...styles.refreshIcon, ...styles.backIcon}}
              onClick={props.goBack()}>
              arrow_back
            </FontIcon>
          </div>
        )
        : null
      }
    </header>;
  }
};
