import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import Header from 'components/PageHeader.component';
import Sidebar from 'components/Sidebar.component';
import FontIcon from 'material-ui/lib/font-icon';

import ParentCard from 'containers/ParentCard';

import obj from 'layout';

import {updatedApiData} from 'actions/ParentCard.actions';

import 'styles/core.scss';

class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  renderChildren() {
    const layout = obj.layout;

    const finalElmements = [];

    for(let i = 0, len = layout.length; i < len; i++) {
      const section = layout[i];

      let children = [];
      for(let j = 0, numberOfColumns = section.length; j < numberOfColumns; j++) {
        let componentDetails = section[j];

        const elm = React.createFactory(require('components/' + componentDetails.type).default,);

        const grandChildrenArray = [];

        if(componentDetails.children) {
          const grandChildren = componentDetails.children;

          for(let k = 0, grandChildrenLen = grandChildren.length; k < grandChildrenLen; k++) {
            const grandChildElm = grandChildren[k];
            if(grandChildElm.type === 'FontIcon') {
              grandChildrenArray.push(React.createElement(FontIcon, {className:'material-icons'}, grandChildElm.content));
            }
          }
        }

        const componentElm = elm({...componentDetails.attributes}, grandChildrenArray);

        const ParentCardElement = React.createElement(ParentCard, {...componentDetails, key: componentDetails.id}, componentElm);

        children.push(ParentCardElement);
      }

      const currentSection = React.DOM.section(
        {
          style: {display: 'flex', marginBottom: '20px', justifyContent: 'space-between'}
        },
        children
      );

      finalElmements.push(currentSection);
    }

    return React.DOM.div({}, finalElmements);
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
          <div id="content" style={{padding: '20px'}}>
            {this.renderChildren()}
          </div>
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
};

ParentCard.contextTypes = {
  store: React.PropTypes.object
}

export default connect(null, {updatedApiData})(CoreLayout);