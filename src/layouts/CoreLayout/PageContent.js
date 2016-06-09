import React, { PropTypes } from 'react';

import FontIcon from 'material-ui/FontIcon';
import ParentCard from 'containers/ParentCard';
import Loader from 'components/Loader.component';

import {fetchLayoutData} from 'actions/core';

import { connect } from 'react-redux';

class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  componentDidMount() {
    this.props.fetchLayoutData(this.props.location.pathname);
  }

  renderChildren() {
    const {layout} = this.props;
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
              grandChildrenArray.push(React.createElement(FontIcon,
                           {className:'material-icons'}, grandChildElm.content));
            }

            if (componentDetails.name === 'Compound') {
              const elmSub = React.createFactory(require('components/' + grandChildElm.type).default);
              const componentElmSub = elmSub({...grandChildElm}, []);
              grandChildrenArray.push(componentElmSub);
            }
          }
        }

        const componentElm = elm({...componentDetails.attributes}, grandChildrenArray);
        const ParentCardElement = React.createElement(ParentCard, {...componentDetails}, componentElm);

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

  render () {
    return (
      <div id="content" style={{padding: '20px'}}>
        {
          this.props.isFetching ?
          <Loader /> :
          this.renderChildren()
        }
      </div>
    )
  }
}

PageContent.contextTypes = {
  location: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {layout: layouts} = state;
  const id = ownProps.location.pathname;

  const { layout = [],
          isFetching = true,
          isError = false,
          errorData = null
        } = layouts.get(id) ? layouts.get(id).toObject() : {};

  return {
    layout,
    isFetching,
    isError,
    errorData
  };
}

export default connect(mapStateToProps, {fetchLayoutData})(PageContent);