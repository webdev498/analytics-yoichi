import React, {PropTypes} from 'react';
import {Colors} from 'theme/colors';
import {
  isUndefined,
  firstCharCapitalize
} from 'utils/utils';

const style = {
  contextualMenu: {
    width: '259px',
    backgroundColor: '#898E9B',
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px'
  },
  searchTextBox: {
    backgroundColor: '#646A7D',
    padding: '10px',
    border: '0px',
    width: '211px',
    height: '40px',
    color: '#B8BBC3',
    fontFamily: 'Open Sans',
    marginTop: '28px',
    marginLeft: '24px',
    marginRight: '24px'
  },
  selectedDetails: {
    marginTop: '28px',
    marginBottom: '28px',
    marginLeft: '24px',
    marginRight: '24px',
    width: '90%',
    color: '#24293D',
    fontSize: '12pt',
    fontFamily: 'Open Sans',
    overflowWrap: 'break-word',
    paddingRight: '20px'
  },
  actionPerformed: {
    top: 0,
    right: '259px',
    fontSize: '12pt',
    position: 'absolute',
    padding: '20px',
    backgroundColor: '#DADADE',
    color: '#24293D',
    display: 'none'
  }
};

let actionPerformed = {
    width: '259px'
  },
  refreshData = {
    marginLeft: '735px'
  };

function checkForUserInputs(parameters) {
  let userInputParameters = [];
  if (!isUndefined(parameters.length)) {
    for (let k = 0; k < parameters.length; k++) {
      let tempObj = {};
      if (parameters[k].userInput === true) {
        tempObj.name = parameters[k].name;
        userInputParameters.push(tempObj);
      }
    }
  }
  return userInputParameters;
}

class ContextualMenu extends React.Component {
  static propTypes = {
    actions: PropTypes.array
  }

  constructor(props) {
    super(props);

    this.collapseExpand = this.collapseExpand.bind(this);
    this.getContextMenu = this.getContextMenu.bind(this);
  }

