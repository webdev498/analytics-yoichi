import React from 'react';

const styles = {
  wrap: {
    display: 'flex'
  }
};

function getChild(child, props, index) {
  const data = child.props.data || props.data;
  const id = child.props.id || props.id;
  return React.cloneElement(child, {...child.props, data, duration: props.duration, key: id + '' + index});
}

class WrapperCard extends React.Component {
  render() {
    const {props} = this;
    let children = props.children;
    let compoundCardStyle;

    if (props.meta.parentWrap !== false) {
      children = children.props.children;
    }

    compoundCardStyle = Object.assign({}, styles.wrap, props.innerStyle);

    return (
      <div style={compoundCardStyle}>
        {
          children.map((child, index) => getChild(child, props, index))
        }
      </div>
    );
  }
}

export default WrapperCard;
