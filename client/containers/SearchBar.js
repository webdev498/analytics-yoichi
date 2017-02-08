import React, {PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Colors} from '../../commons/colors';

const styles = {
  inputWrap: {
    margin: '0 20px',
    width: '85%',
    textAlign: 'right',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle'
  },
  inputWrapDetails: {
    width: '100%',
    margin: '0px -22px',
    marginBottom: '0px'
  },
  searchText: {
    width: '50%',
    background: Colors.subHeadingBG,
    border: '0px',
    height: '35px',
    paddingLeft: '12px',
    paddingRight: '40px',
    fontSize: '13px',
    marginLeft: '46px'
  },
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
    marginLeft: '-17px',
    position: 'absolute',
    top: 0,
    background: 'transparent',
    textAlign: 'center',
    fontWeight: 600,
    display: 'inline'
  }
};

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      inputWrap: styles.inputWrap,
      searchText: styles.searchText,
      searchIcon: styles.searchIcon,
      clearIcon: {
        color: 'transparent',
        background: 'transparent'
      }
    };

    this.state = {showClearIcon: false};

    this.clearSearchText = this.clearSearchText.bind(this);
    this.hideClearIcon = this.hideClearIcon.bind(this);
    this.showClearIcon = this.showClearIcon.bind(this);
    this.focusSearchText = this.focusSearchText.bind(this);
  }

  static propTypes = {
    updateSearch: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    loadFloatingSearchBar: PropTypes.func.isRequired
  }

  componentWillReceiveProps(newProps) {
    if (this.myTextInput && newProps.searchText !== this.myTextInput.value) {
      this.myTextInput.value = newProps.searchText;
    }
  }

  clearSearchText() {
    const {props} = this;
    if (props.floatingSearchBar === true) {
      props.loadFloatingSearchBar(false);
    }
    this.props.updateSearch({ target: {value: ''} });
  }

  focusSearchText() {
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  }

  hideClearIcon() {
    const {props} = this;
    if (props.floatingSearchBar === false) {
      this.styles.clearIcon = {
        color: 'transparent',
        background: 'transparent'
      };
      this.setState({showClearIcon: false});
    }
  }

  showClearIcon() {
    const {props} = this;
    if (props.floatingSearchBar === false) {
      this.styles.clearIcon = {
        color: Colors.white,
        background: Colors.grape
      };
      this.setState({showClearIcon: true});
    }
  }

  render() {
    const {props} = this;
    if (props.floatingSearchBar === true) {
      this.styles = {
        inputWrap: Object.assign({}, styles.inputWrap, styles.inputWrapDetails),
        searchText: Object.assign({}, styles.searchText, styles.searchTextDetails),
        searchIcon: Object.assign({}, styles.searchIcon, styles.searchIconDetails),
        clearIcon: {
          color: Colors.white,
          background: Colors.grape
        }
      };
      this.state.showClearIcon = true;
    }

    return <div style={this.styles.inputWrap}>
      {
        this.state.showClearIcon === true || this.state.showClearIcon === false
        ? <div style={{...styles.clearDiv}} onClick={this.clearSearchText}>
          <FontIcon className='material-icons'
            style={{...styles.clearIcon, ...this.styles.clearIcon}}
            ref={(ref) => this.clearIcon = ref}>
            close
          </FontIcon>
        </div>
        : null
      }

      <input
        id='searchText'
        type='text'
        style={this.styles.searchText}
        className='searchText'
        onChange={props.updateSearch}
        onFocus={this.showClearIcon}
        onBlur={this.hideClearIcon}
        ref={(ref) => this.myTextInput = ref}
        autoFocus={props.floatingSearchBar} />

      <FontIcon className='material-icons'
        style={this.styles.searchIcon}
        onClick={this.focusSearchText}>
        search
      </FontIcon>
    </div>;
  }
};
