import React, {PropTypes} from 'react';
import ParentCard from 'containers/ParentCard';

const userCharts = [
  {
    'chartOptions': {
      'paletteColors': '#60E2DC, #C9EDDF',
      'xAxisName': 'Machines',
      'divLineThickness': '2',
      'showYAxisValues': '1',
      'xAxisNameFontSize': '10',
      'yAxisNameFontSize': '10',
      'labelFontSize': '8',
      'drawAnchors': '1',
      'anchorRadius': '1',
      'showlegend': '0',
      'outCnvBaseFontSize': '8'
    },
    'chartData': {
      'fieldMapping': [
        {
          'columns': [ {
            name: 'destination.name'
          } ],
          'axis': 'x'
        },
        {
          'seriesname': 'Current Logins',
          'reportId': 'taf_asset_successful_logins_by_user_on_machines_time_shifted',
          'columns': [ {
            name: 'count',
            key: 0
          } ],
          'axis': 'y'
        },
        {
          'seriesname': 'Historic Logins',
          'reportId': 'taf_asset_successful_logins_by_user_on_machines_time_shifted',
          'columns': [ {
            name: 'count',
            key: 1
          } ],
          'axis': 'y'
        }
      ]
    },
    'meta': {
      'showHeader': true,
      'showRefresh': false,
      'api': {
        'path': '/api/analytics/reporting/execute/{reportId}',
        'pathParams': {
          'reportId': 'taf_asset_successful_logins_by_user_on_machines_time_shifted'
        },
        'queryParams': {
          'window': '',
          'timeShift': '',
          'asset': 'assetId:pathParam'
        }
      },
      'title': 'Successful Logins'
    },
    'attributes': {
      'chartHeight': '200',
      'chartCaption': {
        'display': 'none'
      },
      'style': {
        'width': '100%',
        'minHeight': '100px',
        'padding': 0,
        'boxShadow': 'none',
        'marginBottom': '35px'
      },
      'header': {
        'style': {
          'paddingBottom': 0
        },
        'title': {
          'fontSize': '13px',
          'fontWeight': 600,
          'textTransform': 'capitalize'
        }
      },
      'id': 'success-login-count-chart'
    },
    'id': 'success-login-count',
    'type': 'MultiSeriesColumn2d'
  },
  {
    'chartOptions': {
      'paletteColors': '#60E2DC, #C9EDDF',
      'xAxisName': 'Machines',
      'divLineThickness': '2',
      'showYAxisValues': '1',
      'xAxisNameFontSize': '10',
      'yAxisNameFontSize': '10',
      'labelFontSize': '8',
      'drawAnchors': '1',
      'anchorRadius': '1',
      'showlegend': '0',
      'outCnvBaseFontSize': '8'
    },
    'chartData': {
      'fieldMapping': [
        {
          'columns': [ {
            name: 'data.auth.username'
          } ],
          'axis': 'x'
        },
        {
          'seriesname': 'Current Logins',
          'reportId': 'taf_asset_failed_logins_by_user_on_machines_time_shifted',
          'columns': [ {
            name: 'count',
            key: 0
          } ],
          'axis': 'y'
        },
        {
          'seriesname': 'Historic Logins',
          'reportId': 'taf_asset_failed_logins_by_user_on_machines_time_shifted',
          'columns': [ {
            name: 'count',
            key: 1
          } ],
          'axis': 'y'
        }
      ]
    },
    'meta': {
      'showHeader': true,
      'showRefresh': false,
      'api': {
        'path': '/api/analytics/reporting/execute/{reportId}',
        'pathParams': {
          'reportId': 'taf_asset_failed_logins_by_user_on_machines_time_shifted'
        },
        'queryParams': {
          'window': '',
          'timeShift': '',
          'asset': 'assetId:pathParam'
        }
      },
      'title': 'Failed Logins'
    },
    'attributes': {
      'chartHeight': '200',
      'chartCaption': {
        'display': 'none'
      },
      'style': {
        'width': '100%',
        'minHeight': '100px',
        'padding': 0,
        'boxShadow': 'none',
        'marginBottom': '35px'
      },
      'header': {
        'style': {
          'paddingBottom': 0
        },
        'title': {
          'fontSize': '13px',
          'fontWeight': 600,
          'textTransform': 'capitalize'
        }
      },
      'id': 'failed-login-count-chart'
    },
    'id': 'FailedLoginCount',
    'type': 'MultiSeriesColumn2d'
  },
  {
    'chartOptions': {
      'paletteColors': '#60E2DC, #C9EDDF',
      'xAxisName': 'TIME',
      'lineThickness': '1',
      'drawAnchors': '0',
      'divLineThickness': '2',
      'showYAxisValues': '1',
      'xAxisNameFontSize': '10',
      'yAxisNameFontSize': '10',
      'labelFontSize': '8',
      'showlegend': '0',
      'outCnvBaseFontSize': '8'
    },
    'chartData': {
      'fieldMapping': [
        {
          'reportId': 'taf_asset_all_successful_logins_by_user_time_shifted',
          'columns': [ 'date' ],
          'axis': 'x'
        },
        {
          'seriesname': 'Current Incoming Bandwidth',
          'reportId': 'taf_asset_all_successful_logins_by_user_time_shifted',
          'columns': [ 'count[0]' ],
          'renderas': 'Line',
          'axis': 'y'
        },
        {
          'seriesname': 'Historical Incoming Bandwidth',
          'reportId': 'taf_asset_all_successful_logins_by_user_time_shifted',
          'columns': [ 'count[1]' ],
          'renderas': 'Area',
          'axis': 'y'
        }
      ],
      'combinedResult': true
    },
    'meta': {
      'showHeader': true,
      'showRefresh': false,
      'api': {
        'path': '/api/analytics/reporting/execute/{reportId}',
        'pathParams': {
          'reportId': 'taf_asset_all_successful_logins_by_user_time_shifted'
        },
        'queryParams': {
          'window': '',
          'timeShift': '',
          'asset': 'assetId:pathParam'
        }
      },
      'title': 'Successful logins'
    },
    'attributes': {
      'chartHeight': '200',
      'chartCaption': {
        'display': 'none'
      },
      'style': {
        'width': '100%',
        'minHeight': '100px',
        'padding': 0,
        'boxShadow': 'none',
        'marginBottom': '35px'
      },
      'header': {
        'style': {
          'paddingBottom': 0
        },
        'title': {
          'fontSize': '13px',
          'fontWeight': 600,
          'textTransform': 'capitalize'
        }
      },
      'id': 'successful-logins-by-user'
    },
    'id': 'SuccessfulLoginsByUser',
    'type': 'MultiSeriesCombiChart'
  },
  {
    'chartOptions': {
      'paletteColors': '#60E2DC, #C9EDDF',
      'xAxisName': 'TIME',
      'lineThickness': '1',
      'drawAnchors': '0',
      'divLineThickness': '2',
      'showYAxisValues': '1',
      'xAxisNameFontSize': '10',
      'yAxisNameFontSize': '10',
      'labelFontSize': '8',
      'showlegend': '0',
      'outCnvBaseFontSize': '8'
    },
    'chartData': {
      'fieldMapping': [
        {
          'reportId': 'taf_asset_all_failed_logins_by_user_time_shifted',
          'columns': [ 'date' ],
          'axis': 'x'
        },
        {
          'seriesname': 'Current Incoming Bandwidth',
          'reportId': 'taf_asset_all_failed_logins_by_user_time_shifted',
          'columns': [ 'count[0]' ],
          'renderas': 'Line',
          'axis': 'y'
        },
        {
          'seriesname': 'Historical Incoming Bandwidth',
          'reportId': 'taf_asset_all_failed_logins_by_user_time_shifted',
          'columns': [ 'count[1]' ],
          'renderas': 'Area',
          'axis': 'y'
        }
      ],
      'combinedResult': true
    },
    'meta': {
      'showHeader': true,
      'showRefresh': false,
      'api': {
        'path': '/api/analytics/reporting/execute/{reportId}',
        'pathParams': {
          'reportId': 'taf_asset_all_failed_logins_by_user_time_shifted'
        },
        'queryParams': {
          'window': '',
          'timeShift': '',
          'asset': 'assetId:pathParam'
        }
      },
      'title': 'Failed logins'
    },
    'attributes': {
      'chartHeight': '200',
      'chartCaption': {
        'display': 'none'
      },
      'style': {
        'width': '100%',
        'minHeight': '100px',
        'padding': 0,
        'boxShadow': 'none',
        'marginBottom': '35px'
      },
      'header': {
        'style': {
          'paddingBottom': 0
        },
        'title': {
          'fontSize': '13px',
          'fontWeight': 600,
          'textTransform': 'capitalize'
        }
      },
      'id': 'failed-logins-by-user'
    },
    'id': 'FailedLoginsByUser',
    'type': 'MultiSeriesCombiChart'
  }
];

