import React from 'react';
import Card from 'material-ui/Card/Card';
import {Colors} from 'theme/colors';
import {
  getDetails
} from 'utils/timelineUtils';

class TrafficEvents extends React.Component {
  render() {
    const {props} = this;
    return (
      <Card style={{
        boxShadow: '1px 1px 0 #cccccc',
        padding: '10px',
        height: 'auto',
        width: '500px',
        backgroundColor: Colors.white,
        border: '1px solid #cbcbd1',
        fontSize: '14px',
        marginBottom: '20px'}} key={props.id}>
          {getDetails(props.data)}
      </Card>
    );
  }
}

export default TrafficEvents;
