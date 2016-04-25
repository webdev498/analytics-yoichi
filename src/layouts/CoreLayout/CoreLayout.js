import React, { PropTypes } from 'react';
import Header from '../NonLoggedLayout/Header.component';

// import '../../styles/core.scss';


// CoreLayout.propTypes = {
//   children: PropTypes.element
// };


class CoreLayout extends React.Component {
  render () {
    return (
    <div className="menubar-hoverable header-fixed menubar-visible">
      <Header></Header>
      <div id="base">
        <div id="content">
          {this.props.children}
        </div>

{/*
        <div id="menubar" className="menubar-inverse  animate">
          <div className="menubar-fixed-panel">
            <div>
              <a className="btn btn-icon-toggle btn-default menubar-toggle" data-toggle="menubar">
                <i className="fa fa-bars"></i>
              </a>
            </div>
            <div className="expanded">
              <a href="http://www.codecovers.eu/materialadmin/dashboards/dashboard">
                <span className="text-lg text-bold text-primary ">MATERIAL&nbsp;ADMIN</span>
              </a>
            </div>
          </div>

          <div className="nano" style={{height: '315px'}}>
            <div className="nano-content" tabIndex="0">
              <div className="menubar-scroll-panel" style={{paddingBottom: '33px'}}>
                <ul id="main-menu" className="gui-controls">
                  <li className="active expanding">
                    <a className="active">
                      <div className="gui-icon"><i className="md md-home"></i></div>
                      <span className="title">Dashboard</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
*/}

      </div>
    </div>
    )
  }
}

export default CoreLayout;