const machineCharts = [
  {
    'chartOptions': {
      'paletteColors': '#60E2DC, #C9EDDF',
      'xAxisName': 'Users',
      'divLineThickness': '2',
      'showYAxisValues': '1',
      'xAxisNameFontSize': '10',
      'yAxisNameFontSize': '10',
      'labelFontSize': '8',
      'drawAnchors': '1',
      'anchorRadius': '1',
      'showlegend': '0',
      'outCnvBaseFontSize': '8'
    },
    'chartData': {
      'fieldMapping': [
        {
          'columns': [ {
            name: 'data.auth.username'
          } ],
          'axis': 'x'
        },
        {
          'seriesname': 'Current Logins',
          'reportId': 'taf_asset_successful_logins_on_machine_by_users_time_shifted',
          'columns': [ {
            name: 'count',
            key: 0
          } ],
          'axis': 'y'
        },
        {
          'seriesname': 'Historic Logins',
          'reportId': 'taf_asset_successful_logins_on_machine_by_users_time_shifted',
          'columns': [ {
            name: 'count',
            key: 1
          } ],
          'axis': 'y'
        }
      ]
    },
    'meta': {
      'showHeader': true,
      'showRefresh': false,
      'api': {
        'path': '/api/analytics/reporting/execute/{reportId}',
        'pathParams': {
          'reportId': 'taf_asset_successful_logins_on_machine_by_users_time_shifted'
        },
        'queryParams': {
          'window': '',
          'timeShift': '',
          'asset': 'assetId:pathParam'
        }
      },
      'title': 'Successful Logins'
    },
    'attributes': {
      'chartHeight': '200',
      'chartCaption': {
        'display': 'none'
      },
      'style': {
        'width': '100%',
        'minHeight': '100px',
        'padding': 0,
        'boxShadow': 'none',
        'marginBottom': '35px'
      },
      'header': {
        'style': {
          'paddingBottom': 0
        },
        'title': {
          'fontSize': '13px',
          'fontWeight': 600,
          'textTransform': 'capitalize'
        }
      },
      'id': 'success-login-count-chart'
    },
    'id': 'success-login-count',
    'type': 'MultiSeriesColumn2d'
  },
  {
    'chartOptions': {
      'paletteColors': '#60E2DC, #C9EDDF',
      'xAxisName': 'Users',
      'divLineThickness': '2',
      'showYAxisValues': '1',
      'xAxisNameFontSize': '10',
      'yAxisNameFontSize': '10',
      'labelFontSize': '8',
      'drawAnchors': '1',
      'anchorRadius': '1',
      'showlegend': '0',
      'outCnvBaseFontSize': '8'
    },
    'chartData': {
      'fieldMapping': [
        {
          'columns': [ {
            name: 'data.winevent.TargetUserName'
          } ],
          'axis': 'x'
        },
        {
          'seriesname': 'Current Logins',
          'reportId': 'taf_asset_failed_logins_on_machine_by_users_time_shifted',
          'columns': [ {
            name: 'count',
            key: 0
          } ],
          'axis': 'y'
        },
        {
          'seriesname': 'Historic Logins',
          'reportId': 'taf_asset_failed_logins_on_machine_by_users_time_shifted',
          'columns': [ {
            name: 'count',
            key: 1
          } ],
          'axis': 'y'
        }
      ]
    },
    'meta': {
      'showHeader': true,
      'showRefresh': false,
      'api': {
        'path': '/api/analytics/reporting/execute/{reportId}',
        'pathParams': {
          'reportId': 'taf_asset_failed_logins_on_machine_by_users_time_shifted'
        },
        'queryParams': {
          'window': '',
          'timeShift': '',
          'asset': 'assetId:pathParam'
        }
      },
      'title': 'Failed Logins'
    },
    'attributes': {
      'chartHeight': '200',
      'chartCaption': {
        'display': 'none'
      },
      'style': {
        'width': '100%',
        'minHeight': '100px',
        'padding': 0,
        'boxShadow': 'none',
        'marginBottom': '35px'
      },
      'header': {
        'style': {
          'paddingBottom': 0
        },
        'title': {
          'fontSize': '13px',
          'fontWeight': 600,
          'textTransform': 'capitalize'
        }
      },
      'id': 'failed-login-count-chart'
    },
    'id': 'FailedLoginCount',
    'type': 'MultiSeriesColumn2d'
  },
  {
    'chartOptions': {
      'paletteColors': '#60E2DC, #C9EDDF',
      'xAxisName': 'TIME',
      'lineThickness': '1',
      'drawAnchors': '0',
      'divLineThickness': '2',
      'showYAxisValues': '1',
      'xAxisNameFontSize': '10',
      'yAxisNameFontSize': '10',
      'labelFontSize': '8',
      'showlegend': '0',
      'outCnvBaseFontSize': '8'
    },
    'chartData': {
      'fieldMapping': [
        {
          'reportId': 'taf_asset_all_successful_logins_by_machine_time_shifted',
          'columns': [ 'date' ],
          'axis': 'x'
        },
        {
          'seriesname': 'Current Incoming Bandwidth',
          'reportId': 'taf_asset_all_successful_logins_by_machine_time_shifted',
          'columns': [ 'count[0]' ],
          'renderas': 'Line',
          'axis': 'y'
        },
        {
          'seriesname': 'Historical Incoming Bandwidth',
          'reportId': 'taf_asset_all_successful_logins_by_machine_time_shifted',
          'columns': [ 'count[1]' ],
          'renderas': 'Area',
          'axis': 'y'
        }
      ],
      'combinedResult': true
    },
    'meta': {
      'showHeader': true,
      'showRefresh': false,
      'api': {
        'path': '/api/analytics/reporting/execute/{reportId}',
        'pathParams': {
          'reportId': 'taf_asset_all_successful_logins_by_machine_time_shifted'
        },
        'queryParams': {
          'window': '',
          'timeShift': '',
          'asset': 'assetId:pathParam'
        }
      },
      'title': 'Successful logins'
    },
    'attributes': {
      'chartHeight': '200',
      'chartCaption': {
        'display': 'none'
      },
      'style': {
        'width': '100%',
        'minHeight': '100px',
        'padding': 0,
        'boxShadow': 'none',
        'marginBottom': '35px'
      },
      'header': {
        'style': {
          'paddingBottom': 0
        },
        'title': {
          'fontSize': '13px',
          'fontWeight': 600,
          'textTransform': 'capitalize'
        }
      },
      'id': 'successful-logins-by-user'
    },
    'id': 'SuccessfulLoginsByUser',
    'type': 'MultiSeriesCombiChart'
  },
  {
    'chartOptions': {
      'paletteColors': '#60E2DC, #C9EDDF',
      'xAxisName': 'TIME',
      'lineThickness': '1',
      'drawAnchors': '0',
      'divLineThickness': '2',
      'showYAxisValues': '1',
      'xAxisNameFontSize': '10',
      'yAxisNameFontSize': '10',
      'labelFontSize': '8',
      'showlegend': '0',
      'outCnvBaseFontSize': '8'
    },
    'chartData': {
      'fieldMapping': [
        {
          'reportId': 'taf_asset_all_failed_logins_by_machine_time_shifted',
          'columns': [ 'date' ],
          'axis': 'x'
        },
        {
          'seriesname': 'Current Incoming Bandwidth',
          'reportId': 'taf_asset_all_failed_logins_by_machine_time_shifted',
          'columns': [ 'count[0]' ],
          'renderas': 'Line',
          'axis': 'y'
        },
        {
          'seriesname': 'Historical Incoming Bandwidth',
          'reportId': 'taf_asset_all_failed_logins_by_machine_time_shifted',
          'columns': [ 'count[1]' ],
          'renderas': 'Area',
          'axis': 'y'
        }
      ],
      'combinedResult': true
    },
    'meta': {
      'showHeader': true,
      'showRefresh': false,
      'api': {
        'path': '/api/analytics/reporting/execute/{reportId}',
        'pathParams': {
          'reportId': 'taf_asset_all_failed_logins_by_machine_time_shifted'
        },
        'queryParams': {
          'window': '',
          'timeShift': '',
          'asset': 'assetId:pathParam'
        }
      },
      'title': 'Failed logins'
    },
    'attributes': {
      'chartHeight': '200',
      'chartCaption': {
        'display': 'none'
      },
      'style': {
        'width': '100%',
        'minHeight': '100px',
        'padding': 0,
        'boxShadow': 'none',
        'marginBottom': '35px'
      },
      'header': {
        'style': {
          'paddingBottom': 0
        },
        'title': {
          'fontSize': '13px',
          'fontWeight': 600,
          'textTransform': 'capitalize'
        }
      },
      'id': 'failed-logins-by-user'
    },
    'id': 'FailedLoginsByUser',
    'type': 'MultiSeriesCombiChart'
  }
];

class AssetMultiChart extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }

  getCharts(charts) {
    return charts.map((chart, index) => {
      const elm = React.createFactory(require('components/' + chart.type).default, null);
      const {props} = this;
      chart.location = props.location;
      chart.params = props.params;
      chart.history = props.history;
      chart.key = chart.id;

      const componentElm = elm({...chart}, []);
      const ParentCardElement = React.createElement(ParentCard, {...chart}, componentElm);
      return ParentCardElement;
    });
  }

  render() {
    const {props: {params}} = this;

    let charts = [];
    if (params.type === 'user') {
      charts = userCharts;
    }
    else if (params.type === 'machine') {
      charts = machineCharts;
    }

    return (
      <div>
        {this.getCharts(charts)}
      </div>
    );
  }
}

AssetMultiChart.contextTypes = {
  store: React.PropTypes.object
};

export default AssetMultiChart;
