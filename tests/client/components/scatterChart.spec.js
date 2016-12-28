import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ScatterChart, {
  generateChartDataSource
} from 'components/ScatterChart';

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<ScatterChart {...props} />);
}

describe('ScatterChart Component: ', function() {
  it('Should render as <div>', function() {
    const props = {
      'attributes': {'id': 'UserAgentLength'},
      'meta': {
        'title': 'User Agent Details'
      },
      'data': null
    };

    const component = shallowRenderWithProps(props);
    expect(component.type).to.equal('div');
    expect(component.props.id).to.equal(props.attributes.id);
  });

  it('generateChartDataSource should return chart data source object.', function() {
    const rawData = {
        'taf_user_agent_unique': {
          'total': -1,
          'next': -1,
          'columns': [
            {
              'name': 'data.http.__info.userAgentLen',
              'displayName': 'data.http.__info.userAgentLen',
              'columnType': 'DIMENSION',
              'dataType': 'NUMBER',
              'sortable': true
            },
            {
              'name': 'date',
              'displayName': 'date',
              'columnType': 'MEASURE',
              'dataType': 'NUMBER',
              'sortable': true
            }
          ],
          'rows': [
            [
              0,
              8568
            ],
            [
              30,
              8
            ]
          ]
        }
      },
      chartOptions = {'xAxisName': 'USER AGENT LENGTH', 'yAxisName': 'CONNECTION COUNT'},
      fieldMapping = [
        {
          'seriesname': 'User Agent Length',
          'reportId': 'taf_user_agent_unique',
          'columns': [
            'data.http.__info.userAgentLen',
            'date'
          ]
        }
      ],
      dataSourceObject = {
        'chart': {
          'showvalues': '0',
          'theme': 'zune',
          'showAxisLines': '1',
          'showYAxisValues': '1',
          'labelDisplay': 'wrap',
          'rotateLabels': '0',
          'showlegend': '0',
          'bgAlpha': '0',
          'canvasBgAlpha': '0',
          'labelFontSize': '10',
          'baseFont': 'Open Sans, sans-serif',
          'baseFontColor': '#6b7282',
          'xAxisNameFontSize': '13',
          'yAxisNameFontSize': '13',
          'xAxisNamePadding': '20',
          'yAxisNamePadding': '20',
          'lineColor': '#F69275',
          'divLineIsDashed': '0',
          'showsYAxisLine': '0',
          'divLineAlpha': '20',
          'chartLeftMargin': '0',
          'chartRightMargin': '0',
          'chartBottomMargin': '0',
          'numVDivLines': '10',
          'canvasBgColor': '#EBFBFB,#ffffff',
          'canvasbgAlpha': '100',
          'canvasBgRatio': '30,70',
          'canvasBgAngle': '280',
          'xAxisLineColor': '#DADADA',
          'yaxislinecolor': '#DADADA',
          'xAxisName': 'USER AGENT LENGTH',
          'yAxisName': 'CONNECTION COUNT'
        },
        'dataset': [
          {
            'drawline': '0',
            'anchorsides': '0',
            'anchorradius': '6',
            'color': '#2bd8d0',
            'anchorbgcolor': '#2bd8d0',
            'anchorbordercolor': '#2bd8d0',
            'seriesname': 'User Agent Length',
            'reportId': 'taf_user_agent_unique',
            'columns': [
              'data.http.__info.userAgentLen',
              'date'
            ],
            'data': [
              {
                'x': 0,
                'y': 8568,
                'toolText': 'USER AGENT LENGTH: 0 CONNECTION COUNT: 8568'
              },
              {
                'x': 30,
                'y': 8,
                'toolText': 'USER AGENT LENGTH: 30 CONNECTION COUNT: 8'
              }
            ]
          }
        ]
      };
    expect(generateChartDataSource(rawData, chartOptions, fieldMapping)).to.deep.equal(dataSourceObject);
  });
});
