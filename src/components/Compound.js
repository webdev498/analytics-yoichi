import React from 'react';
import ParentCard from 'containers/ParentCard';

function getChild(child, props) {
  return React.cloneElement(child, {...child.props, data: props.data, duration: props.duration});
  /* return (
    <div style={{width: '100%', border: '1px solid green'}}>
      {React.cloneElement(child, {...child.props, data: props.data, duration: props.duration})}
    </div>
  );*/
}

function getChildCompoundChildren(child, props) {
  child.props.children.map((child, index) => {
    return (
      <div> </div>
    );
  });
  /* return (
    <div style={{width: '100%', border: '1px solid green'}}>
      {React.cloneElement(child, {...child.props, data: props.data, duration: props.duration})}
    </div>
  );*/
}
// {getChildCompoundChildren(child, props)}
class CompoundCard extends React.Component {
  render() {
    const {props} = this;
    // console.log(props);
    return (
      <div style={{width: '100%', display: 'flex', flexWrap: 'nowrap'}}>
        {
          props.children.props.children.map((child, index) => {
            // console.log(child.props.childCompound);
            if (child.props.childCompound) {
              let children = [];
              const grandChildrenArray = [],
                componentDetails = child.props,
                elm = React.createFactory(require('components/' + componentDetails.type).default, null);

              if (componentDetails.children) {
                const grandChildren = componentDetails.children;
                // console.log(grandChildren.length);

                for (let k = 0, grandChildrenLen = grandChildren.length; k < grandChildrenLen; k++) {
                  const grandChildElm = grandChildren[k];

                  if (componentDetails.name === 'Compound') {
                    const elmSub = React.createFactory(require('components/' + grandChildElm.type).default);
                    const componentElmSub = elmSub({...grandChildElm}, []);
                    grandChildrenArray.push(componentElmSub);
                  }
                }
              }
              const componentElm = elm({...componentDetails.attributes}, grandChildrenArray);
              const ParentCardElement = React.createElement(ParentCard, {...componentDetails}, componentElm);

              children.push(ParentCardElement);

              return (
                <div style={{display: 'flex', flexFlow: 'column'}}>
                  {React.createElement(ParentCard, {...componentDetails}, componentElm)}
                </div>
              );
            }
            else {
              return getChild(child, props);
            }
          })
        }
      </div>
    );
  }
}

export default CompoundCard;
