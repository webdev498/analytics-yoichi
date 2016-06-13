import React, { PropTypes } from 'react';
import Cookies from 'cookies-js';

import { connect } from 'react-redux';
import Header from './PageHeader';
import Sidebar from './Sidebar';
import PageContent from './PageContent';

import {fetchUserData} from 'actions/auth';

import Loader from 'components/Loader.component';

import 'styles/core.scss';

class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserData();
  }

  componentWillReceiveProps(nextProps) {
    const {props} = this;

    // if user api returns error redirect to auth page.
    if(nextProps.auth.isError) {
      // delete the auth cookies
      Cookies('access_token', undefined);
      Cookies('token_type', undefined);

      // redirect to login page
      window.location = "/";
    }
  }

  render () {
    const {props} = this;
    return (
      <div className="menubar-hoverable header-fixed menubar-visible">
        <Header title="RANK" />
        <Sidebar style={{width: '72px'}}></Sidebar>
        <div id="base">
          {
            (props.auth.isLoading) ?
              <Loader /> :
              <PageContent location={props.location} />
          }
        </div>
      </div>
    )
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

export default connect(mapStateToProps, {fetchUserData})(CoreLayout);
