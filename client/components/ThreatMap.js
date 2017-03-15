import React, {PropTypes} from 'react';
import WorldMap from 'components/maps/WorldMap';
import HorizontalBarChart from 'components/charts/HorizontalBarChart';

class ThreatMap extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    const {props} = this,
      {data, chart, showDetailsTable, details} = props;

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
            showDetailsTable={showDetailsTable}
            details={details} />
        </div>
        <div style={{width: '30%'}}>
          <HorizontalBarChart
            meta={chart.legend1.meta}
            attributes={chart.legend1.attributes}
            data={data}
            chartOptions={chart.legend1.chartOptions}
            chartData={chart.legend1.chartData}
            chart={chart.legend1.chart}
            loadAsLegend />
          <HorizontalBarChart
            meta={chart.legend2.meta}
            attributes={chart.legend2.attributes}
            data={data}
            chartOptions={chart.legend2.chartOptions}
            chartData={chart.legend2.chartData}
            chart={chart.legend2.chart}
            loadAsLegend />
        </div>
      </div>
    );
  }
}

export default ThreatMap;
