import React from 'react';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import AlertIcon from 'material-ui/lib/svg-icons/image/flash-auto';
import TrafficIcon from 'material-ui/lib/svg-icons/action/flight-takeoff';
import CountryIcon from 'material-ui/lib/svg-icons/action/language';
import AssetsIcon from 'material-ui/lib/svg-icons/action/important-devices';
import UserAgentIcon from 'material-ui/lib/svg-icons/action/dns';

const Sidebar = (props) => (
  <LeftNav open={props.open} style={{top: '64px'}}>
    <MenuItem leftIcon={<AlertIcon />}>Alert Details</MenuItem>
    <MenuItem leftIcon={<CountryIcon />}>Country Details</MenuItem>
    <MenuItem leftIcon={<TrafficIcon />}>Traffic Details</MenuItem>
    <MenuItem leftIcon={<AssetsIcon />}>Asset Details</MenuItem>
    <MenuItem leftIcon={<UserAgentIcon />}>User-Agent Details</MenuItem>
  </LeftNav>
)

export default Sidebar;