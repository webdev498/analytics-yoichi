import React, { PropTypes } from 'react';

import Header from 'components/PageHeader.component';
import Sidebar from 'components/Sidebar.component';
import FontIcon from 'material-ui/lib/font-icon';

import ParentCard from 'containers/ParentCard';

import 'styles/core.scss';

const obj = {
    layout: [
      [
        {
          type: 'MetricsCard.component',
          meta: {
            showHeader: false,
            api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_alert_count_time_shifted?window=1d&timeShift=1d'
          },
          name: 'MetricsCard',
          attributes: {
            style: {backgroundColor: '#d9534f'},
            title: 'High Priority Alerts'
          },
          children: [{
            type: 'FontIcon',
            content: 'add_alert'
          }]
        },
        {
          type: 'MetricsCard.component',
          meta: {
            showHeader: false,
            api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_malware_count_time_shifted?window=1d&timeShift=1d'
          },
          name: 'MetricsCard',
          attributes: {
            style: {backgroundColor: '#f0ad4e'},
            title: 'High Priority Malware'
          },
          children: [{
            type: 'FontIcon',
            content: 'bug_report'
          }]
        },
        {
          type: 'MetricsCard.component',
          meta: {
            showHeader: false,
            api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_event_count_time_shifted?window=1d&timeShift=1d'
          },
          name: 'MetricsCard',
          attributes: {
            style: {backgroundColor: '#337ab7'},
            title: 'Events Processed'
          },
          children: [{
            type: 'FontIcon',
            content: 'bug_report'
          }]
        },
        {
          type: 'MetricsCard.component',
          meta: {
            showHeader: false,
            api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_asset_count_time_shifted?window=1d&timeShift=1d'
          },
          name: 'MetricsCard',
          attributes: {
            style: {backgroundColor: '#5cb85c'},
            title: 'Assets Monitored'
          },
          children: [{
            type: 'FontIcon',
            content: 'devices_other'
          }]
        }
      ],
      [
        {
          type: 'Table.component',
          meta: {
            showHeader: true,
            api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_alert_highpriority?window=1d&count=200',
            title: 'Recent Alerts',
          },
          name: 'Table',
          attributes: {
            style: {width: '100%'},
            sortable:['Rank Score','Date','Details', 'Source', 'Destination'],
            defaultSort:{column: 'Rank Score', direction: 'desc'},
            filterable:['Date', 'Details', 'Source', 'Destination'],
            filterBy:""
          },
          columns: [
            {
              type: 'chart',
              columnName: 'Rank Score',
              data : {
                chartType: 'angulargauge',
                chartId: 'recentAlert',
                chartWidth: '70',
                chartHeight: '60',
                chartValue: [0,'data','rank_alert','score']
              },
              style: {width: '10%'}
            },
            {
              type: 'text',
              columnName: 'Date',
              data: [
                {
                  fieldName: "date",
                  fieldValue: [0,'date']
                }
              ],
              style: {width: '20%'}
            },
            {
              type: 'text',
              columnName: 'Details',
              data: [
                {
                  fieldValue: [0,'data','rank_alert','description'],
                  style: 'bold'
                },
                {
                  fieldValue: [0,'data','rank_alert','message']
                }
              ],
              style: {width: '30%'}
            },
            {
              type: 'text',
              columnName: 'Source',
              data: [
                {
                  fieldName: "IP",
                  fieldValue: [0,'source','ip']
                },
                {
                  fieldName: "port",
                  fieldValue: [0,'source','port']
                },
                {
                  fieldName: "countryFlag",
                  fieldValue: [0,'source','country']
                },
                {
                  fieldName: "User",
                  fieldValue: [0,'source','additionalInfo','user']
                },
                {
                  fieldName: "Machine",
                  fieldValue: [0,'source','additionalInfo','machine']
                }
              ],
              style: {width: '20%'}
            },
            {
              type: 'text',
              columnName: 'Destination',
              data: [
                {
                  fieldName: "IP",
                  fieldValue: [0,'destination','ip']
                },
                {
                  fieldName: "port",
                  fieldValue: [0,'destination','port']
                },
                {
                  fieldName: "countryFlag",
                  fieldValue: [0,'destination','country']
                },
                {
                  fieldName: "User",
                  fieldValue: [0,'destination','additionalInfo','user']
                },
                {
                  fieldName: "Machine",
                  fieldValue: [0,'destination','additionalInfo','machine']
                }
              ],
              style: {width: '20%'}
            }
          ]
        }
      ],
      [
        {
          type: 'ParetoChart',
          meta: {
            showHeader: true,
            api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_threat_trend?window=1h',
            title: 'Alert by type',
          },
          attributes: {
            style: {width: '50%', marginRight: '20px'},
            id: 'chart1',
            variation: '3d'
          }
        }/*,
        {
          type: 'MSCombiChart',
          meta: {
            showHeader: true,
            api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_alert_priority_time?window=1h',
            title: 'Alert priority'
          },
          attributes: {
            style: {width: '50%'},
            id: 'chart2',
            variation: '3d'
          }
        }*/
      ],
      [
        {
          type: 'WorldMap',
          meta: {
            showHeader: true,
            apis: [
              'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_dest_countries?window=1h',
              'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_dest_countries?window=1h&filter=source.reputation OR destination.reputation'
              ],
            title: 'Outgoing Traffic Heatmap',
          },
          attributes: {
            style: {width: '50%', marginRight: '20px'},
            id: ['OutgoingTrafficHeatmap','OutgoingTopCountries','OutgoingTopBandwidthCountries'],
            variation: '3d',
            mapType: 'Outgoing'
          }
        },
        {
          type: 'WorldMap',
          meta: {
            showHeader: true,
            apis: [
              'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_source_countries?window=1h',
              'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_source_countries?window=1h&filter=source.reputation OR destination.reputation'
              ],
            title: 'Incoming Traffic Heatmap',
          },
          attributes: {
            style: {width: '50%', marginRight: '20px'},
            id: ['IncomingTrafficHeatmap','IncomingTopCountries','IncomingTopBandwidthCountries'],
            variation: '3d',
            mapType: 'Incoming'
          }
        }
      ],
      [
        {
          type: 'Table.component',
          meta: {
            showHeader: true,
            api: 'https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_top_longest_connections?window=1h',
            title: 'Longest Connections',
          },
          name: 'Table',
          attributes: {
            style: {width: '100%'},
            sortable:['End Date','Duration','Details', 'Source', 'Destination'],
            defaultSort:{column: 'Duration', direction: 'asc'},
            filterable:['End Date', 'Details', 'Source', 'Destination'],
            filterBy:""
          },
          columns: [
            {
              type: 'text',
              columnName: 'End Date',
              data: [
                {
                  fieldName: "date",
                  fieldValue: [0]
                }
              ],
              style: {width: '20%'}
            },
            {
              type: 'text',
              columnName: 'Duration',
              data: [
                {
                  fieldName: "duration",
                  fieldValue: [1]
                }
              ],
              style: {width: '20%'}
            },
            {
              type: 'text',
              columnName: 'Details',
              data: [
                {
                  fieldValue: [2]
                },
                {
                  fieldName: "Incoming bytes",
                  fieldValue: [17]
                },
                {
                  fieldName: "Outcoming bytes",
                  fieldValue: [18]
                }
              ],
              style: {width: '30%'}
            },
            {
              type: 'text',
              columnName: 'Source',
              data: [
                {
                  fieldName: "IP",
                  fieldValue: [3]
                },
                {
                  fieldName: "port",
                  fieldValue: [4]
                },
                {
                  fieldName: "countryFlag",
                  fieldValue: [8]
                },
                {
                  fieldName: "User",
                  fieldValue: [6]
                },
                {
                  fieldName: "Machine",
                  fieldValue: [5]
                },
                {
                  fieldName: "Owner",
                  fieldValue: [7]
                },
                {
                  fieldName: "ASN",
                  fieldValue: [9]
                }
              ],
              style: {width: '20%'}
            },
            {
              type: 'text',
              columnName: 'Destination',
              data: [
                {
                  fieldName: "IP",
                  fieldValue: [10]
                },
                {
                  fieldName: "port",
                  fieldValue: [11]
                },
                {
                  fieldName: "countryFlag",
                  fieldValue: [15]
                },
                {
                  fieldName: "User",
                  fieldValue: [13]
                },
                {
                  fieldName: "Machine",
                  fieldValue: [12]
                },
                {
                  fieldName: "Owner",
                  fieldValue: [14]
                },
                {
                  fieldName: "ASN",
                  fieldValue: [16]
                }
              ],
              style: {width: '20%'}
            }
          ]
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
      <div className="menubar-hoverable header-fixed menubar-visible">
        <Header title="RANK" />
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

export default CoreLayout;
