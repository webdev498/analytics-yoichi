import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import Header from './PageHeader';
import Sidebar from './Sidebar';
import PageContent from './PageContent';

import {fetchUserData} from 'actions/auth';

import 'styles/core.scss';

class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserData();
  }

  render () {
    const {props} = this;
    return (
      <div className="menubar-hoverable header-fixed menubar-visible">
        <Header title="RANK" />
        <Sidebar style={{width: '72px'}}></Sidebar>
        <div id="base">
          {
            (props.isLoading || props.isError) ?
              "" :
              <PageContent />
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
