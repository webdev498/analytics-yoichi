import React from 'react';
import Card from 'material-ui/Card/Card';
import {Colors} from 'theme/colors';
import {
  getDetails
} from 'utils/timelineUtils';

let alertStyle = {
  border: '1px solid #cbcbd1'
};

class TrafficEvents extends React.Component {
  render() {
    const {props} = this;
    if (props.data.type.toLowerCase() === 'alert' || props.data.type.toLowerCase() === 'rank_alert') {
      alertStyle = {
        borderLeft: '5px solid red'
      };
    }
    return (
      <Card style={Object.assign({
        boxShadow: '1px 1px 0 #cccccc',
        padding: '10px',
        height: 'auto',
        width: '500px',
        backgroundColor: Colors.white,
        border: '1px solid #cbcbd1',
        fontSize: '14px',
        marginBottom: '20px'}, alertStyle)} key={props.id}>
          {getDetails(props.data)}
      </Card>
    );
  }
}

export default TrafficEvents;
