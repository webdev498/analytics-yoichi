import React from 'react';

import CardHeader from 'material-ui/lib/card/card-header';

const getStyles = (props) => {
  return {
    backgroundColor: '#00bcd4',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1101,
    top: 0,
    width: '100%',
    ...props.style
  };
}

const CustomCardHeader = (props) => (
  <CardHeader {...props}
            style={getStyles(props)}
            titleStyle={{color: 'white', fontSize: '20px', fontWeight: 300, ...props.titleStyle}}>
    {props.children}
  </CardHeader>
);

export default CustomCardHeader;