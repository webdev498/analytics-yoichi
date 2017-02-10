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
};

import './_table.scss';

export default class DetailsTable extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    detailsData: PropTypes.object,
    details: PropTypes.object,
    id: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.paginationDetails = {
      data: {},
      total: 0,
      currentCount: 0,
      lastPage: 0
    };
    this.currentPage = 0;
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.paginationDetails.total !== 0) {
      if (!newProps.detailsData) return null;
      let newDetailsData = this.getData(newProps.detailsData);
      this.paginationDetails.data.rows.concat(newDetailsData.data.rows);
      console.log(this.paginationDetails.data.rows);
    }
  }

  getData(data) {
    const {columns, rows, total, next} = data;
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
      header,
      total,
      next
    };
  }

  onPageChange(page) {
    const {props} = this;
    let {data, total, currentCount, lastPage, next} = this.paginationDetails,
      currentPage = page + 1;
    if (currentPage === lastPage && total > 100) {
      this.currentPage = page;
      console.log(props.fetchApiDataObj);
      let fetchApiDataObj = props.fetchApiDataObj;
      fetchApiDataObj.api.queryParams.from = next;
      props.fetchApiData(fetchApiDataObj);
      // let nextLink = document.createElement('a'),
      //   paginationRow = document.getElementsByClassName('reactable-pagination');
      // paginationRow.id = 'reactable-pagination' + this.props.id;
      // nextLink.class = 'reactable-next-page';
      // nextLink.id = 'tempNext';
      // nextLink.href = '#page-' + (lastPage + 1);

      // document.getElementsByClassName('reactable-pagination')[0].childNodes[0].childNodes[0].appendChild(nextLink);
      // console.log(document.getElementsByClassName('reactable-pagination')[0].childNodes[0].childNodes[0]);
      // nextLink.appendChild(document.createTextNode('>>'));
    }
  }

  render() {
    const {props, props: {details, detailsData}} = this;
    const style = Object.assign({}, styles.wrap, props.style);

    if (!detailsData) return null;

    const data = this.getData(detailsData),
      {list, header, total, next} = data;
    let itemsPerPage = details && details.itemsPerPage ? details.itemsPerPage : 5,
      lastPage = Math.ceil(list.length / itemsPerPage),
      columnNames = [];
    this.paginationDetails = {
      data,
      total,
      currentCount: list.length,
      lastPage,
      actualPageCount: Math.ceil(total / itemsPerPage),
      next
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