  getContextMenu(contextMenuType, network, nodeID, nodeType) {
    let {props} = this,
      {nodeObjects, edgeObjects} = props;

    document.getElementById('actions').innerHTML = '';
    let table = document.createElement('table');
    table.border = '0';
    table.width = '259';
    table.cellPadding = '10';
    table.cellSpacing = '10';

    let actionsData = this.props.actions, // this.state.actionsData,
      actionsList = [];

    for (let i = 0; i < actionsData.length; i++) {
      if ((actionsData[i].nodeType).toLowerCase() === nodeType.toLowerCase()) {
        actionsList = Object.assign(actionsList, actionsData[i].actions);
      }
    }

    // Append the actions associated with nodes
    if (!isUndefined(nodeObjects[nodeID]) && !isUndefined(nodeObjects[nodeID].actions) &&
      nodeObjects[nodeID].actions.length > 0) {
      actionsList = Object.assign(actionsList, nodeObjects[nodeID].actions);
    }

    for (let j = 0; j < actionsList.length; j++) {
      /*let parameters = actionsList[j].parameters,
        parametersToApi = [],
        userInputParameters = [],
        linkValueForFullMalwareReport = '';

      if (!isUndefined(parameters.length)) {
        for (let k = 0; k < parameters.length; k++) {
          let tempObj = {};
          if (parameters[k].userInput === false && parameters[k].name !== 'link') {
            tempObj.name = parameters[k].name;
            if (!isUndefined(parameters[k].value)) {
              tempObj.value = parameters[k].value;
            }
            else {
              if (parameters[k].name === 'id') {
                tempObj.value = nodeID;
              }
              else if (parameters[k].name === 'type') {
                tempObj.value = nodeType;
              }
              else if (parameters[k].name === 'date') {
                tempObj.value = this.state.alertDate;
              }
              else if (parameters[k].name === 'ip' && (nodeType.toLowerCase() === 'internal_ip' ||
                nodeType.toLowerCase() === 'external_ip')) {
                tempObj.value = nodeID;
              }
              else if (parameters[k].name === 'source.id') {
                if (!isUndefined(edgeObjects[nodeID])) {
                  tempObj.value = edgeObjects[nodeID].from;
                }
                else {
                  tempObj.value = '';
                }
              }
              else if (parameters[k].name === 'target.id') {
                if (!isUndefined(edgeObjects[nodeID])) {
                  tempObj.value = edgeObjects[nodeID].to;
                }
                else {
                  tempObj.value = '';
                }
              }
              else if ((parameters[k].name).indexOf('metadata') > -1) {
                let paramName = (parameters[k].name).replace('metadata.', ''),
                  metadataValue = nodeObjects[nodeID].metadata[paramName];
                tempObj.value = (!isUndefined(metadataValue)) ? metadataValue : '';
              }
              else {
                tempObj.value = '';
              }
            }

            tempObj.userInput = false;
            parametersToApi.push(tempObj);
          }
          if (parameters[k].userInput === true) {
            tempObj.name = parameters[k].name;
            tempObj.id = parameters[k].name + j;
            tempObj.value = '';
            tempObj.userInput = true;
            parametersToApi.push(tempObj);
          }
          if (parameters[k].name === 'link') {
            linkValueForFullMalwareReport = !isUndefined(parameters[k].value)
            ? parameters[k].value : '';
          }
        }

        userInputParameters = checkForUserInputs(parameters);
      }*/

      let parameters = this.generateParameters(actionsList[j].parameters, j, nodeID, nodeType),
        {parametersToApi, userInputParameters, linkValueForFullMalwareReport} = parameters;

      let tr = document.createElement('tr'),
        td1 = document.createElement('td'),
        reportId = (!isUndefined(actionsList[j].reportId)) ? actionsList[j].reportId
        : (!isUndefined(actionsList[j].name) ? actionsList[j].name : ''),
        actionType = (!isUndefined(actionsList[j].actionType)) ? actionsList[j].actionType : '';

      td1.appendChild(document.createTextNode(actionsList[j].label));
      td1.id = 'action' + j;
      td1.onclick = props.extendGraph(contextMenuType, network, nodeID, nodeType,
        reportId, parametersToApi, actionsList.length, 'action' + j, actionsList[j].label,
        linkValueForFullMalwareReport);

      let td2 = document.createElement('td');
      if (userInputParameters.length > 0) {
        td2.id = 'downarrow' + j;
        td2.style = 'padding-left:0px;';
        let downArrow = document.createElement('img');
        downArrow.src = '/img/downarrow.png';
        td2.appendChild(downArrow);
      }
      else {
        td1.colSpan = '2';
      }

      tr.appendChild(td1);

      if (userInputParameters.length > 0) {
        tr.appendChild(td2);
      }

      table.appendChild(tr);

      if (userInputParameters.length > 0) {
        for (let p = 0; p < userInputParameters.length; p++) {
          let trUserInput = document.createElement('tr');
          let tdUserInput = document.createElement('td');
          tdUserInput.style = 'cursor:auto;';
          tdUserInput.appendChild(document.createTextNode(
            firstCharCapitalize(userInputParameters[p].name + ' :')));
          let inputParameter = document.createElement('input');
          inputParameter.setAttribute('type', 'text');
          inputParameter.setAttribute('style', 'color:black;');
          inputParameter.setAttribute('placeholder', userInputParameters[p].name);
          inputParameter.setAttribute('name', userInputParameters[p].name + j);
          inputParameter.setAttribute('id', userInputParameters[p].name + j);
          tdUserInput.appendChild(inputParameter);
          trUserInput.appendChild(tdUserInput);
          table.appendChild(trUserInput);
        }
      }
    }

    props.setActions(table.innerHTML);

    document.getElementById('actions').appendChild(table);
    document.getElementById('actionPerformed').style.width = actionPerformed.width;
    document.getElementById('rightArrow').style.display = 'block';
    document.getElementById('contextualMenuContents').style.display = 'block';
    // This is needed when we add search text box in contextual menu. Currently, it is commented.
    // document.getElementById('searchNetworkNode').style.display = 'block';
    document.getElementById('expandCM').style.display = 'none';
    document.getElementById('refreshData').style.marginLeft = refreshData.marginLeft;
  }

