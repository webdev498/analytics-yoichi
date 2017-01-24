import React, {PropTypes} from 'react';
import {Colors} from '../../commons/colors';

import Reactable from 'reactable';
const {Table, Thead, Th, Tr, Td} = Reactable;

import 'react-virtualized/styles.css'; // only needs to be imported once

const styles = {
  wrap: {
    backgroundColor: Colors.white,
    width: '100%',
    overflow: 'auto'
  }
};

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
    if (!props.details) return null;

    const {list, header} = this.getData(props.details);

    return (
      <div style={style}>
        <Table
          style={{width: '100%'}}
          className='threatTable'
          pageButtonLimit={5}
          currentPage={0}
          hideFilterInput
          previousPageLabel={'<<'}
          nextPageLabel={'>>'}>
          <Thead>
            {
              header.map((col, i) => (
                <Th key={`th${i}`}>{col.dataKey}</Th>
              ))
            }
          </Thead>
          {
            list.map((row, i) => (
              <Tr key={`tr${i}`}>
                {
                  row.map((col, i) => (
                    <Td column={col.title}
                      value={col.value}
                      style={{width: '20%'}}
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
