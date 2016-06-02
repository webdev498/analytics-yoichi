import React from 'react';

function getChild(child, props) {alert("test");
  return React.cloneElement(child, {...child.props, data: props.data});
}

const compoundCard = (props) => (
  <div style={{width:'100%',display:'flex',flexWrap:'wrap'}}>{console.log(props)}
    {
      props.children.props.children.map((child, index) => {
        return getChild(child, props)
      })
    }
  </div>
);

export default compoundCard;
