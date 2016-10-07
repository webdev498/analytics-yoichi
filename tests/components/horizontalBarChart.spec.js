import React from 'react';
import TestUtils from 'react-addons-test-utils';
import HorizontalBarChart, {
  generateDataArray,
  generateDataSource
} from 'components/HorizontalBarChart';

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<HorizontalBarChart {...props} />);
}

describe('HorizontalBarChart Component: ', function() {
  it('Should render as <div>', function() {
    const props = {
      'attributes': {'id': 'TopConnectionsByProtocol'},
      'meta': {
        'title': 'Top Connections By Protocol'
      },
      'data': null
    };

    const component = shallowRenderWithProps(props);
    expect(component.type).to.equal('div');
  });

  it('generateDataArray should return data array.', function() {
    const columnIndexArray = [3, 5],
      rowsArray = [
        [
          'CN',
          '1681.14',
          '479.81',
          'China',
          553,
          1731585
        ],
        [
          'BR',
          '713.87',
          '796.72',
          'Brazil',
          23,
          80150
        ]
      ],
      orgDataset = [
        {
          'label': 'China',
          'value': 93296,
          'connection': 'malicious',
          'toolText': 'China, 93296'
        },
        {
          'label': 'Brazil',
          'value': 79960,
          'connection': 'malicious',
          'toolText': 'Brazil, 79960'
        }
      ],
      displayTopFive = true,
      connection = 'secure',
      dataArray = {
        'dataset': [],
        'annotationItems': [],
        'secureConnectionsValues': [],
        'maliciousConnectionsValues': []
      };
    let parameters = {
      columnIndexArray: columnIndexArray,
      rowsArray: rowsArray,
      displayTopFive: displayTopFive,
      orgDataset: orgDataset,
      connection: connection,
      numberSuffix: '',
      singleLineCharacters: '15'
    };
    expect(
      generateDataArray(parameters)
    ).to.deep.equal(dataArray);
  });

  // it('generateDataSource should return chart datasource object.', function() {
  //   const rawData = {
  //       'taf_connections_by_protocol': {
  //         'total': -1,
  //         'next': -1,
  //         'columns': [
  //           {
  //             'name': 'protocol.service',
  //             'displayName': 'protocol',
  //             'columnType': 'DIMENSION',
  //             'dataType': 'TEXT',
  //             'sortable': true
  //           },
  //           {
  //             'name': 'date',
  //             'displayName': 'connections using this protocol',
  //             'columnType': 'MEASURE',
  //             'dataType': 'NUMBER',
  //             'sortable': true
  //           }
  //         ],
  //         'rows': [
  //           [
  //             'http',
  //             8537
  //           ],
  //           [
  //             'Elasticsearch',
  //             2843
  //           ]
  //         ]
  //       }
  //     },
  //     chartOptions = {'showValues': '0', 'showLabels': '1', 'singleLineCharacters': '27'},
  //     chartData = {
  //       'showTrendLines': false,
  //       'fieldMapping': [
  //         {
  //           'reportId': 'taf_connections_by_protocol',
  //           'columns': [
  //             'protocol.service',
  //             'date'
  //           ]
  //         }
  //       ],
  //       'multipleReportIds': false
  //     },
  //     dataSourceObject = {
  //       'chart': {
  //         'paletteColors': '#2bd8d0,#3ad7c9,#46d6c4,#57d5bd,#67d3b6,#79d2ae,#8ad1a7,#9acfa0,#a8ce9a,#b2cd96',
  //         'bgColor': '#ffffff',
  //         'showBorder': '0',
  //         'showCanvasBorder': '0',
  //         'usePlotGradientColor': '0',
  //         'placeValuesInside': '1',
  //         'valueFontColor': '#444c63',
  //         'showAxisLines': '1',
  //         'axisLineAlpha': '15',
  //         'alignCaptionWithCanvas': '0',
  //         'showAlternateVGridColor': '0',
  //         'captionFontSize': '14',
  //         'subcaptionFontSize': '14',
  //         'subcaptionFontBold': '0',
  //         'showLabels': '1',
  //         'divLineAlpha': '50',
  //         'divLineColor': '#e5e5ea',
  //         'divLineThickness': '1',
  //         'plotBorderAlpha': '0',
  //         'chartRightMargin': '150',
  //         'animation': '0',
  //         'toolTipColor': '#ffffff',
  //         'toolTipBorderThickness': '0',
  //         'toolTipBgColor': '#000000',
  //         'toolTipBgAlpha': '80',
  //         'toolTipBorderRadius': '2',
  //         'toolTipPadding': '5',
  //         'showYAxisValues': '0',
  //         'showValues': '0',
  //         'xAxisNameFontSize': '14',
  //         'yAxisNameFontSize': '14',
  //         'labelFontSize': '11',
  //         'chartLeftMargin': '0',
  //         'numDivLines': '4',
  //         'baseFont': 'Open Sans, sans-serif',
  //         'baseFontColor': '#6b7282',
  //         'singleLineCharacters': '27'
  //       },
  //       'annotations': {
  //         'groups': [
  //           {
  //             'items': [
  //               {
  //                 'id': 'datasetlabel0',
  //                 'type': 'text',
  //                 'text': '8.54k ',
  //                 'align': 'left',
  //                 'x': '$chartEndX - 146',
  //                 'y': '$dataset.0.set.0.CenterY',
  //                 'fontSize': '11',
  //                 'color': '#6b7282',
  //                 'font': 'Open Sans, sans-serif'
  //               },
  //               {
  //                 'id': 'datasetlabel1',
  //                 'type': 'text',
  //                 'text': '2.84k ',
  //                 'align': 'left',
  //                 'x': '$chartEndX - 146',
  //                 'y': '$dataset.0.set.1.CenterY',
  //                 'fontSize': '11',
  //                 'color': '#6b7282',
  //                 'font': 'Open Sans, sans-serif'
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       'data': [
  //         {
  //           'label': 'http',
  //           'value': 8537,
  //           'connection': '',
  //           'toolText': 'http, 8537'
  //         },
  //         {
  //           'label': 'Elasticsearch',
  //           'value': 2843,
  //           'connection': '',
  //           'toolText': 'Elasticsearch, 2843'
  //         },
  //         {
  //           'label': '',
  //           'value': '',
  //           'connection': ''
  //         },
  //         {
  //           'label': '',
  //           'value': '',
  //           'connection': ''
  //         },
  //         {
  //           'label': '',
  //           'value': '',
  //           'connection': ''
  //         }
  //       ]
  //     };
  //   expect(generateDataSource(rawData, chartOptions, chartData)).to.deep.equal(dataSourceObject);
  // });
});
