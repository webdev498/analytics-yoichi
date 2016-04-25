import React from 'react';

import CardHeader from 'material-ui/lib/card/card-header';

const CustomCardHeader = (props) => (
  <CardHeader {...props}
            style={{backgroundColor: '#00bcd4', height: '56px'}}
            titleStyle={{color: 'white', fontSize: '20px'}}/>
);

export default CustomCardHeader;