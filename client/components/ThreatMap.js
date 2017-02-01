import React, {PropTypes} from 'react';
import WorldMap from 'components/maps/WorldMap';
import HorizontalBarChart from 'components/charts/HorizontalBarChart';

class ThreatMap extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    const {props} = this,
      {data, chart, showDetailsTable} = props;

    if (!data) return null;

    return (
      <div style={{display: 'flex'}}>
        <div style={{width: '70%'}}>
          <WorldMap
            meta={chart.worldMap.meta}
            attributes={chart.worldMap.attributes}
            data={data}
            chartOptions={chart.worldMap.chartOptions}
            chartData={chart.worldMap.chartData}
            showDetailsTable={showDetailsTable} />
        </div>
        <div style={{width: '30%'}}>
          <HorizontalBarChart
            meta={chart.legend1.meta}
            attributes={chart.legend1.attributes}
            data={data}
            chartOptions={chart.legend1.chartOptions}
            chartData={chart.legend1.chartData} />
          <HorizontalBarChart
            meta={chart.legend2.meta}
            attributes={chart.legend2.attributes}
            data={data}
            chartOptions={chart.legend2.chartOptions}
            chartData={chart.legend2.chartData} />
        </div>
      </div>
    );
  }
}

export default ThreatMap;
