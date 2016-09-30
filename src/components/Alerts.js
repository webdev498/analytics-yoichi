import React from 'react';
import Card from 'material-ui/Card/Card';
import {Colors} from 'theme/colors';
import {
  getDetails
} from 'utils/timelineUtils';

let alertStyle = {
  border: '1px solid #cbcbd1'
};

class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.handleRankAlertClick = this.handleRankAlertClick.bind(this);
  }

  handleRankAlertClick() {
    const {props} = this;

    return () => {
      if (props.data.type.toLowerCase() === 'rank_alert') {
        const url = `/alert-new/${props.data.id}/${props.data.date}`;
        props.updateRoute(url);
      }
    };
  }

  render() {
    const {props} = this;
    if (props.data.type.toLowerCase() === 'alert' || props.data.type.toLowerCase() === 'rank_alert') {
      let borderColor = Colors.cherry,
        score = props.data.data[props.data.type].score;
      if (score >= 65) {
        borderColor = Colors.cherry;
      }
      if (score < 65 && score >= 35) {
        borderColor = Colors.coral;
      }
      if (score < 35) {
        borderColor = Colors.mustard;
      }

      alertStyle = {
        borderLeft: '5px solid ' + borderColor
      };
    }
    else {
      alertStyle = {
        borderLeft: '1px solid #cbcbd1'
      };
    }

    return (
      <Card style={Object.assign({
        boxShadow: '1px 1px 0 #cccccc',
        padding: '10px',
        height: 'auto',
        width: '450px',
        backgroundColor: Colors.white,
        border: '1px solid #cbcbd1',
        fontSize: '14px',
        cursor: 'pointer',
        marginBottom: '20px'}, alertStyle)} key={props.id} onClick={this.handleRankAlertClick()}>
        {getDetails(props.data)}
      </Card>
    );
  }
}

export default Alerts;
