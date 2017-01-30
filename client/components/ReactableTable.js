import React, {PropTypes} from 'react';
import Reactable from 'reactable';

import Area2DAsSparkLineChart from 'components/charts/Area2DAsSparkLineChart';
import DurationWidget from 'components/widgets/DurationWidget';
import ScoreWidget from 'components/widgets/ScoreWidget';
import AssetWidget from 'components/widgets/AssetWidget';
import LoadComponent from 'components/LoadComponent';

import {getCountryCode} from '../../commons/utils/countryUtils';
import {displayEllipsis} from '../../commons/utils/utils';

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
    case 'loadComponent':
      // let props = {
      //   // meta: null,
      //   // attributes: null,
      //   id: 'test',
      //   type: 'widgets/DurationWidget',
      //   timeValue: column.data[0].value
      // };
      let props = {
        // key: 'testing',
        type: 'DurationWidget',
        key: 'test',
        // timeValue: 453464373
        props: {
          id: 'test',
          type: 'widgets/DurationWidget',
          timeValue: column.data[0].value
        }
      };
      return (
        <LoadComponent props={props} />
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

function loadText(column) {
  let {data, ellipsis} = column;
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
              : displayTextWithEllipsis(text.value, ellipsis)
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

function displayTextWithEllipsis(value, ellipsis) {
  let text = displayEllipsis(value, ellipsis);
  return (
    text === value
    ? <span>{value + ' '}</span>
    : <span title={value}>{text + ' '}</span>
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
    const {data, attributes} = props,
      {tableJson: {options}, normalizeData} = data,
      id = attributes.id;

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
                          ? loadText(column)
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