  generateParameters(parameters, index, nodeID, nodeType) {
    let {props} = this,
      {nodeObjects, edgeObjects} = props,
      parametersToApi = [],
      userInputParameters = [],
      linkValueForFullMalwareReport = '';

    if (!isUndefined(parameters.length)) {
      for (let k = 0; k < parameters.length; k++) {
        let tempObj = {};
        if (parameters[k].userInput === false && parameters[k].name !== 'link') {
          tempObj.name = parameters[k].name;
          if (!isUndefined(parameters[k].value)) {
            tempObj.value = parameters[k].value;
          }
          else {
            if (parameters[k].name === 'id') {
              tempObj.value = nodeID;
            }
            else if (parameters[k].name === 'type') {
              tempObj.value = nodeType;
            }
            else if (parameters[k].name === 'date') {
              tempObj.value = this.state.alertDate;
            }
            else if (parameters[k].name === 'ip' && (nodeType.toLowerCase() === 'internal_ip' ||
              nodeType.toLowerCase() === 'external_ip')) {
              tempObj.value = nodeID;
            }
            else if (parameters[k].name === 'source.id') {
              if (!isUndefined(edgeObjects[nodeID])) {
                tempObj.value = edgeObjects[nodeID].from;
              }
              else {
                tempObj.value = '';
              }
            }
            else if (parameters[k].name === 'target.id') {
              if (!isUndefined(edgeObjects[nodeID])) {
                tempObj.value = edgeObjects[nodeID].to;
              }
              else {
                tempObj.value = '';
              }
            }
            else if ((parameters[k].name).indexOf('metadata') > -1) {
              let paramName = (parameters[k].name).replace('metadata.', ''),
                metadataValue = nodeObjects[nodeID].metadata[paramName];
              tempObj.value = (!isUndefined(metadataValue)) ? metadataValue : '';
            }
            else {
              tempObj.value = '';
            }
          }

          tempObj.userInput = false;
          parametersToApi.push(tempObj);
        }
        if (parameters[k].userInput === true) {
          tempObj.name = parameters[k].name;
          tempObj.id = parameters[k].name + index;
          tempObj.value = '';
          tempObj.userInput = true;
          parametersToApi.push(tempObj);
        }
        if (parameters[k].name === 'link') {
          linkValueForFullMalwareReport = !isUndefined(parameters[k].value)
          ? parameters[k].value : '';
        }
      }

      userInputParameters = checkForUserInputs(parameters);
    }
    return {
      parametersToApi: parametersToApi,
      userInputParameters: userInputParameters,
      linkValueForFullMalwareReport: linkValueForFullMalwareReport
    };
  }

  collapseExpand(action) {
    return (event) => {
      if (action === 'collapse') {
        document.getElementById('contextualMenu').style.width = '0px';
        document.getElementById('rightArrow').style.display = 'none';
        document.getElementById('contextualMenuContents').style.display = 'none';
        // This is needed when we add search text box in contextual menu. Currently, it is commented.
        // document.getElementById('searchNetworkNode').style.display = 'none';
        document.getElementById('expandCM').style.display = 'block';
      }
      if (action === 'expand') {
        document.getElementById('contextualMenu').style.width = '259px';
        document.getElementById('rightArrow').style.display = 'block';
        document.getElementById('contextualMenuContents').style.display = 'block';
        // This is needed when we add search text box in contextual menu. Currently, it is commented.
        // document.getElementById('searchNetworkNode').style.display = 'block';
        document.getElementById('expandCM').style.display = 'none';
      }
    };
  }

  render() {
    const {props} = this;

    let contextMenuStyle = {display: props.showContextMenu ? 'block' : 'none'};

    return (
      <div>
        <div ref={(ref) => this.contextualMenu = ref}
          style={{...style.contextualMenu, ...contextMenuStyle}} id='contextualMenu'>
          { /*
            // This is needed when we add search text box in contextual menu. Currently, it is commented.
            <input type='text' id='searchNetworkNode'
              style={{...style.searchTextBox}}
              placeholder='Search' /> */ }

          <div style={{
            height: '650px',
            overflowX: 'hidden',
            overflowY: 'auto'
          }} className='contextMenu scrollbarStyle' id='contextualMenuContents'>
            <div
              style={{...style.selectedDetails}}
              dangerouslySetInnerHTML={{__html: props.selectedDetails}}>
            </div>
            <div id='actions'></div>
          </div>

          <div id='collapseExpandCM' style={{
            marginLeft: '24px',
            marginBottom: '24px',
            marginTop: '10px'
          }}>
            <img id='rightArrow' src='/img/rightArrow.png' onClick={this.collapseExpand('collapse')} />
          </div>
        </div>

        <div id='expandCM' style={{
          bottom: '25px',
          right: '24px',
          position: 'absolute',
          display: 'none'
        }}>
          <img id='leftArrow' src='/img/menu.png' onClick={this.collapseExpand('expand')} />
        </div>

        <div style={{...style.actionPerformed}} id='actionPerformed'></div>
      </div>
    );
  }
}

export default ContextualMenu;
