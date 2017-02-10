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
    id: PropTypes.string,
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

  getData(data) {
    const {columns, rows} = data;
    let header = columns.map(col => col.displayName);

    const list = rows.map(row => header.map((c, i) => {
      let value = row[i];
      if (columns[i].dataType === 'OBJECT') {
        value = JSON.stringify(value);
      };
      return {title: c, value};
    }));

    header = header.map(head => {
      let label = head.split('.');
      label = label[label.length - 1];

      return {
        label,
        dataKey: head
      };
    });

    return {
      list,
      header
    };
  }

  onPageChange(page) {
    const {props} = this;
    let {apiObj} = props,
      {detailsData, lastPage} = this.paginationDetails,
      currentPage = page + 1;
    if (currentPage === lastPage && detailsData.total > fetchLimit && detailsData.total > detailsData.rows.length) {
      this.currentPage = page;
      apiObj.api.queryParams.from = detailsData.next;

      props.fetchNextSetOfData(apiObj, detailsData.rows);
    }
  }

  render() {
    const {props, props: {details, detailsData}} = this;
    const style = Object.assign({}, styles.wrap, props.style);

    if (!detailsData) return null;

    const data = this.getData(detailsData),
      {list, header} = data;
    let itemsPerPage = details && details.itemsPerPage ? details.itemsPerPage : 5,
      lastPage = Math.ceil(list.length / itemsPerPage),
      columnNames = [];
    this.paginationDetails = {
      detailsData,
      lastPage
    };

    header.forEach((col) => {
      columnNames.push((col.dataKey).toUpperCase());
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
                      <Td column={(col.title).toUpperCase()}
                        value={col.value}
                        key={(col.title).toUpperCase()}>
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
