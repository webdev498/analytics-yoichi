import React, {PropTypes} from 'react';

import ParentCard from 'containers/ParentCard';
import Loader from 'components/Loader';

import {fetchLayoutData} from 'actions/core';

import { connect } from 'react-redux';
// import staticLayout from 'layout';

const styles = {
  content: {
    padding: '33px'
  },
  error: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex'
  },
  errorMsg: {
    margin: 'auto'
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

  showError() {
    const {props} = this;
    return (
      <div style={styles.error}>
        <span style={styles.errorMsg}>
          {props.errorData.message}
        </span>
      </div>
    );
  }

  render() {
    const {props} = this;

    return (
      <div style={styles.content}>
        {
          props.isFetching
          ? <Loader />
          : props.isError
            ? this.showError()
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
