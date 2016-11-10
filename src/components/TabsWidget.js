import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Colors} from 'theme/colors';

const styles = {
  tab: {
    backgroundColor: Colors.cloudShades[0],
    color: Colors.grape // ,
    // height: '34px'
  }
};

class TabsWidget extends React.Component {
  // handleTabChange() {
  //   const {props} = this;
  //   return (key) => {
  //     props.onTabChange(key);
  //   };
  // }

  handleTabChange = (value) => {
    const {props} = this;
    props.onTabChange(value);
  };

  render() {
    const {props} = this;
    return (
      <Tabs style={props.style}>
        {
          props.tabNames.map((tab, index) => {
            return (
              <Tab key={index} label={tab} style={styles.tab} onActive={props.onTabChange}>
                <div />
              </Tab>
            );
          })
        }
      </Tabs>
    );
  }
}

export default TabsWidget;
