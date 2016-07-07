import React, {PropTypes} from 'react';

import ParentCard from 'containers/ParentCard';
import Loader from 'components/Loader';

import {fetchLayoutData} from 'actions/core';

import { connect } from 'react-redux';
import staticLayout from 'layout';

const styles = {
  content: {
    padding: '33px'
  }
};

class PageContent extends React.Component {
  static propTypes = {
    layout: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  componentDidMount() {
    const {props} = this;
    props.fetchLayoutData(props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    const {props} = this;

    if (props.location.pathname !== nextProps.location.pathname) {
      props.fetchLayoutData(nextProps.location.pathname);
    }
  }

  renderComponent(componentDetails) {
    const elm = React.createFactory(require('components/' + componentDetails.type).default, null);

    const childrenArray = [];

    if (componentDetails.children) {
      const children = componentDetails.children;

      for (let k = 0, childrenLen = children.length; k < childrenLen; k++) {
        const childDetails = children[k];

        childrenArray.push(this.renderComponent(childDetails));
      }
    }

    const componentElm = elm({...componentDetails}, childrenArray);

    if (componentDetails.meta.parentWrap === false) {
      return componentElm;
    }
    else {
      const ParentCardElement = React.createElement(ParentCard, {...componentDetails}, componentElm);
      return ParentCardElement;
    }
  }

  renderChildren() {
    // const {layout} = this.props;
    const {layout} = staticLayout;

    const finalElmements = [];

    for (let i = 0, len = layout.length; i < len; i++) {
      const section = layout[i];

      let children = [];
      for (let j = 0, numberOfColumns = section.length; j < numberOfColumns; j++) {
        let componentDetails = section[j];

        const ParentCardElement = this.renderComponent(componentDetails);

        children.push(ParentCardElement);
      }

      const currentSection = React.DOM.section(
        {
          style: {display: 'flex', marginBottom: '33px', justifyContent: 'space-between'}
        },
        children
      );

      finalElmements.push(currentSection);
    }

    return React.DOM.div({}, finalElmements);
  }

  render() {
    return (
      <div style={styles.content}>
        {
          this.props.isFetching
          ? <Loader />
          : this.renderChildren()
        }
      </div>
    );
  }
}

PageContent.contextTypes = {
  location: PropTypes.object
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
