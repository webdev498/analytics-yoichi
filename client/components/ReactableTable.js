import React, {PropTypes} from 'react';
import Reactable from 'reactable';

import Area2DAsSparkLineChart from 'components/Area2DAsSparkLineChart';
import DurationWidget from 'components/widgets/DurationWidget';
import ScoreWidget from 'components/widgets/ScoreWidget';
import AssetIcon from 'components/widgets/AssetIcon';

import {countryName} from 'utils/countryUtils';

const {Table, Tr, Td} = Reactable;

const styles = {
  header: {
    fontWeight: '600',
    fontSize: '14px'
  }
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
        <ScoreWidget scoreValue={column.data[0].value} />
      );
    default:
      break;
  }
}

function loadChartComponent(column) {
  switch (column.chartType) {
    case 'area2d':
      return (
        <Area2DAsSparkLineChart chartProperties={column} duration={column.duration} />
      );
    case 'assetIcon':
      return (
        <AssetIcon asset={column} />
      );
    default:
      break;
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
  let countryFlag = countryName[data.value];
  countryFlag = countryFlag ? 'flag-icon flag-icon-' + countryFlag.toLowerCase() : '';
  return (
    <span className={countryFlag} rel='tooltip' title={data.value} />
  );
}

function rowClick(context, tableRow) {
  if (!tableRow.rowClickUrl) {
    return;
  }
  context.clickThrough(tableRow.rowClickUrl);
}

export class TableCard extends React.Component {
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
      {tableJson: {tableOptions}, normalizeData} = data,
      id = attributes.id;

    return (
      <Table id={id}
        style={{width: '100%'}}
        className='threatTable'
        sortable={tableOptions.sortable}
        filterable={tableOptions.filterable}
        defaultSort={tableOptions.defaultSort}
        filterBy={props.search}
        itemsPerPage={normalizeData.length > tableOptions.itemsPerPage ? tableOptions.itemsPerPage : 0}
        pageButtonLimit={5}
        currentPage={0}
        hideFilterInput
        previousPageLabel={'<<'}
        nextPageLabel={'>>'}>
        {
          normalizeData.map((row, index) => {
            return (
              <Tr onClick={this.handleRowClick(row, index)}
                style={{'cursor': 'pointer'}}
                key={`tr${id}${index}`}>
                {
                  row.columns.map((column, indexCol) => {
                    column = Object.assign({}, column, {
                      key: `td${id}${indexCol}`,
                      duration: props.duration
                    });

                    let value = column.data[0] ? column.data[0].value : '',
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

TableCard.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default TableCard;
