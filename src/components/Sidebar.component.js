import React from 'react';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

const Sidebar = (props) => (
  <LeftNav open={props.open} style={{top: '64px'}}>
    <MenuItem>Alert Details</MenuItem>
    <MenuItem>Country Details</MenuItem>
    <MenuItem>Traffic Details</MenuItem>
    <MenuItem>Asset Details</MenuItem>
    <MenuItem>User-Agent Details</MenuItem>
  </LeftNav>
)

export default Sidebar;