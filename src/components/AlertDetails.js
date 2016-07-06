import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';

const styles = {
  card: {
    display: 'flex'
  },
  rankScore: {
    height: '100px',
    width: '100px',
    lineHeight: '100px',
    fontSize: '35px',
    fontWeight: '600',
    borderRadius: '50%',
    backgroundColor: Colors.coral,
    color: Colors.arctic,
    textAlign: 'center'
  },
  list: {
    listStyleType: 'none',
    fontSize: '13px'
  },
  item: {
    padding: '3px'
  },
  itemTitle: {
    width: '100px',
    display: 'inline-block'
  }
};

class AlertDetails extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  getSource(source) {
    let str = '';
    if (source) {
      str += source.ip ? `From IP ${source.ip} ` : '';
      str += source.port ? `:${source.port} ` : '';
      str += source.country ? `(${source.country}) ` : '';

      if (source.additionalInfo) {
        str += source.additionalInfo.user ? `initiated by ${source.additionalInfo.user} ` : '';
        str += source.additionalInfo.machine ? `on machine ${source.additionalInfo.machine} ` : '';
      }
    }
    return str;
  }

  getDestination(destination) {
    let str = '';

    if (destination) {
      str += destination.ip ? `to IP ${destination.ip} ` : '';
      str += destination.port ? `:${destination.port} ` : '';
      str += destination.country ? `(${destination.country}) ` : '';

      if (destination.additionalInfo) {
        str += destination.additionalInfo.user ? `user ${destination.additionalInfo.user} ` : '';
        str += destination.additionalInfo.machine ? `on machine ${destination.additionalInfo.machine} ` : '';
      }
    }

    return str;
  }

  render() {
    if (!this.props.data) return null;

    const data = this.props.data.data.rank_alert;

    const {source, destination} = this.props.data;

    return (
      <div style={styles.card}>
        <div style={styles.rankScore}>
          {data.score}
        </div>
        <div style={styles.details}>
          <ul style={styles.list}>
            <li style={styles.item}>
              <b style={styles.itemTitle}>
                Date
              </b>
              <span>{data.created}</span>
            </li>
            <li style={styles.item}>
              <b style={styles.itemTitle}>
                Description
              </b>
              <span>{data.description}</span>
            </li>
            <li style={styles.item}>
              <b style={styles.itemTitle}>
                Message
              </b>
              <span>{data.message}</span>
            </li>
            <li style={styles.item}>
              <b style={styles.itemTitle}>
                Details
              </b>

              <span>
                {this.getSource(source)}
              </span>

              <span>
                {this.getDestination(destination)}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AlertDetails;
