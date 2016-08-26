import React, {PropTypes} from 'react';
import Reactable from 'reactable';
import AssetWidget from 'components/AssetWidget';
import ScoreWidget from 'components/ScoreWidget';

const {Table, Thead, Th, Tr, Td} = Reactable;

const styles = {
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },
  source: {
    fontSize: '15px'
  }
};

function getTableRows(rows) {
  return rows.map((row, index) => {
    const details = row[0];

    return (
      <Tr key={rows.id} style={{backgroundColor: 'transparent'}}>
        <Td column='asset' style={{padding: '15px 0', width: '100%'}}>
          <AssetWidget data={details} />
        </Td>
        <Td column='score' style={{padding: '15px 0', width: '60px', textAlign: 'right'}}>
          <ScoreWidget scoreValue={details.risk.score} inverse />
        </Td>
      </Tr>
    );
  });
}

class riskAssetsTable extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    const {props} = this;
    if (!props.data) return null;

    return (
      <div style={styles.card}>
        <Table style={{width: '100%'}}
          className='threatTable'
          pageButtonLimit={8}
          currentPage={0}
          itemsPerPage={8}
          previousPageLabel={'<<'}
          nextPageLabel={'>>'}>
          <Thead>
            <Th style={{width: '100px', padding: 0}} column='asset'>ASSET</Th>
            <Th style={{width: '50px', padding: 0}} column='score'>SCORE</Th>
          </Thead>
          {getTableRows(props.data.rows)}
        </Table>
      </div>
    );
  }
}

export default riskAssetsTable;
