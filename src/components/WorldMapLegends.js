import React from 'react';
import {Colors} from 'theme/colors';

class WorldMapLegends extends React.Component {
  render() {
    const styles = {
      'legendCaption': {
        fontSize: '10px',
        color: '#6b7282',
        whiteSpace: 'nowrap'
      },
      'more': {
        fontSize: '10px',
        color: '#6b7282'
      },
      'less': {
        fontSize: '10px',
        color: '#6b7282',
        marginLeft: '48px'
      },
      'legendBox': {
        width: '20px',
        height: '12px'
      },
      'secureColors': Colors.worldmapLegendsColor.secure,
      'maliciousColors': Colors.worldmapLegendsColor.malicious
    };

    return (
      <div style={{display: 'flex', flexWrap: 'wrap', margin: '0px auto'}}>
        <div style={{width: '38%'}}></div>
        <div style={{width: '10%'}}>
          <span style={styles.legendCaption}>Secure Connections</span><br />
          <div style={{display: 'flex', flexWrap: 'nowrap'}}>
            <div style={{backgroundColor: styles.secureColors[0], ...styles.legendBox}}></div>
            <div style={{backgroundColor: styles.secureColors[1], ...styles.legendBox}}></div>
            <div style={{backgroundColor: styles.secureColors[2], ...styles.legendBox}}></div>
            <div style={{backgroundColor: styles.secureColors[3], ...styles.legendBox}}></div>
            <div style={{backgroundColor: styles.secureColors[4], ...styles.legendBox}}></div>
            <div style={{backgroundColor: styles.secureColors[5], ...styles.legendBox}}></div>
          </div>
        </div>
        <div style={{marginTop: '30px', 'marginLeft': '-10%'}}>
          <span style={styles.more}>More</span>
          <span style={styles.less}>Less</span>
        </div>
        <div style={{width: '4%'}}></div>
        <div style={{width: '10%'}}>
          <span style={styles.legendCaption}>Malicious Connections</span><br />
          <div style={{display: 'flex', flexWrap: 'nowrap'}}>
            <div style={{backgroundColor: styles.maliciousColors[0], ...styles.legendBox}}></div>
            <div style={{backgroundColor: styles.maliciousColors[1], ...styles.legendBox}}></div>
            <div style={{backgroundColor: styles.maliciousColors[2], ...styles.legendBox}}></div>
            <div style={{backgroundColor: styles.maliciousColors[3], ...styles.legendBox}}></div>
            <div style={{backgroundColor: styles.maliciousColors[4], ...styles.legendBox}}></div>
            <div style={{backgroundColor: styles.maliciousColors[5], ...styles.legendBox}}></div>
          </div>
        </div>
        <div style={{marginTop: '30px', 'marginLeft': '-10%'}}>
          <span style={styles.more}>More</span>
          <span style={styles.less}>Less</span>
        </div>
        <div style={{width: '38%'}}></div>
      </div>
    );
  }
}

export default WorldMapLegends;
