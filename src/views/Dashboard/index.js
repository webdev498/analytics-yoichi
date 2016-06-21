import React from 'react';

import Card from 'material-ui/Card/Card';

import AlertIcon from 'material-ui/svg-icons/alert/add-alert';
import BugIcon from 'material-ui/svg-icons/action/bug-report';
import AssetsIcon from 'material-ui/svg-icons/hardware/devices-other';

import ParentCard from 'containers/ParentCard';
import MetricCard from 'components/MetricsCard';
import TableComponent from 'components/Table';

import ParetoChart from 'components/ParetoChart'

const iconStyle = {
  fill: 'rgb(255, 255, 255)',
  height: '50px',
  width: '50px'
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{padding: '20px'}}>
        <section style={{display: 'flex', marginBottom: '20px', justifyContent: 'space-between'}}>
          <ParentCard api='https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_alert_count_time_shifted?window=1d&timeShift=1d'>
            <MetricCard style={{backgroundColor: '#d9534f'}}>
                <AlertIcon style={iconStyle} />
            </MetricCard>
          </ParentCard>

          <ParentCard api='https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_malware_count_time_shifted?window=1d&timeShift=1d'>
            <MetricCard style={{backgroundColor: '#f0ad4e'}}>
                <BugIcon style={iconStyle} />
            </MetricCard>
          </ParentCard>

          <ParentCard api='https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_event_count_time_shifted?window=1d&timeShift=1d'>
            <MetricCard style={{backgroundColor: '#337ab7'}}>
                <BugIcon style={iconStyle} />
            </MetricCard>
          </ParentCard>

          <ParentCard api='https://demo.ranksoftwareinc.com/api/analytics/reporting/execute/taf_asset_count_time_shifted?window=1d&timeShift=1d'>
            <MetricCard style={{backgroundColor: '#5cb85c'}}>
                <AssetsIcon style={iconStyle} />
            </MetricCard>
          </ParentCard>
        </section>

	      <section><ParentCard>
          <TableComponent></TableComponent></ParentCard>
        </section>

        <section style={{display: 'flex'}}>
          <ParentCard>
            <ParetoChart style={{width: '50%', marginRight: '20px'}} id='chart1'/>
          </ParentCard>
        </section>
      </div>
    );
  }
}
