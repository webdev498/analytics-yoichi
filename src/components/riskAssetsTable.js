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

class riskAssetsTable extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    updateRoute: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(row) {
    return () => {
      this.props.updateRoute(`/asset/${row[0].type}/${row[0].id}`);
    };
  }

  getTableRows(rows) {
    return rows.map((row, index) => {
      const details = row[0];

      return (
        <Tr key={`riskAssetsTable${index}`} style={{backgroundColor: 'transparent', cursor: 'pointer'}}
          onClick={this.handleClick(row)} >
          <Td column='asset' style={{padding: '15px 0'}}>
            <AssetWidget data={details}
              headingStyle={{width: '110px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} />
          </Td>
          <Td column='score' style={{padding: '15px 0', width: '60px', textAlign: 'right'}}>
            <ScoreWidget scoreValue={details.risk.score} inverse />
          </Td>
        </Tr>
      );
    });
  }

  render() {
    const {props} = this;
    if (!props.data) return null;

    return (
      <div style={styles.card}>
        <Table style={{width: '100%'}}
          className='threatTable'
          pageButtonLimit={5}
          currentPage={0}
          itemsPerPage={5}
          previousPageLabel={'<<'}
          nextPageLabel={'>>'}>
          <Thead>
            <Th style={{width: '100px', padding: 0}} column='asset'>ASSET</Th>
            <Th style={{width: '50px', padding: 0}} column='score'>SCORE</Th>
          </Thead>
          {this.getTableRows(props.data.rows)}
        </Table>
      </div>
    );
  }
}

export default riskAssetsTable;
