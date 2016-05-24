import React from 'react';

const compoundCard = (props) => (
  <div style={{width:'100%'}}>
      {props.children.map(function(child, index){
        return (
          <div>
            {React.cloneElement(props.children[index],
              { multiData: props.multiData})}
          </div>
        );
      })}
  </div>
);
//, sectionTitle: props.childrenJSON[index]['title']
export default compoundCard;
