import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import Header from './PageHeader';
import Sidebar from './Sidebar';
import PageContent from './PageContent';

import { fetchUserData, logout } from 'actions/auth';

import Loader from 'components/Loader';

import 'styles/core.scss';

const styles = {
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
    const {props} = this;
    return (
      <div>
        <Header title='RANK' />
        <Sidebar style={styles.sidebar} />
        <div style={styles.base}>
          {
            (props.auth.isLoading)
            ? <Loader />
            : <PageContent location={props.location} />
          }
        </div>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
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
