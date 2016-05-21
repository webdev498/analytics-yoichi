import React from 'react';
import ParentCard from 'containers/ParentCard';

//Initilization of variables
let tableProperties = {};
let tableDataSource = [];

const generateDataSource = (props) => {
  //Initilization of variables
  tableProperties = {};
  tableDataSource = [];

  if(!props.data) {
    return;
  }
}
function getElm(props) {
  const elm = props.children[0];
  return React.cloneElement(props.children[0]);
}
const compoundCard = (props) => (
  <div style={{width:'100%'}}>
      {/*<div>
        {getElm(props)}
      </div>*/}
      {props.children.map(function(child, index){
        return (
          <div>
            {React.cloneElement(props.children[index])}
          </div>
        );
      })}
  </div>
);

export default compoundCard;
