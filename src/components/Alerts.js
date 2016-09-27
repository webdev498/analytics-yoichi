import React from 'react';
import Card from 'material-ui/Card/Card';
import {Colors} from 'theme/colors';
import {
  getEventTypeString
} from 'utils/utils';
import {
  getSourceDestination,
  getDetails
} from 'utils/timelineUtils';

class Alerts extends React.Component {
  render() {
    const {props} = this;
    // Please Note: This is NOT yet completed. This component is using for displaying alerts in Timeline view
    // for asset details page.
    return (
      <Card style={{
        boxShadow: '1px 1px 0 #cccccc',
        padding: '10px',
        height: '215px',
        width: '500px',
        backgroundColor: Colors.white,
        border: '1px solid #cbcbd1',
        fontSize: '14px',
        marginBottom: '20px'}} key={props.id}>
        {/*<div style={{fontSize: '13pt', Color: Colors.grape, fontWeight: '600'}}>
          {getSourceDestination(props.data)}
        </div>
        <div style={{fontSize: '13pt', color: Colors.grape, fontWeight: 'lighter'}}>
          Type: {getEventTypeString(props.data.type)}
        </div>
        <div style={{fontSize: '13pt', color: Colors.grape, fontWeight: 'lighter'}}>
          {getDetails(props.data)}
        </div>*/}
      </Card>
    );
  }
}

export default Alerts;
