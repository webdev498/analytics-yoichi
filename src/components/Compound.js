import React from 'react';

const styles = {
  wrap: {
    width: '100%',
    display: 'flex'
  }
};

function getChild(child, props) {
  return React.cloneElement(child, {...child.props, data: props.data, duration: props.duration});
}

class CompoundCard extends React.Component {
  render() {
    const {props} = this;
    let children = props.children;
    if (props.meta.parentWrap !== false) {
      children = children.props.children;
    }

    return (
      <div style={{...styles.wrap, ...props.attributes.style}}>
        {
          children.map((child, index) => {
            return getChild(child, props);
          })
        }
      </div>
    );
  }
}

export default CompoundCard;
