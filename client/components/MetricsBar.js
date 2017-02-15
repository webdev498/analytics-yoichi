import React from 'react';
import ParentCard from 'containers/ParentCard';
import MetricsCard from 'components/MetricsCard';

const styles = {
  wrap: {
    display: 'flex'
  }
};

class MetricsBar extends React.Component {
  static propTypes = { }

  render() {
    const { props } = this;

    return (
      <div style={styles.wrap}>
        {props.childrenComponent.map(child => {
          return (
            <ParentCard {...child} key={child.id}>
              <MetricsCard />
            </ParentCard>
          );
        })}
      </div>
    );
  }
}

export default MetricsBar;
