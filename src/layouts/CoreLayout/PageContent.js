import React, {PropTypes} from 'react';

import FontIcon from 'material-ui/FontIcon';
import ParentCard from 'containers/ParentCard';
import Loader from 'components/Loader';

import {fetchLayoutData} from 'actions/core';

import { connect } from 'react-redux';
// import staticLayout from 'layout';

const styles = {
  content: {
    padding: '20px'
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

  renderChildren() {
    const {layout} = this.props;
    // const layout = staticLayout.layout;

    const finalElmements = [];

    for (let i = 0, len = layout.length; i < len; i++) {
      const section = layout[i];

      let children = [];
      for (let j = 0, numberOfColumns = section.length; j < numberOfColumns; j++) {
        let componentDetails = section[j];

        const elm = React.createFactory(require('components/' + componentDetails.type).default, null);

        const grandChildrenArray = [];

        if (componentDetails.children) {
          const grandChildren = componentDetails.children;

          for (let k = 0, grandChildrenLen = grandChildren.length; k < grandChildrenLen; k++) {
            const grandChildElm = grandChildren[k];
            if (grandChildElm.type === 'FontIcon') {
              grandChildrenArray.push(React.createElement(FontIcon,
                           {className: 'material-icons'}, grandChildElm.content));
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
