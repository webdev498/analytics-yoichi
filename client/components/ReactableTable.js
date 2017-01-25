import React, {PropTypes} from 'react';
import Reactable from 'reactable';

import Area2DAsSparkLineChart from 'components/charts/Area2DAsSparkLineChart';
import DurationWidget from 'components/widgets/DurationWidget';
import ScoreWidget from 'components/widgets/ScoreWidget';
import AssetWidget from 'components/widgets/AssetWidget';

import {getCountryCode} from '../../commons/utils/countryUtils';

const {Table, Tr, Td} = Reactable;
const kibanaBaseUrl = (window.global && window.global.kibanaBaseUrl) ? window.global.kibanaBaseUrl : '/';

const styles = {
  header: {
    fontWeight: '600',
    fontSize: '14px'
  },
  row: {}
};

function loadComponent(column) {
  switch (column.type) {
    case 'chart':
      return loadChartComponent(column);
    case 'durationWidget':
      return (
        <DurationWidget timeValue={column.data[0].value} />
      );
    case 'scoreWidget':
      return (
        <ScoreWidget scoreValue={column.data[0].value} inverse={column.inverse} />
      );
    case 'assetWidget':
      let data = {
        info: column.data[0] ? column.data[0].value : {},
        type: column.data[1] ? column.data[1].value : ''
      };
      return (
        <AssetWidget data={data} headingStyle={column.headingStyle} />
      );
    default:
      break;
  }
}

function loadChartComponent(column) {
  let {chart, data, duration} = column;
  if (column.chart) {
    switch (column.chart.type) {
      case 'area2d':
        return (
          <Area2DAsSparkLineChart chart={chart} data={data} duration={duration} />
        );
      default:
        break;
    }
  }
}

function loadText(data) {
  return (
    <div>
      {data.map((text, index) => {
        return (
          <div key={`column${index}`}>
            {
              text.header
              ? <span style={styles.header}>{text.header + ': '}</span>
              : null
            }
            { /* The following condition checks
              if header not exists and it is a first row in that column and
              it is having multiple rows in that column,
              then 'header' style should apply to that text otherwise display it as normal text. */ }
            {
              !text.header && index === 0 && data.length > 1
              ? <span style={styles.header}>{text.value}</span>
              : text.value + ' '
            }
            {
              text.header && text.header === 'Country'
              ? displayCountryFlag(text)
              : null
            }
          </div>
        );
      })}
    </div>
  );
}

function displayCountryFlag(data) {
  let countryFlag = getCountryCode[data.value];
  countryFlag = countryFlag ? 'flag-icon flag-icon-' + countryFlag.toLowerCase() : '';
  return (
    <span className={countryFlag} rel='tooltip' title={data.value} />
  );
}

function rowClick(context, tableRow) {
  if (!tableRow.rowClickUrl) {
    return;
  }
  let rowClickUrl = kibanaBaseUrl + tableRow.rowClickUrl;
  context.clickThrough(rowClickUrl);
}

