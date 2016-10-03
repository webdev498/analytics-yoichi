import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './PageHeader';
import Sidebar from './Sidebar';
import PageContent from './PageContent';
import Kibana from 'components/Kibana';

import { fetchUserData, logout } from 'actions/auth';
import { fetchActionsList } from 'actions/actionsList';

import Loader from 'components/Loader';
import {Colors} from 'theme/colors';
import 'styles/core.scss';

const openKibanaInNewWindow = window.global && window.global.openKibanaInNewWindow;

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
    height: '72px',
    lineHeight: '72px',
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

export class CoreLayout extends React.Component {
  static propTypes = {
    fetchUserData: PropTypes.func.isRequired,
    fetchActionsList: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showKibana: false,
      showFullSidebar: false,
      sidebarWidth: {width: '72px'}
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.hideKibana = this.hideKibana.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
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

  mouseOver() {
    this.setState({
      sidebarWidth: {width: '172px'}
    });
  }

  mouseOut() {
    this.setState({
      sidebarWidth: {width: '72px'}
    });
  }

  componentDidMount() {
    this.props.fetchUserData();
    this.props.fetchActionsList();

    this.context.router.listen(() => {
      this.hideKibana();
    });
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
      sidebarWidth = state.sidebarWidth;

    // let icon = 'keyboard_arrow_right';
    // if (state.showFullSidebar) {
    //   sidebarWidth.width = '200px';
    //   icon = 'keyboard_arrow_left';
    // }

    let contentStyle = Object.assign({}, styles.content, show),
      kibanaUrl = '';

    if (showKibana) {
      contentStyle = Object.assign({}, styles.content, hide);
      kibanaUrl = this.state.url;
    }

    return (
      <div>
        <Header
          title='RANK'
          showKibana={showKibana}
          hideKibana={this.hideKibana}
          params={props.params} />

        <nav style={{...styles.nav, ...sidebarWidth}} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Sidebar style={{...styles.sidebar, ...sidebarWidth}}
            location={props.location}
            hideKibana={this.hideKibana} />
        </nav>

        <div style={styles.base}>
          <div style={contentStyle}>
            {
              (props.auth.isLoading)
              ? <Loader />
              : <PageContent location={props.location} params={props.params} history={this.context.router} />
            }
          </div>

          {
            showKibana && openKibanaInNewWindow && kibanaUrl !== ''
            ? window.open(kibanaUrl)
            : null
          }

          {
            showKibana && !openKibanaInNewWindow
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

CoreLayout.childContextTypes = {
  clickThrough: React.PropTypes.func
};

CoreLayout.contextTypes = {
  router: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {auth} = state;
  return {
    auth
  };
}

export default connect(mapStateToProps, {
  fetchUserData, logout, fetchActionsList
})(CoreLayout);
