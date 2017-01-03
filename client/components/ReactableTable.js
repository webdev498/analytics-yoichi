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

function loadChartComponentInTableRow(tableColumn, duration) {
  switch (tableColumn.chartType) {
    case 'area2d':
      console.log('tableColumn', tableColumn);
      return (
        <Area2DAsSparkLineChart chartProperties={tableColumn} duration={duration} />
      );
    case 'assetIcon':
      return (
        <AssetIcon asset={tableColumn} />
      );
    default:
      break;
  }
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

  displayCountryFlag(data) {
    let countryFlag = countryName[data.value];
    countryFlag = countryFlag ? 'flag-icon flag-icon-' + countryFlag.toLowerCase() : '';
    return (
      <span className={countryFlag} rel='tooltip' title={data.value} />
    );
  }

  displayText(data) {
    return (
      <div>
        {data.map((text, index) => {
          return (
            <div>
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
                ? this.displayCountryFlag(text)
                : null
              }
            </div>
          );
        })}
      </div>
    );
  }

  loadTable() {
    const {props} = this;
    if (!props.data) {
      return;
    }
    const {data, attributes} = props,
      {tableJson: {tableOptions}, normalizeData} = data,
      id = attributes.id;

    console.log(props);

    return (
      <div>
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
          previousPageLabel={'<<'} nextPageLabel={'>>'}>
          {
            normalizeData.map((row, index) => {
              return (
                <Tr onClick={this.handleRowClick(row, index)}
                  style={{'cursor': 'pointer'}}
                  key={`tr${id}${index}`}>
                  {row.columns.map((column, indexCol) => {
                    if (column.type === 'chart') {
                      return (
                        <Td column={column.name}
                          value={column.data[0].value}
                          style={column.style}
                          key={`td${id}${indexCol}`}>
                          {loadChartComponentInTableRow(column, props.duration)}
                        </Td>
                      );
                    }
                    if (column.type === 'durationWidget') {
                      return (
                        <Td column={column.name}
                          value={column.data[0].sortValue}
                          style={column.style}
                          key={`td${id}${indexCol}`}>
                          <DurationWidget timeValue={column.data[0].value} />
                        </Td>
                      );
                    }
                    if (column.type === 'scoreWidget') {
                      return (
                        <Td column={column.name}
                          value={column.data[0].value}
                          style={column.style}
                          key={`td${id}${indexCol}`}>
                          <ScoreWidget scoreValue={column.data[0].value} />
                        </Td>
                      );
                    }
                    if (column.type === 'text') {
                      return (
                        <Td column={column.name}
                          style={{...column.style, 'wordBreak': 'break-all'}}
                          key={`td${id}${indexCol}`}>
                          {this.displayText(column.data)}
                        </Td>
                      );
                    }
                  })}
                </Tr>
              );
            })
          }
        </Table>
      </div>
    );
  }

  render() {
    // console.log(props);

    return (
      <div>
        {this.loadTable()}
      </div>
    );

    // generateDataSource(props);
    /*return (
      <div>
        <Table id={id}
          style={{width: '100%'}}
          className='threatTable'
          sortable={props.tableOptions.sortable}
          filterable={props.tableOptions.filterable}
          defaultSort={props.tableOptions.defaultSort}
          filterBy={props.search}
          itemsPerPage={tableDataSource.length > props.tableOptions.itemsPerPage ? props.tableOptions.itemsPerPage : 0}
          pageButtonLimit={5}
          currentPage={0}
          hideFilterInput
          previousPageLabel={'<<'} nextPageLabel={'>>'}>
          {
            tableDataSource.map(function(tableRow, index) {
              return (
                <Tr onClick={that.handleRowClick(tableRow, index)}
                  style={{'cursor': 'pointer'}}
                  key={`tr${id}${index}`}>
                  {tableRow.columns.map(function(tableColumn, indexCol) {
                    if (tableColumn.columnType === 'chart') {
                      return (
                        <Td column={tableColumn.columnName}
                          value={tableColumn.chartValue}
                          style={tableColumn.columnStyle}
                          key={`td${id}${indexCol}`}>
                          {loadChartComponentInTableRow(tableColumn, props.duration)}
                        </Td>
                      );
                    }
                    if (tableColumn.columnType === 'durationWidget') {
                      return (
                        <Td column={tableColumn.columnName}
                          value={tableColumn.timeValueSort}
                          style={tableColumn.columnStyle}
                          key={`td${id}${indexCol}`}>
                          <DurationWidget timeValue={tableColumn.timeValue} />
                        </Td>
                      );
                    }
                    if (tableColumn.columnType === 'scoreWidget') {
                      return (
                        <Td column={tableColumn.columnName}
                          value={tableColumn.chartValue}
                          style={tableColumn.columnStyle}
                          key={`td${id}${indexCol}`}>
                          <ScoreWidget scoreValue={tableColumn.chartValue} />
                        </Td>
                      );
                    }
                    if (tableColumn.columnType === 'text') {
                      return (
                        <Td column={tableColumn.columnName}
                          style={{...tableColumn.columnStyle, 'wordBreak': 'break-all'}}
                          key={`td${id}${indexCol}`}>
                          {tableColumn.columnText}
                        </Td>
                      );
                    }
                  })}
                </Tr>
              );
            })
          }
        </Table>
      </div>
    );*/
  }
}

TableCard.contextTypes = {
  clickThrough: React.PropTypes.func
};

export default TableCard;
