import React, { PropTypes } from 'react';

import Header from '../NonLoggedLayout/Header.component';
import Sidebar from 'components/Sidebar.component';

import 'styles/core.scss';

class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render () {
    return (
      <div className="menubar-hoverable header-fixed menubar-visible">
        <Header></Header>
        <Sidebar></Sidebar>
        <div id="base">
          <div id="content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
};

export default CoreLayout;
