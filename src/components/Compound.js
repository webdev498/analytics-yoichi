import React from 'react';

function getChild(child, props) {
  return React.cloneElement(child, {...child.props, data: props.data, duration: props.duration});
}

class CompoundCard extends React.Component {
  render() {
    const {props} = this;
    return (
      <div style={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
        {
          props.children.props.children.map((child, index) => {
            return getChild(child, props);
          })
        }
      </div>
    );
  }
}

export default CompoundCard;
