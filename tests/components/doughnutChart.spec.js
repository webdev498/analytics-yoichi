import {
  generateDoughnutChart,
  calculateDoughnutAttributes
} from 'components/DoughnutChart';

describe('DoughnutChart Component: ', function() {
  it('generateDoughnutChart should return doughnut chart attributes.', function() {
    const inputArray = {
        'countValue': 6,
        'top10CountValue': 4,
        'top10TotalValue': 21581,
        'totalValue': '21722'
      },
      doughnutChartAttributes = {
        'chart1Background': {
          'background': '#CCCCCC'
        },
        'chart1SliceOneStyle': {
          'transform': 'rotate(90deg)',
          'WebkitTransform': 'rotate(90deg)',
          'background': '#8ABB24'
        },
        'chart1SliceTwoStyle': {
          'transform': 'rotate(241.20000000000002deg)',
          'WebkitTransform': 'rotate(241.20000000000002deg)',
          'background': '#8ABB24'
        },
        'chart2Background': {
          'background': '#CCCCCC'
        },
        'chart2SliceOneStyle': {
          'transform': 'rotate(90deg)',
          'WebkitTransform': 'rotate(90deg)',
          'background': '#5E2B78'
        },
        'chart2SliceTwoStyle': {
          'transform': 'rotate(356.4deg)',
          'WebkitTransform': 'rotate(356.4deg)',
          'background': '#5E2B78'
        },
        'percentage1Color': {
          'fontWeight': 'bold',
          'color': '#8ABB24'
        },
        'percentage2Color': {
          'fontWeight': 'bold',
          'color': '#5E2B78'
        },
        'displayPercentage1': '67%',
        'displayPercentage2': '99%'
      };
    expect(generateDoughnutChart(inputArray)).to.deep.equal(doughnutChartAttributes);
  });

  it('calculateDoughnutAttributes should compute doughnut chart attributes.', function() {
    const inputArray = {'countValue': 6, 'totalValue': 4},
      chartId = 1,
      doughnutChartAttributes = {
        'chartBackground': {
          'background': '#CCCCCC'
        },
        'chartSliceOneStyle': {
          'transform': 'rotate(90deg)',
          'WebkitTransform': 'rotate(90deg)',
          'background': '#8ABB24'
        },
        'chartSliceTwoStyle': {
          'transform': 'rotate(241.20000000000002deg)',
          'WebkitTransform': 'rotate(241.20000000000002deg)',
          'background': '#8ABB24'
        }
      };
    expect(calculateDoughnutAttributes(inputArray, chartId)).to.deep.equal(doughnutChartAttributes);
  });
});
