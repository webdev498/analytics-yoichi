import React from 'react';

function getChild(child, props) {
  return React.cloneElement(child, {...child.props, data: props.data, duration: props.duration});
}

const compoundCard = (props) => (
  <div style={{width:'100%',display:'flex',flexWrap:'wrap'}}>
      {
        props.children.props.children.map((child, index) => {
          return getChild(child, props)
        })
      }
  </div>
);

export default compoundCard;
