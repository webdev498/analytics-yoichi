import React from 'react';

class WorldMapLegends extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', margin: '0px auto'}}>
        <div style={{width: '38%'}}></div>
        <div style={{width: '10%'}}>
          <span style={{fontSize: '10px', color: '#6b7282', whiteSpace: 'nowrap'}}>Secure Connections</span><br />
          <div style={{display: 'flex', flexWrap: 'nowrap'}}>
            <div style={{backgroundColor: '#2BD8D0', width: '20px', height: '12px'}}></div>
            <div style={{backgroundColor: '#51DFD8', width: '20px', height: '12px'}}></div>
            <div style={{backgroundColor: '#71E5DF', width: '20px', height: '12px'}}></div>
            <div style={{backgroundColor: '#97ECE8', width: '20px', height: '12px'}}></div>
            <div style={{backgroundColor: '#BAF2F0', width: '20px', height: '12px'}}></div>
            <div style={{backgroundColor: '#DBF8F7', width: '20px', height: '12px'}}></div>
          </div>
        </div>
        <div style={{marginTop: '30px', 'marginLeft': '-10%'}}>
          <span style={{fontSize: '10px', color: '#6b7282'}}>More</span>
          <span style={{fontSize: '10px', color: '#6b7282', marginLeft: '48px'}}>Less</span>
        </div>
        <div style={{width: '4%'}}></div>
        <div style={{width: '10%'}}>
          <span style={{fontSize: '10px', color: '#6b7282', whiteSpace: 'nowrap'}}>Malicious Connections</span><br />
          <div style={{display: 'flex', flexWrap: 'nowrap'}}>
            <div style={{backgroundColor: '#F69275', width: '20px', height: '12px'}}></div>
            <div style={{backgroundColor: '#F7A48B', width: '20px', height: '12px'}}></div>
            <div style={{backgroundColor: '#F9B6A2', width: '20px', height: '12px'}}></div>
            <div style={{backgroundColor: '#F8CABB', width: '20px', height: '12px'}}></div>
            <div style={{backgroundColor: '#FCDBD2', width: '20px', height: '12px'}}></div>
            <div style={{backgroundColor: '#FEEDE8', width: '20px', height: '12px'}}></div>
          </div>
        </div>
        <div style={{marginTop: '30px', 'marginLeft': '-10%'}}>
          <span style={{fontSize: '10px', color: '#6b7282'}}>More</span>
          <span style={{fontSize: '10px', color: '#6b7282', marginLeft: '48px'}}>Less</span>
        </div>
        <div style={{width: '38%'}}></div>
      </div>
    );
  }
}

export default WorldMapLegends;
