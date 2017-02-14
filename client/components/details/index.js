import React, {PropTypes} from 'react';
import {Colors} from '../../../commons/colors';
import {whatIsIt} from '../../../commons/utils/utils';

import Reactable from 'reactable';
const {Table, Tr, Td} = Reactable;

const styles = {
    wrap: {
      backgroundColor: Colors.white,
      width: '100%',
      overflow: 'auto'
    }
  },
  fetchLimit = 100;

import './_table.scss';

export default class DetailsTable extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    detailsData: PropTypes.object,
    details: PropTypes.object,
    fetchNextSetOfData: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.paginationDetails = {
      detailsData: {},
      lastPage: 0
    };
    this.currentPage = 0;
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.detailsData && newProps.detailsData.next === fetchLimit) {
      this.currentPage = 0;
    }
  }

  getData(data) {
    const {columns, rows} = data;
    let list = [],
      hiddenList = [],
      headers = [],
      hiddenHeaders = [];
    columns.forEach((column, index) => {
      if (column.hidden === false) {
        headers.push({name: column.displayName, index});
      }
      else {
        hiddenHeaders.push({name: column.name, index});
      }
    });

    rows.forEach((row, index) => {
      let cols = [],
        hiddenCols = [];
      headers.forEach((header) => {
        row.forEach((value, colIndex) => {
          if (header.index === colIndex) {
            cols.push({name: header.name, value});
          }
        });
      });
      hiddenHeaders.forEach((header) => {
        row.forEach((value, colIndex) => {
          if (header.index === colIndex) {
            hiddenCols.push({name: header.name, value});
          }
        });
      });
      list.push(cols);
      hiddenList.push(hiddenCols);
    });

    return {
      list,
      headers,
      hiddenList
    };
  }

  onPageChange(page) {
    const {props} = this;
    let {apiObj} = props,
      {detailsData, lastPage} = this.paginationDetails,
      currentPage = page + 1;
    if (currentPage === lastPage &&
      detailsData.total > fetchLimit &&
      detailsData.total > detailsData.rows.length) {
      this.currentPage = page;
      apiObj.api.queryParams.from = detailsData.next;
      props.fetchNextSetOfData(apiObj, detailsData.rows);
    }
  }

  render() {
    const {props, props: {details, detailsData}} = this;
    const style = Object.assign({}, styles.wrap, props.style);

    if (!detailsData) return null;

    const {list, headers, hiddenList} = this.getData(detailsData);
    let itemsPerPage = details && details.itemsPerPage ? details.itemsPerPage : 5,
      lastPage = Math.ceil(list.length / itemsPerPage),
      columnNames = [];
    this.paginationDetails = {
      detailsData,
      lastPage
    };

    console.log(list, headers, hiddenList);

    headers.forEach((col) => {
      columnNames.push((col.name).toUpperCase());
    });

    return (
      <div style={style} className='details-scrollbar'>
        {
          list.length > 0
          ? <Table
            style={{width: '100%'}}
            className='detailsTable'
            pageButtonLimit={10}
            itemsPerPage={list.length > itemsPerPage ? itemsPerPage : 0}
            currentPage={this.currentPage}
            hideFilterInput
            previousPageLabel={'<<'}
            nextPageLabel={'>>'}
            sortable
            defaultSort={{
              column: 'DATE',
              direction: 'desc'
            }}
            filterBy={props.search}
            filterable={columnNames}
            onPageChange={this.onPageChange}>
            {
              list.map((row, i) => (
                <Tr key={`tr${i}`}>
                  {
                    row.map((col, i) => (
                      <Td column={(col.name).toUpperCase()}
                        value={col.value}
                        key={(col.name).toUpperCase()}>
                        {
                          whatIsIt(col.value) === 'Object' || whatIsIt(col.value) === 'Array'
                          ? JSON.stringify(col.value)
                          : col.value
                        }
                      </Td>
                    )
                  )}
                </Tr>
              )
            )}
          </Table>
          : <div style={{fontSize: '18px', marginLeft: '33px'}}>No Data Found.</div>
        }
      </div>
    );
  }
}
