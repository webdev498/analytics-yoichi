/* eslint-disable no-return-assign */
import React, {PropTypes} from 'react';

import FontIcon from 'material-ui/FontIcon';
import {Colors} from '../../commons/colors';

export default class ParentCardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clearIconStyle: {
        color: 'transparent',
        background: 'transparent'
      },
      showSearchBar: false
    };

    this.styles = {
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
      inputWrapSearchBar: {
        width: '100%',
        margin: '0px -22px',
        marginBottom: '0px'
      },
      searchText: {},
      searchTextDetails: {
        width: '100%'
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
      searchIconDetails: {
        right: '-35px'
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

    this.clearSearchText = this.clearSearchText.bind(this);
    this.hideClearIcon = this.hideClearIcon.bind(this);
    this.showClearIcon = this.showClearIcon.bind(this);
    this.focusSearchText = this.focusSearchText.bind(this);
    this.showSearchBar = this.showSearchBar.bind(this);
    this.getData = this.getData.bind(this);
  }

  static propTypes = {
    getData: PropTypes.func.isRequired,
    updateSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    attributes: PropTypes.object
  }

  clearSearchText(ev) {
    if (this.state.showSearchBar === true) {
      this.setState({showSearchBar: false});
    }
    this.setState({ search: '' });
    this.props.updateSearch({ target: {value: ''} });
  }

  focusSearchText() {
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  }

  hideClearIcon() {
    if (this.state.showSearchBar === false) {
      this.setState({
        clearIconStyle: {
          color: 'transparent',
          background: 'transparent'
        }
      });
    }
  }

  showClearIcon() {
    if (this.state.showSearchBar === false) {
      this.setState({
        clearIconStyle: {
          color: Colors.white,
          background: Colors.grape
        }
      });
    }
  }

  showSearchBar() {
    this.setState({
      showSearchBar: true,
      clearIconStyle: {
        color: Colors.white,
        background: Colors.grape
      }
    });
    this.styles.inputWrap = Object.assign({}, this.styles.inputWrap, this.styles.inputWrapSearchBar);
    this.styles.searchText = Object.assign({}, this.styles.searchText, this.styles.searchTextDetails);
    this.styles.searchIcon = Object.assign({}, this.styles.searchIcon, this.styles.searchIconDetails);
  }

  getData() {
    this.props.getData();
  }

  componentWillReceiveProps(newProps) {
    if (this.myTextInput && newProps.search !== this.myTextInput.value) {
      this.myTextInput.value = newProps.search;
    }
  }

  render() {
    const {props} = this;

    const headerStyle = props.attributes.header || {};

    return <header style={{...this.styles.header, ...headerStyle.style}}>
      {
        this.state.showSearchBar === false
        ? <div>
          <span style={{...this.styles.title, ...headerStyle.title}}>
            {props.meta.title}
          </span>
        </div>
        : null
      }

      {
        (props.meta.showSearch && !props.meta.showDetailsIcon && !props.meta.showDetails &&
        !props.showComponentIconFlag) || this.state.showSearchBar === true
        ? <div style={this.styles.inputWrap}>
          <FontIcon className='material-icons'
            style={{...this.styles.clearIcon, ...this.state.clearIconStyle}}
            ref={(ref) => this.clearIcon = ref}>
            close
          </FontIcon>

          <div style={{...this.styles.clearDiv}} onClick={this.clearSearchText} />

          <input
            id='searchText'
            type='text'
            style={this.styles.searchText}
            className='searchText'
            onChange={props.updateSearch}
            onFocus={this.showClearIcon}
            onBlur={this.hideClearIcon}
            ref={(ref) => this.myTextInput = ref} />

          <FontIcon className='material-icons'
            style={this.styles.searchIcon}
            onClick={this.focusSearchText}>
            search
          </FontIcon>
        </div>
        : null
      }

      <div style={this.styles.iconWrap}>
        {
          props.showComponentIconFlag === true && this.state.showSearchBar === false
          ? (
            <FontIcon className='material-icons'
              style={this.styles.icon}
              onClick={this.showSearchBar}>
              search
            </FontIcon>
          )
          : null
        }

        {
          props.showComponentIconFlag === true && this.state.showSearchBar === false
          ? (
            <FontIcon className='material-icons'
              style={this.styles.icon}
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
              style={{...this.styles.icon, ...this.styles.listIcon}}
              onClick={props.toggleDetailsTable}>
                list
              </FontIcon>
          )
          : null
        }

        {
          props.meta.showRefresh === false ||
          (props.showComponentIconFlag === true && this.state.showSearchBar === true)
          ? null
          : (
            <FontIcon className='material-icons'
              style={this.styles.icon}
              onClick={this.getData}>
              replay
            </FontIcon>
          )
        }

        {
          props.meta.showBackButton === true
          ? (
            <FontIcon className='material-icons'
              style={this.styles.icon}
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
