import React, {PropTypes} from 'react';

import ParentCard from 'containers/ParentCard';
import Loader from 'components/Loader';

import {fetchLayoutData} from 'actions/core';

import { connect } from 'react-redux';
// import staticLayout from 'layout';

const styles = {
  content: {
    padding: '33px'
  }
};

export class PageContent extends React.Component {
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

    let childrenArray = [];

    if (componentDetails.children) {
      childrenArray = componentDetails.children.map(child => this.renderComponent(child));
    }

    const {props} = this;
    componentDetails.location = props.location;
    componentDetails.params = props.params;
    componentDetails.history = props.history;
    componentDetails.key = componentDetails.id;

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
    const {layout} = this.props;
    // const {layout} = staticLayout;

    const finalElmements = layout.map((section, index) => {
      const children = section.map(component => {
        return this.renderComponent(component);
      });

      return React.DOM.section(
        {
          style: {display: 'flex', marginBottom: '33px', justifyContent: 'space-between'},
          key: `section${index}`
        },
        children
      );
    });

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

function mapStateToProps(state, ownProps) {
  const {layout: layouts} = state;
  let id = ownProps.location.pathname;

  id = (id === '/') ? '/summary-page' : id;

  const { layout = [],
          isFetching = true,
          isError = false,
          errorData = null
        } = layouts.get(id) ? layouts.get(id) : {};

  return {
    layout,
    isFetching,
    isError,
    errorData
  };
}

export default connect(mapStateToProps, {fetchLayoutData})(PageContent);
