const CHART_COLORS = [
  '2BD8D0',
  '6CD3B4',
  'B6CD94',
  'FCC875',
  '05E9F5',
  '003300',
  'FF66FF',
  '999999',
  '009999',
  '66CDAA'
];

export function getData(data) {
  const graphBars = [],
    chartColors = CHART_COLORS,
    mapping = [
      {
        'reportId': 'taf_threat_trend',
        'columns': [
          'data.rank_alert.category'
        ],
        'axis': 'x'
      },
      {
        'reportId': 'taf_threat_trend',
        'columns': [
          'date'
        ],
        'axis': 'y'
      }
    ];

  let colorIndex = 0,
    numberOfColors = chartColors.length,
    x, y;

  const {rows, columns} = data;

  console.log(rows, columns);

  for (let i = 0; i < mapping.length; i++) {
    let chartData = mapping[i];

    // Check for x-axis chart data
    if (chartData.axis === 'x') {
      // Calculate column index from API response
      x = getIndexFromColumnName(chartData.columns, columns);
    }

    // Check for y-axis chart data
    if (chartData.axis === 'y') {
      // Calculate column index from API response
      y = getIndexFromColumnName(chartData.columns, columns);
    }
  }

  for (let i = 0; i < rows.length; i++) {
    const xValue = rows[i][x],
      yValue = rows[i][y],
      barObject = {
        label: xValue || 'Other',
        value: yValue,
        color: chartColors[(colorIndex++) % numberOfColors]
      };

    graphBars.push(barObject);
  }

  return graphBars;
}

// Function to get index from column name specified in layout JSON
function getIndexFromColumnName(currentChartDataColumns, columnsArray) {
  let columnIndex = '';
  for (let a = 0; a < currentChartDataColumns.length; a++) {
    for (let c = 0; c < columnsArray.length; c++) {
      if (currentChartDataColumns[a] === columnsArray[c].name) {
        columnIndex = c;
        break;
      }
    }
  }
  return columnIndex;
}
