import React from 'react';

import CardHeader from 'material-ui/Card/CardHeader';

const getStyles = (props) => (
  {
    backgroundColor: '#00bcd4',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1101,
    top: 0,
    width: '100%',
    ...props.style
  }
)

const getTitleStyle = props => (
  {color: 'white', fontSize: '20px', fontWeight: 300, ...props.titleStyle}
)

const CustomCardHeader = (props) => (
  <CardHeader {...props}
            style={getStyles(props)}
            titleStyle={getTitleStyle(props)}>
    {props.children}
  </CardHeader>
);

export default CustomCardHeader;