import React, { PropTypes } from 'react';

import FontIcon from 'material-ui/FontIcon';
import ParentCard from 'containers/ParentCard';
import Loader from 'components/Loader';
import Kibana from 'components/Kibana';

import {fetchLayoutData} from 'actions/core';

import { connect } from 'react-redux';

const styles = {
  kibana: {
    padding: '5px 5px 0 5px',
    position: 'fixed',
    top: '64px',
    left: '72px',
    bottom: 0,
    right: 0
  },
  content: {
    padding: '20px'
  }
}

class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showKibana: false};
  }

  getChildContext() {
    const that = this;
    return {
      clickThrough() {
        that.setState({
          showKibana: true
        })
      }
    };
  }

  componentDidMount() {
    const {props} = this;
    props.fetchLayoutData(props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    const {props} = this;

    if(props.location.pathname !== nextProps.location.pathname) {
      props.fetchLayoutData(nextProps.location.pathname);
    }
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
    const {showKibana} = this.state;

    const show = {display: 'block'},
          hide = {display: 'none'};

    let contentStyle = styles.content,
        kibanaStyle = styles.kibana;

    if(showKibana) {
      contentStyle = Object.assign({}, contentStyle, hide);
      kibanaStyle = Object.assign({}, kibanaStyle, show);
    }
    else {
      contentStyle = Object.assign({}, contentStyle, show);
      kibanaStyle = Object.assign({}, kibanaStyle, hide);
    }

    return (
      <div>
        <div style={contentStyle}>
          {
            this.props.isFetching ?
            <Loader /> :
            this.renderChildren()
          }
        </div>

        <div style={kibanaStyle}>
          <Kibana src='https://demo.ranksoftwareinc.com/api/kibana/query/alerts-score?lowScore=36&highScore=64&from=2016-06-14T07:00:00.000&to=2016-06-14T07:05:00.000'/>
        </div>
      </div>
    )
  }
}

PageContent.contextTypes = {
  location: React.PropTypes.object
};

PageContent.childContextTypes = {
  clickThrough: React.PropTypes.func
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