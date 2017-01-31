import React, {PropTypes} from 'react';
import {Colors} from '../../../commons/colors';

import Reactable from 'reactable';
const {Table, Thead, Th, Tr, Td} = Reactable;

const styles = {
  wrap: {
    backgroundColor: Colors.white,
    width: '100%',
    overflow: 'auto'
  }
};

import {firstCharCapitalize} from '../../../commons/utils/utils';
import './_table.scss';

export default class DetailsTable extends React.Component {
  static propTypes = {
    style: PropTypes.object.isRequired
  }

  getData(data) {
    const {columns, rows} = data;
    let header = columns.map(col => col.displayName);

    const list = rows.map(row => header.map((c, i) => ({title: c, value: row[i]})));

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

  render() {
    const {props} = this;
    const style = Object.assign({}, styles.wrap, props.style);
    if (!props.detailsState) return null;

    const {list, header} = this.getData(props.detailsState);
    let itemsPerPage = props.details && props.details.itemsPerPage ? props.details.itemsPerPage : 3;

    return (
      <div style={style} className='details-scrollbar'>
        <Table
          style={{width: '100%'}}
          className='detailsTable'
          pageButtonLimit={5}
          itemsPerPage={list.length > itemsPerPage ? itemsPerPage : 0}
          currentPage={0}
          hideFilterInput
          previousPageLabel={'<<'}
          nextPageLabel={'>>'}
          sortable
          defaultSort={{
            column: firstCharCapitalize(header[0].dataKey),
            direction: 'desc'
          }}>
          <Thead>
            {
              header.map((col, i) => (
                <Th key={`th${i}`}>{firstCharCapitalize(col.dataKey)}</Th>
              ))
            }
          </Thead>
          {
            list.map((row, i) => (
              <Tr key={`tr${i}`}>
                {
                  row.map((col, i) => (
                    <Td column={firstCharCapitalize(col.title)}
                      value={col.value}
                      key={`td${i}`}>
                      {col.value}
                    </Td>
                  )
                )}
              </Tr>
          )
          )}
        </Table>
      </div>
    );
  }
}
