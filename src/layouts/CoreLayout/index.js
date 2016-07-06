import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import Header from './PageHeader';
import Sidebar from './Sidebar';
import PageContent from './PageContent';
import Kibana from 'components/Kibana';

import { fetchUserData, logout } from 'actions/auth';

import Loader from 'components/Loader';
import FontIcon from 'material-ui/FontIcon';
import {Colors} from 'theme/colors';
import 'styles/core.scss';

const styles = {
  kibana: {
    padding: '5px 5px 0 5px',
    position: 'fixed',
    top: '64px',
    left: '72px',
    bottom: 0,
    right: 0
  },
  sidebar: {
    width: '72px'
  },
  base: {
    paddingLeft: '72px',
    paddingTop: '64px',
    boxSizing: 'border-box',
    height: '100%'
  },
  nav: {
    position: 'relative',
    width: '72px'
  },
  handle: {
    position: 'absolute',
    right: '-20px',
    top: '64px',
    backgroundColor: Colors.slider,
    height: '80px',
    lineHeight: '80px',
    width: '20px',
    borderRadius: '0 10px 10px 0',
    textAlign: 'center',
    cursor: 'pointer',
    zIndex: 1300
  },
  icon: {
    fontSize: '16px',
    color: Colors.arctic
  }
};

class CoreLayout extends React.Component {
  static propTypes = {
    fetchUserData: PropTypes.object.isRequired,
    logout: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showKibana: false,
      showFullSidebar: false
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.hideKibana = this.hideKibana.bind(this);
  }

  getChildContext() {
    const that = this;
    return {
      clickThrough(url) {
        that.setState({
          url,
          showKibana: true
        });
      }
    };
  }

  toggleSidebar() {
    this.setState({
      showFullSidebar: !this.state.showFullSidebar
    });
  }

  hideKibana() {
    this.setState({
      showKibana: false
    });
  }

  componentDidMount() {
    this.props.fetchUserData();
  }

  componentWillReceiveProps(nextProps) {
    const {props} = this;

    // if user api returns error redirect to auth page.
    if (nextProps.auth.isError) {
      props.logout();
    }
  }

  render() {
    const {props, state} = this,
      {showKibana} = this.state,
      show = {display: 'block'},
      hide = {display: 'none'},
      sidebarWidth = {width: '72px'};

    let icon = 'keyboard_arrow_right';
    if (state.showFullSidebar) {
      sidebarWidth.width = '200px';
      icon = 'keyboard_arrow_left';
    }

    let contentStyle = Object.assign({}, styles.content, show);

    if (showKibana) {
      contentStyle = Object.assign({}, styles.content, hide);
    }

    return (
      <div>
        <Header
          title='RANK'
          showKibana={showKibana}
          hideKibana={this.hideKibana} />

        <nav style={{...styles.nav, ...sidebarWidth}}>
          <Sidebar style={{...styles.sidebar, ...sidebarWidth}}
            location={props.location} />
          <div style={styles.handle}
            onClick={this.toggleSidebar}>
            <FontIcon className='material-icons' style={styles.icon}>
              {icon}
            </FontIcon>
          </div>
        </nav>

        <div style={styles.base}>
          <div style={contentStyle}>
            {
              (props.auth.isLoading)
              ? <Loader />
              : <PageContent location={props.location} params={props.params} />
            }
          </div>

          {
            showKibana
            ? <div style={styles.kibana}>
              <Kibana url={this.state.url} />
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
};

CoreLayout.childContextTypes = {
  clickThrough: React.PropTypes.func
};

function mapStateToProps(state, ownProps) {
  const {auth} = state;
  return {
    auth
  };
}

export default connect(mapStateToProps, {
  fetchUserData, logout
})(CoreLayout);
