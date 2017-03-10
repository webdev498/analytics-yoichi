import React, {PropTypes} from 'react';
import {Colors} from '../../../commons/colors';
import PercentageWidget from 'components/widgets/PercentageWidget';

const styles = {
  pieChart: {
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    width: '230px',
    height: '230px'
  },
  pieWrap: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '0px',
    justifyContent: 'center',
    height: '400px',
    marginTop: '-30px'
  },
  chartPosition: {
    position: 'absolute',
    borderRadius: '50%',
    top: '55px',
    left: '55px',
    width: '120px',
    height: '120px',
    background: Colors.white
  },
  percentage: {
    label: {
      display: 'block',
      textAlign: 'center',
      fontSize: '12px',
      lineHeight: '35px',
      color: Colors.white,
      marginTop: '-43px',
      paddingLeft: '40px'
    },
    legend: {
      fontSize: '35px',
      color: Colors.bar
    }
  },
  sliceOne: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clip: 'rect(0 230px 115px 0)'
  },
  sliceTwo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clip: 'rect(0 115px 230px 0)'
  },
  legends: {
    title: {
      fontSize: '13px',
      color: Colors.pebble
    },
    label: {
      fontSize: '13px',
      color: Colors.smoke,
      paddingTop: '20px',
      paddingBottom: '20px'
    }
  }
};

class PieChart extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    attributes: PropTypes.object
  }

  renderChart1() {

  }

  renderChart() {
    const {attributes} = this.props;
    const dataSource = {
      'chart': {
        'showBorder': '0',
        'use3DLighting': '0',
        'enableSmartLabels': '0',
        'startingAngle': '90',
        'showLabels': '0',
        'showPercentValues': '0',
        'showLegend': '0',
        'showTooltip': '0',
        'decimals': '0',
        // 'useDataPlotColorForLabels': '1',
        'theme': 'fint',
        chartLeftMargin: '0',
        chartRightMargin: '0',
        chartBottomMargin: '0',
        showValue: '0',
        bgcolor: Colors.white
      },
      'data': [
        {
          'value': '96'
        },
        {
          'value': '4'
        }
      ]
    };
    FusionCharts.ready(function() {
      let fusioncharts = new FusionCharts({
        type: 'doughnut2d',
        renderAt: attributes.id,
        width: 400, // || '100%',
        height: 400, // || '200',
        dataFormat: 'json',
        containerBackgroundOpacity: '0',
        dataSource
      });
      fusioncharts.render();
    });
  }

  render() {
    const {props} = this;

    if (!props.data || !props.data.pieProps) {
      return (<div />);
    }

    // Here, pieProps and pieJson are coming from PieChart data abstraction layer, hence it is in 'data' object.
    const {attributes, data: {pieProps, pieJson: {chart: {legends}}}} = props;

    return (
      <div>
        <div style={styles.pieWrap}>
          <div id={attributes.id}>{this.renderChart()}</div>
          <div>
            <div style={{...styles.pieChart, ...pieProps.styles.background}}>
              <div style={{...styles.sliceOne, ...pieProps.styles.sliceOne}} />
              <div style={{...styles.sliceTwo, ...pieProps.styles.sliceTwo}} />
              <div style={styles.chartPosition}>
                <span style={{...styles.percentage.label, ...pieProps.styles.percentageText}}>
                  {pieProps.piePercentage}%
                </span>
              </div>
            </div>
          </div>
          <div style={{paddingLeft: '50px', paddingRight: '50px'}}>
            <PercentageWidget iconName='desktop_mac' percentage={pieProps.assetPercentage} />
          </div>
          <div>
            <ul style={{listStyle: 'none'}}>
              <li style={styles.percentage.legend}>{pieProps.piePercentage}%</li>
              <li style={styles.legends.title}>{legends.title[0]}</li>
              <li style={styles.legends.label}>{legends.label}</li>
              <li style={styles.percentage.legend}>{pieProps.assetPercentage}%</li>
              <li style={styles.legends.title}>{legends.title[1]}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PieChart;
