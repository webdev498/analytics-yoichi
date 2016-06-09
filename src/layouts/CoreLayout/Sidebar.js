import React from 'react';
import { Link } from 'react-router'

import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import AlertIcon from 'material-ui/svg-icons/image/flash-auto';
import TrafficIcon from 'material-ui/svg-icons/action/flight-takeoff';
import CountryIcon from 'material-ui/svg-icons/action/language';
import AssetsIcon from 'material-ui/svg-icons/action/important-devices';
import UserAgentIcon from 'material-ui/svg-icons/action/dns';

const Sidebar = (props) => (
  <LeftNav open={true} containerStyle={{...props.style, position: 'fixed', top: '64px'}}>
    <Link to='/dashboard/alert'>
      <MenuItem leftIcon={<AlertIcon />}>
        Alert Details
      </MenuItem>
    </Link>
    <Link to='/dashboard/country'>
      <MenuItem leftIcon={<CountryIcon />}>
        Country Details
      </MenuItem>
    </Link>
    <Link to='/dashboard/traffic'>
      <MenuItem leftIcon={<TrafficIcon />}>
        Traffic Details
      </MenuItem>
    </Link>
    <Link to='/dashboard/asset'>
      <MenuItem leftIcon={<AssetsIcon />}>
        Asset Details
      </MenuItem>
    </Link>
    <Link to='/dashboard/user-agent'>
      <MenuItem leftIcon={<UserAgentIcon />}>
        User-Agent Details
      </MenuItem>
    </Link>
  </LeftNav>
)

export default Sidebar;