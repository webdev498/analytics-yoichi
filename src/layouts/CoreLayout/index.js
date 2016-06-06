import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import Header from './PageHeader';
import Sidebar from './Sidebar';
import PageContent from './PageContent';

import {updatedApiData} from 'actions/ParentCard';

import 'styles/core.scss';

class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTimeChange(timeRange) {
    this.props.updatedApiData(timeRange);
  }

  render () {
    return (
      <div className="menubar-hoverable header-fixed menubar-visible">
        <Header title="RANK" handleTimeChange={this.handleTimeChange.bind(this)} />
        <Sidebar style={{width: '72px'}}></Sidebar>
        <div id="base">
          <PageContent />
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
};

export default connect(null, {updatedApiData})(CoreLayout);
