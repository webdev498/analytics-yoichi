import React, {PropTypes} from 'react';
import ParentCard from 'containers/ParentCard';
import Timeline from 'components/Timeline';
import AlertMultiChart from 'components/AlertMultiChart';

const alertActivity = {
  'id': 'alert-activity',
  'type': 'AlertMultiChart',
  'meta': {
    'showHeader': true,
    'title': 'Activity',
    'showRefresh': false,
    'api': {
      'method': 'POST',
      'path': '/api/analytics/reporting/executeById',
      'body': 'data.rank_alert.chartsFilter:fieldName',
      'pathParams': {},
      'queryParams': {
        'window': ''
      }
    }
  },
  'chart': {
    'chartOptions': {
      'xAxisName': 'TIME',
      'divLineThickness': '2',
      'lineThickness': '1',
      'showYAxisValues': '1',
      'xAxisNameFontSize': '10',
      'yAxisNameFontSize': '10',
      'labelFontSize': '8',
      'drawAnchors': '1',
      'anchorRadius': '1',
      'showlegend': '0',
      'outCnvBaseFontSize': '8'
    }
  },
  'attributes': {
    'chart': {
      'chartHeight': '200',
      'chartCaption': {
        'display': 'none'
      }
    },
    'style': {
      'width': '35%',
      'flexDirection': 'column'
    },
    'id': 'activity'
  }
};

const timeline = {
  'tabs': {
    'DETAILS': {
      'primary': {
        'default': {
          'id': 'timeline',
          'type': 'Timeline',
          'meta': {
            'showHeader': true,
            'title': 'Timeline',
            'api': {
              'path': '/api/alert/traffic',
              'pathParams': {},
              'queryParams': {
                'count': 10,
                'from': 0,
                'window': '',
                'date': 'date:pathParam',
                'filter': 'data.rank_alert.trafficFilter:fieldName'
              }
            }
          },
          'attributes': {
            'type': 'traffic',
            'displaySelectedRows': true,
            'noOfEventsPerPage': 10,
            'maxNumbersOnLeftRightPagination': 4,
            'style': {
              'width': '100%',
              'backgroundColor': '#F7F7F9'
            },
            'otherStyles': {
              'flex': {
                'display': 'flex'
              },
              'pagination': {
                'bottom': 0,
                'position': 'absolute'
              }
            },
            'id': 'timeline-component'
          }
        },
        'anomaly': {
          'id': 'timeline',
          'type': 'Timeline',
          'meta': {
            'showHeader': true,
            'title': 'Timeline',
            'api': {
              'path': '/api/anomaly/{alertId}/timeline',
              'pathParams': {
                'alertId': ':pathParam'
              },
              'queryParams': {
                'count': 10,
                'from': 0,
                'window': '',
                'date': 'date:pathParam'
              }
            }
          },
          'chart': {
            'chartOptions': {
              'xAxisName': 'TIME',
              'divLineThickness': '2',
              'lineThickness': '1',
              'showYAxisValues': '1',
              'xAxisNameFontSize': '10',
              'yAxisNameFontSize': '10',
              'labelFontSize': '8',
              'drawAnchors': '1',
              'anchorRadius': '1',
              'showlegend': '0',
              'outCnvBaseFontSize': '8'
            }
          },
          'attributes': {
            'type': 'traffic',
            'displaySelectedRows': true,
            'noOfEventsPerPage': 10,
            'maxNumbersOnLeftRightPagination': 4,
            'style': {
              'width': '100%',
              'backgroundColor': '#F7F7F9'
            },
            'chart': {
              'chartWidth': '400',
              'chartHeight': '200',
              'chartCaption': {
                'display': 'none'
              }
            },
            'otherStyles': {
              'flex': {
                'display': 'flex'
              },
              'pagination': {
                'bottom': 0,
                'position': 'absolute'
              }
            },
            'id': 'timeline-component'
          }
        }
      },
      'secondary': {
        'default': {
        },
        'anomaly': {
          'meta': {
            'showHeader': false,
            'api': {
              'path': '/api/anomaly/{anomalyId}/events',
              'pathParams': {
                'selectedCardId': 'anomalyId'
              },
              'queryParams': {
                'window': '',
                'from': 0,
                'count': 10,
                'date': ''
              }
            },
            'title': ''
          },
          'attributes': {
            'type': 'anomalyEvents',
            'displaySelectedRows': true,
            'noOfEventsPerPage': 10,
            'maxNumbersOnLeftRightPagination': 4,
            'isMainComponent': false,
            'style': {
              'width': '100%',
              'height': '100%',
              'backgroundColor': '#EBEBEF',
              'borderWidth': '8px',
              'borderLeftStyle': 'solid',
              'borderImage': 'linear-gradient(to right, rgba(0, 0, 0, 0), #cbcbd1) 50 100%'
            },
            'otherStyles': {
              'flex': {},
              'pagination': {}
            },
            'id': 'timeline-contextual-menu'
          },
          'timelineType': 'secondary'
        }
      }
    }
  }
};

class AlertDetails extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.alertType = '';
  }

  displayAlertActivity() {
    const {props, props: {data}} = this;
    if (!data) return null;

    if (this.alertType !== 'anomaly') {
      let options = props.options || {},
        meta = Object.assign({}, alertActivity.meta);

      if (data.data.rank_alert.chartsFilter) {
        options = Object.assign(options, {
          body: data.data.rank_alert.chartsFilter
        });
      }
      else {
        meta.api = null;
      }

      return (
        <ParentCard
          id='alert-activity'
          meta={meta}
          params={props.params}
          options={options}
          attributes={alertActivity.attributes}
          chart={alertActivity.chart}>
          <AlertMultiChart />
        </ParentCard>
      );
    }
    return null;
  }

  render() {
    const {props} = this,
      {data} = props;

    if (!data) return null;

    this.alertType = data.data.rank_alert.name === 'anomaly' ? 'anomaly' : 'default';

    if (this.alertType === 'default') {
      timeline.tabs.DETAILS.primary[this.alertType].meta.api.queryParams.filter = data.data.rank_alert.trafficFilter;
    }

    return (
      <div>
        <div style={{
          height: '100%',
          position: 'relative',
          display: 'flex'
        }}>
          {this.displayAlertActivity()}
          <ParentCard
            id='primary-timeline'
            meta={timeline.tabs.DETAILS.primary[this.alertType].meta}
            params={props.params}
            attributes={timeline.tabs.DETAILS.primary[this.alertType].attributes}
            tabs={timeline.tabs}
            timelineType='primary'
            alertType={this.alertType}
            trafficFilter={data.data.rank_alert.trafficFilter}
            chart={timeline.tabs.DETAILS.primary[this.alertType].chart}>
            <Timeline />
          </ParentCard>
        </div>
      </div>
    );
  }
}

AlertDetails.contextTypes = {
  store: React.PropTypes.object
};

export default AlertDetails;
