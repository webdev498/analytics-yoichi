import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import Header from './PageHeader';
import Sidebar from './Sidebar';
import PageContent from './PageContent';
import Kibana from 'components/Kibana';

import { fetchUserData, logout } from 'actions/auth';

import Loader from 'components/Loader';

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
  }
};

class CoreLayout extends React.Component {
  static propTypes = {
    fetchUserData: PropTypes.object.isRequired,
    logout: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {showKibana: false};
  }

  getChildContext() {
    const that = this;
    return {
      clickThrough(data) {
        that.setState({
          data,
          showKibana: true
        });
      }
    };
  }

  hideKibana() {
    const that = this;
    return () => {
      that.setState({
        showKibana: false
      });
    };
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
    const {props} = this,
      {showKibana} = this.state,
      show = {display: 'block'},
      hide = {display: 'none'};

    let contentStyle = Object.assign({}, styles.content, show);

    if (showKibana) {
      contentStyle = Object.assign({}, styles.content, hide);
    }

    return (
      <div>
        <Header
          title='RANK'
          showKibana={showKibana}
          hideKibana={this.hideKibana()} />

        <Sidebar style={styles.sidebar} />
        <div style={styles.base}>
          <div style={contentStyle}>
            {
              (props.auth.isLoading)
              ? <Loader />
              : <PageContent location={props.location} />
            }
          </div>

          {
            showKibana
            ? <div style={styles.kibana}>
              <Kibana data={this.state.data} />
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
