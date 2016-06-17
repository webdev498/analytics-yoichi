import React from 'react';

const style = {
  width: '100%',
  height: '100%',
  border: 0
}

const Kibana = (props) => (
  <iframe id='kibana-view'
          style={style}
          src={props.src} />
);

export default Kibana;
