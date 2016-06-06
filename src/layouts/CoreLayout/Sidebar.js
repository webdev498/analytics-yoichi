import React from 'react';

import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import AlertIcon from 'material-ui/svg-icons/image/flash-auto';
import TrafficIcon from 'material-ui/svg-icons/action/flight-takeoff';
import CountryIcon from 'material-ui/svg-icons/action/language';
import AssetsIcon from 'material-ui/svg-icons/action/important-devices';
import UserAgentIcon from 'material-ui/svg-icons/action/dns';

const Sidebar = (props) => (
  <LeftNav open={true} containerStyle={{...props.style, position: 'fixed', top: '64px'}}>
    <MenuItem leftIcon={<AlertIcon />}>Alert Details</MenuItem>
    <MenuItem leftIcon={<CountryIcon />}>Country Details</MenuItem>
    <MenuItem leftIcon={<TrafficIcon />}>Traffic Details</MenuItem>
    <MenuItem leftIcon={<AssetsIcon />}>Asset Details</MenuItem>
    <MenuItem leftIcon={<UserAgentIcon />}>User-Agent Details</MenuItem>
  </LeftNav>
)

export default Sidebar;