export class ReactableTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  static propTypes = {
    attributes: PropTypes.object,
    tableOptions: PropTypes.object,
    data: PropTypes.object
  }

  handleRowClick(tableRow, index) {
    const {context, props} = this;

    return () => {
      if (props.openAlertDetails) {
        const {rows} = props.data,
          currentRow = rows[index][0],
          url = `/alert/${currentRow.id}/${currentRow.date}`;
        props.updateRoute(url);
      }
      else if (props.openAssetDetails) {
        const {rows} = props.data,
          currentRow = rows[index][0],
          url = `/asset/${currentRow.type}/${currentRow.id}`;
        props.updateRoute(url);
      }
      else {
        rowClick(context, tableRow);
      }
    };
  }

  loadTable() {
    const {props} = this;
    if (!props.data) {
      return;
    }
    let {data, attributes} = props,
      {tableJson: {options}, normalizeData} = data,
      id = attributes.id;

    /*normalizeData = [
      {
        "columns": [
          {
            "type": "text",
            "name": "LONGEST USER AGENT",
            "style": {
              "width": "50%",
              "wordBreak": "break-all"
            },
            "data": [
              {
                "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36"
              }
            ]
          },
          {
            "type": "chart",
            "name": "# CONNECTIONS",
            "style": {
              "width": "50%"
            },
            "data": [
              {
                "value": {
                  "2017-01-18T00:00:00.000": [
                    0
                  ],
                  "2017-01-19T00:00:00.000": [
                    1
                  ],
                  "2017-01-20T00:00:00.000": [
                    1
                  ],
                  "2017-01-21T00:00:00.000": [
                    1
                  ],
                  "2017-01-22T00:00:00.000": [
                    1
                  ],
                  "2017-01-23T00:00:00.000": [
                    1
                  ],
                  "2017-01-24T00:00:00.000": [
                    1
                  ],
                  "2017-01-25T00:00:00.000": [
                    0
                  ]
                }
              }
            ],
            "chartId": "connection0",
            "chartType": "area2d",
            "chartWidth": "100%",
            "chartHeight": "120",
            "chartOptions": {
              "labelFontSize": "9"
            },
            "row": {
              "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36": {
                "2017-01-18T00:00:00.000": [
                  0
                ],
                "2017-01-19T00:00:00.000": [
                  1
                ],
                "2017-01-20T00:00:00.000": [
                  1
                ],
                "2017-01-21T00:00:00.000": [
                  1
                ],
                "2017-01-22T00:00:00.000": [
                  1
                ],
                "2017-01-23T00:00:00.000": [
                  1
                ],
                "2017-01-24T00:00:00.000": [
                  1
                ],
                "2017-01-25T00:00:00.000": [
                  0
                ]
              }
            }
          }
        ]
      },
      {
        "columns": [
          {
            "type": "text",
            "name": "LONGEST USER AGENT",
            "style": {
              "width": "50%",
              "wordBreak": "break-all"
            },
            "data": [
              {
                "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
              }
            ]
          },
          {
            "type": "chart",
            "name": "# CONNECTIONS",
            "style": {
              "width": "50%"
            },
            "data": [
              {
                "value": {
                  "2017-01-18T00:00:00.000": [
                    0
                  ],
                  "2017-01-19T00:00:00.000": [
                    45
                  ],
                  "2017-01-20T00:00:00.000": [
                    0
                  ],
                  "2017-01-21T00:00:00.000": [
                    0
                  ],
                  "2017-01-22T00:00:00.000": [
                    0
                  ],
                  "2017-01-23T00:00:00.000": [
                    0
                  ],
                  "2017-01-24T00:00:00.000": [
                    0
                  ],
                  "2017-01-25T00:00:00.000": [
                    0
                  ]
                }
              }
            ],
            "chartId": "connection1",
            "chartType": "area2d",
            "chartWidth": "100%",
            "chartHeight": "120",
            "chartOptions": {
              "labelFontSize": "9"
            },
            "row": {
              "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36": {
                "2017-01-18T00:00:00.000": [
                  0
                ],
                "2017-01-19T00:00:00.000": [
                  45
                ],
                "2017-01-20T00:00:00.000": [
                  0
                ],
                "2017-01-21T00:00:00.000": [
                  0
                ],
                "2017-01-22T00:00:00.000": [
                  0
                ],
                "2017-01-23T00:00:00.000": [
                  0
                ],
                "2017-01-24T00:00:00.000": [
                  0
                ],
                "2017-01-25T00:00:00.000": [
                  0
                ]
              }
            }
          }
        ]
      },
      {
        "columns": [
          {
            "type": "text",
            "name": "LONGEST USER AGENT",
            "style": {
              "width": "50%",
              "wordBreak": "break-all"
            },
            "data": [
              {
                "value": "Apache-HttpClient/4.5.2 (Java/1.8.0_102)"
              }
            ]
          },
          {
            "type": "chart",
            "name": "# CONNECTIONS",
            "style": {
              "width": "50%"
            },
            "data": [
              {
                "value": {
                  "2017-01-18T00:00:00.000": [
                    0
                  ],
                  "2017-01-19T00:00:00.000": [
                    0
                  ],
                  "2017-01-20T00:00:00.000": [
                    0
                  ],
                  "2017-01-21T00:00:00.000": [
                    3262
                  ],
                  "2017-01-22T00:00:00.000": [
                    4182
                  ],
                  "2017-01-23T00:00:00.000": [
                    4182
                  ],
                  "2017-01-24T00:00:00.000": [
                    4176
                  ],
                  "2017-01-25T00:00:00.000": [
                    170
                  ]
                }
              }
            ],
            "chartId": "connection2",
            "chartType": "area2d",
            "chartWidth": "100%",
            "chartHeight": "120",
            "chartOptions": {
              "labelFontSize": "9"
            },
            "row": {
              "Apache-HttpClient/4.5.2 (Java/1.8.0_102)": {
                "2017-01-18T00:00:00.000": [
                  0
                ],
                "2017-01-19T00:00:00.000": [
                  0
                ],
                "2017-01-20T00:00:00.000": [
                  0
                ],
                "2017-01-21T00:00:00.000": [
                  3262
                ],
                "2017-01-22T00:00:00.000": [
                  4182
                ],
                "2017-01-23T00:00:00.000": [
                  4182
                ],
                "2017-01-24T00:00:00.000": [
                  4176
                ],
                "2017-01-25T00:00:00.000": [
                  170
                ]
              }
            }
          }
        ]
      },
      {
        "columns": [
          {
            "type": "text",
            "name": "LONGEST USER AGENT",
            "style": {
              "width": "50%",
              "wordBreak": "break-all"
            },
            "data": [
              {
                "value": "Debian APT-HTTP/1.3 (1.0.1ubuntu2)"
              }
            ]
          },
          {
            "type": "chart",
            "name": "# CONNECTIONS",
            "style": {
              "width": "50%"
            },
            "data": [
              {
                "value": {
                  "2017-01-18T00:00:00.000": [
                    0
                  ],
                  "2017-01-19T00:00:00.000": [
                    68
                  ],
                  "2017-01-20T00:00:00.000": [
                    71
                  ],
                  "2017-01-21T00:00:00.000": [
                    0
                  ],
                  "2017-01-22T00:00:00.000": [
                    0
                  ],
                  "2017-01-23T00:00:00.000": [
                    0
                  ],
                  "2017-01-24T00:00:00.000": [
                    55
                  ],
                  "2017-01-25T00:00:00.000": [
                    66
                  ]
                }
              }
            ],
            "chartId": "connection3",
            "chartType": "area2d",
            "chartWidth": "100%",
            "chartHeight": "120",
            "chartOptions": {
              "labelFontSize": "9"
            },
            "row": {
              "Debian APT-HTTP/1.3 (1.0.1ubuntu2)": {
                "2017-01-18T00:00:00.000": [
                  0
                ],
                "2017-01-19T00:00:00.000": [
                  68
                ],
                "2017-01-20T00:00:00.000": [
                  71
                ],
                "2017-01-21T00:00:00.000": [
                  0
                ],
                "2017-01-22T00:00:00.000": [
                  0
                ],
                "2017-01-23T00:00:00.000": [
                  0
                ],
                "2017-01-24T00:00:00.000": [
                  55
                ],
                "2017-01-25T00:00:00.000": [
                  66
                ]
              }
            }
          }
        ]
      },
      {
        "columns": [
          {
            "type": "text",
            "name": "LONGEST USER AGENT",
            "style": {
              "width": "50%",
              "wordBreak": "break-all"
            },
            "data": [
              {
                "value": "Python-urllib/3.4"
              }
            ]
          },
          {
            "type": "chart",
            "name": "# CONNECTIONS",
            "style": {
              "width": "50%"
            },
            "data": [
              {
                "value": {
                  "2017-01-18T00:00:00.000": [
                    0
                  ],
                  "2017-01-19T00:00:00.000": [
                    1
                  ],
                  "2017-01-20T00:00:00.000": [
                    1
                  ],
                  "2017-01-21T00:00:00.000": [
                    0
                  ],
                  "2017-01-22T00:00:00.000": [
                    0
                  ],
                  "2017-01-23T00:00:00.000": [
                    1
                  ],
                  "2017-01-24T00:00:00.000": [
                    1
                  ],
                  "2017-01-25T00:00:00.000": [
                    0
                  ]
                }
              }
            ],
            "chartId": "connection4",
            "chartType": "area2d",
            "chartWidth": "100%",
            "chartHeight": "120",
            "chartOptions": {
              "labelFontSize": "9"
            },
            "row": {
              "Python-urllib/3.4": {
                "2017-01-18T00:00:00.000": [
                  0
                ],
                "2017-01-19T00:00:00.000": [
                  1
                ],
                "2017-01-20T00:00:00.000": [
                  1
                ],
                "2017-01-21T00:00:00.000": [
                  0
                ],
                "2017-01-22T00:00:00.000": [
                  0
                ],
                "2017-01-23T00:00:00.000": [
                  1
                ],
                "2017-01-24T00:00:00.000": [
                  1
                ],
                "2017-01-25T00:00:00.000": [
                  0
                ]
              }
            }
          }
        ]
      }
    ];*/

    styles.row = options.rowClickable
      ? Object.assign(styles.row, {'cursor': 'pointer'})
      : {};

    return (
      <Table id={id}
        style={{width: '100%'}}
        className='threatTable'
        sortable={options.sortable}
        filterable={options.filterable}
        defaultSort={options.defaultSort}
        filterBy={props.search}
        itemsPerPage={normalizeData.length > options.itemsPerPage ? options.itemsPerPage : 0}
        pageButtonLimit={5}
        currentPage={0}
        hideFilterInput
        previousPageLabel={'<<'}
        nextPageLabel={'>>'}>
        {
          normalizeData.map((row, index) => {
            return (
              <Tr onClick={this.handleRowClick(row, index)}
                style={styles.row}
                key={`tr${id}${index}`}>
                {
                  row.columns.map((column, indexCol) => {
                    column = Object.assign({}, column, {
                      key: `td${id}${indexCol}`,
                      duration: props.duration
                    });

                    let value = column.sortValue || '',
                      style = column.type === 'text' ? {...column.style, 'wordBreak': 'break-all'} : {...column.style};
                    return (
                      <Td column={column.name}
                        value={value}
                        style={style}
                        key={column.key}>
                        {
                          column.type === 'text'
                          ? loadText(column.data)
                          : loadComponent(column)
                        }
                      </Td>
                    );
                  }
                )}
              </Tr>
            );
          })
        }
      </Table>
    );
  }

  render() {
    return (
      <div>
        {this.loadTable()}
      </div>
    );
  }
}

ReactableTable.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default ReactableTable;
