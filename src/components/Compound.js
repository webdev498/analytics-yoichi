import React from 'react';

const styles = {
  wrap: {
    display: 'flex'
  }
};

function getChild(child, props) {
  const data = child.props.data || props.data;
  return React.cloneElement(child, {...child.props, data, duration: props.duration});
}

class CompoundCard extends React.Component {
  render() {
    const {props} = this;
    let children = props.children;
    let compoundCardStyle;

    if (props.meta.parentWrap !== false) {
      children = children.props.children;
    }

    compoundCardStyle = Object.assign({}, styles.wrap, props.innerStyle);

    console.log(compoundCardStyle, props.innerStyle);

    return (
      <div style={compoundCardStyle}>
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
