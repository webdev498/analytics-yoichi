import React, {PropTypes} from 'react';
import ScoreWidget from 'components/ScoreWidget';

const styles = {
  wrap: {
    display: 'flex'
  },
  summaryTitle: {
    margin: 0
  },
  rankScore: {
    flex: '0 0 50px'
  },
  summaryWrap: {
    marginLeft: '10px'
  }
};

class SummaryWidget extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const {props: {data}} = this;

    return (
      <div style={styles.wrap}>
        <ScoreWidget style={styles.rankScore} scoreValue={data.score} />
        <div style={styles.summaryWrap}>
          <h5 style={styles.summaryTitle}>
            Summary
          </h5>
          <div>
            {data.message}
          </div>
        </div>
      </div>
    );
  }
}

export default SummaryWidget;
