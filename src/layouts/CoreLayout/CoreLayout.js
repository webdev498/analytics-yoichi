import React, { PropTypes } from 'react';

import Header from 'components/PageHeader.component';
import Sidebar from 'components/Sidebar.component';
import FontIcon from 'material-ui/lib/font-icon';

import 'styles/core.scss';

const obj = {
    layout: [
      [
        {
          type: 'MetricsCard.component',
          name: 'MetricsCard',
          attributes: {
            style: {backgroundColor: '#d9534f'}
          },
          children: [{
            type: 'FontIcon',
            content: 'add_alert'
          }]
        },
        {
          type: 'MetricsCard.component',
          name: 'MetricsCard',
          attributes: {
            style: {backgroundColor: '#f0ad4e'}
          },
          children: [{
            type: 'FontIcon',
            content: 'bug_report'
          }]
        },
        {
          type: 'MetricsCard.component',
          name: 'MetricsCard',
          attributes: {
            style: {backgroundColor: '#337ab7'}
          },
          children: [{
            type: 'FontIcon',
            content: 'bug_report'
          }]
        },
        {
          type: 'MetricsCard.component',
          name: 'MetricsCard',
          attributes: {
            style: {backgroundColor: '#5cb85c'}
          },
          children: [{
            type: 'FontIcon',
            content: 'devices_other'
          }]
        }
      ],
      [
        {
          type: 'ParetoChart',
          attributes: {
            style: {width: '50%', marginRight: '20px'},
            id: 'chart1',
            variation: '3d'
          }
        },
        {
          type: 'MSCombiChart',
          attributes: {
            style: {width: '50%'},
            id: 'chart2',
            variation: '3d'
          }
        }
      ]
    ]
  };

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
              grandChildrenArray.push(React.createElement(FontIcon, {className:"material-icons"}, grandChildElm.content));
            }
          }
        }

        const componentElm = elm({...componentDetails.attributes}, grandChildrenArray);
        children.push(componentElm);
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
      <div className="menubar-hoverable header-fixed menubar-visible">
        <Header title="RANK" />
        <Sidebar></Sidebar>
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

export default CoreLayout;
