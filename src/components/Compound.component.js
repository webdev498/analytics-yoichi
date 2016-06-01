import React from 'react';

const compoundCard = (props) => (
  <div style={{width:'100%',display:'flex',flexWrap:'wrap'}}>
      {props.children.map(function(child, index){
        return (
          React.cloneElement(props.children[index], {multiData: props.multiData})
        );
      })}
  </div>
);

export default compoundCard;
