import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';

const chart = {
  'baseFontColor': '#333333',
  'showBorder': '0',
  'bgColor': '#ffffff',
  'showShadow': '0',
  'canvasBgColor': '#ffffff',
  'canvasBorderAlpha': '0',
  'divLineAlpha': '50',
  'divLineColor': Colors.cloud,
  'divLineThickness': '1',
  'usePlotGradientColor': '0',
  'showplotborder': '0',
  'valueFontColor': '#ffffff',
  'showHoverEffect': '1',
  'rotateValues': '1',
  'showXAxisLine': '1',
  'xAxisLineThickness': '1',
  'xAxisLineColor': '#999999',
  'showAlternateHGridColor': '0',
  'showValues': '0',
  'legendBgAlpha': '0',
  'legendBorderAlpha': '0',
  'legendShadow': '0',
  'legendItemFontSize': '10',
  'legendItemFontColor': '#666666'
};

function getData(data, index, label, callback) {
  return data.map((val) => {
    if (callback) {
      return {
        [label]: callback(val[index])
      };
    }
    return {
      [label]: val[index]
    };
  });
}

function getDataSource(props) {
  const {data: {success, fail}} = props;

  const categories = [{
    category: getData(success.rows, 0, 'label')
  }];

  const dataset = [];
  dataset.push({
    seriesname: 'Successful Logins',
    data: getData(success.rows, 1, 'value')
  });

  dataset.push({
    seriesname: 'Failed Logins',
    data: getData(fail.rows, 1, 'value')
  });

  return {
    chart: Object.assign({}, chart, props.chartOptions),
    categories,
    dataset
  };
}

class MultiSeriesColumn2d extends React.Component {
  static propTypes = {
    attributes: PropTypes.object,
    meta: PropTypes.object,
    id: PropTypes.string,
    params: PropTypes.object,
    fetchApiData: PropTypes.func
  }

  componentDidMount() {
    function getApiObj(params) {
      let reportId;
      if (params.type === 'user') {
        reportId = 'taf_asset_logins_on_machine_by_users';
      }
      else {
        reportId = 'taf_asset_logins_by_user_on_machines';
      }

      return [
        {
          'path': '/api/analytics/reporting/execute/{reportId}',
          'pathParams': {
            'reportId': `${reportId}`
          },
          'queryParams': {
            'window': '',
            'user': 'assetId:pathParam',
            'status': 'success'
          },
          'id': 'success'
        },
        {
          'path': '/api/analytics/reporting/execute/{reportId}',
          'pathParams': {
            'reportId': `${reportId}`
          },
          'queryParams': {
            'window': '',
            'user': 'assetId:pathParam',
            'status': 'success'
          },
          'id': 'fail'
        }
      ];
    }

    const {props: {meta: {api}, id, fetchApiData, params}} = this;

    if (api === null) {
      fetchApiData(id, getApiObj(params), params);
    }
  }

  renderChart(props) {
    if (!props.data) {
      return;
    }

    FusionCharts.ready(function() {
      const fusioncharts = new FusionCharts({
        type: 'mscolumn2d',
        renderAt: props.attributes.id,
        width: props.attributes.chartWidth ? props.attributes.chartWidth : '100%',
        height: props.attributes.chartHeight ? props.attributes.chartHeight : '400',
        dataFormat: 'json',
        containerBackgroundOpacity: '0',
        dataSource: getDataSource(props)
      });

      fusioncharts.render();
    });
  }

  render() {
    const {props} = this;
    return (
      <div id={props.attributes.id}>{this.renderChart(props)}</div>
    );
  }
}

export default MultiSeriesColumn2d;
