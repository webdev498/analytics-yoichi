import React, {PropTypes} from 'react';
import {Colors} from '../../commons/colors';
import { isUndefined, firstCharCapitalize, whatIsIt } from '../../commons/utils/utils';
import { DEFAULT_FONT } from 'Constants';

import './styles/_contextualMenu.scss';

const styles = {
    contextualMenu: {
      width: '260px',
      backgroundColor: Colors.contextBG,
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px'
    },
    contextualMenuContents: {
      overflowX: 'hidden',
      overflowY: 'auto',
      marginTop: '35px'
    },
    collapseContextualMenu: {
      position: 'absolute',
      left: '25px',
      bottom: '25px'
    },
    expandContextualMenu: {
      position: 'absolute',
      bottom: '25px',
      right: '25px',
      display: 'none'
    },
    selectedDetails: {
      margin: '0px 24px',
      width: '90%',
      color: Colors.garnet,
      fontSize: '13px',
      fontFamily: DEFAULT_FONT,
      overflowWrap: 'break-word',
      paddingRight: '20px',
      paddingBottom: '20px'
    },
    notificationMessage: {
      top: 0,
      right: '260px',
      fontSize: '16px',
      position: 'absolute',
      padding: '20px',
      backgroundColor: Colors.notificationMessageBG,
      color: Colors.garnet,
      display: 'none'
    }
  },
  notificationMessage = {
    width: '260px'
  },
  actionTable = {
    border: '0',
    width: '260',
    cellPadding: '10',
    cellSpacing: '10'
  };

function checkForUserInputs(parameters) {
  let userInputParameters = [];
  if (!isUndefined(parameters.length)) {
    for (let i = 0; i < parameters.length; i++) {
      let tempObj = {};
      if (parameters[i].userInput === true) {
        tempObj.name = parameters[i].name;
        userInputParameters.push(tempObj);
      }
    }
  }
  return userInputParameters;
}

function updateDOM(table) {
  document.getElementById('actions').appendChild(table);
  document.getElementById('notification-message').style.width = notificationMessage.width;
  document.getElementById('contextual-menu').style.width = '260px';
  document.getElementById('right-arrow').style.display = 'block';
  document.getElementById('contextual-menu-contents').style.display = 'block';
  document.getElementById('expand-contextual-menu').style.display = 'none';
}

function displayTextBoxForInputParam(table, userInputParameters, index) {
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
      inputParameter.setAttribute('name', userInputParameters[p].name + index);
      inputParameter.setAttribute('id', userInputParameters[p].name + index);
      tdUserInput.appendChild(inputParameter);
      trUserInput.appendChild(tdUserInput);
      table.appendChild(trUserInput);
    }
  }
  return table;
}

class ContextualMenu extends React.Component {
  static propTypes = {
    actions: PropTypes.array
  }

  constructor(props) {
    super(props);

    this.collapseExpand = this.collapseExpand.bind(this);
    this.getContextMenu = this.getContextMenu.bind(this);
    this.displayActions = this.displayActions.bind(this);
    this.generateParameters = this.generateParameters.bind(this);
    this.createHTML = this.createHTML.bind(this);
  }

  getContextMenu(sourceDetails) {
    let {props} = this,
      {nodeObjects} = props,
      actionsData = props.actions,
      actions = [],
      {itemId, itemType} = sourceDetails;

    document.getElementById('actions').innerHTML = '';
    let table = document.createElement('table');
    table.border = actionTable.border;
    table.width = actionTable.width;
    table.cellPadding = actionTable.cellPadding;
    table.cellSpacing = actionTable.cellSpacing;

    function getActions(actions, data, type) {
      if ((data.nodeType).toLowerCase() === type.toLowerCase()) {
        actions = Object.assign(actions, data.actions);
      }
      return actions;
    }

    actionsData.forEach((data) => {
      if (whatIsIt(itemType) === 'String') {
        actions = getActions(actions, data, itemType);
      }
      else if (whatIsIt(itemType) === 'Array') {
        itemType.forEach((type) => {
          actions = getActions(actions, data, type);
        });
      }
    });

    // Append the actions associated with nodes
    if (!isUndefined(nodeObjects[itemId]) && !isUndefined(nodeObjects[itemId].actions) &&
      nodeObjects[itemId].actions.length > 0) {
      actions = Object.assign(actions, nodeObjects[itemId].actions);
    }

    table = this.displayActions(actions, sourceDetails, table);
    props.loadParent(false);
    updateDOM(table);
  }

  displayActions(actions, sourceDetails, table) {
    let {itemId, itemType} = sourceDetails;
    for (let j = 0; j < actions.length; j++) {
      const details = {
          parameters: actions[j].parameters,
          index: j,
          itemId: itemId,
          itemType: itemType,
          notNodeId: sourceDetails.notNodeId ? sourceDetails.notNodeId : ''
        },
        parameters = this.generateParameters(details);

      const updatedDetails = {
        actions: actions,
        table: table,
        index: j,
        parameters: parameters,
        sourceDetails: sourceDetails
      };

      table = this.createHTML(updatedDetails);
    }
    return table;
  }

  generateParameters(details) {
    let {parameters, index, itemId, itemType, notNodeId} = details,
      parametersToApi = [],
      userInputParameters = [],
      fullMalwareReportLink = '';

    if (!isUndefined(parameters.length)) {
      for (let i = 0; i < parameters.length; i++) {
        let tempObj = {},
          parameter = parameters[i];
        if (parameter.userInput === false && parameter.name !== 'link') {
          let params = {
            name: parameter.name,
            value: parameter.value,
            itemId: itemId,
            itemType: itemType,
            notNodeId: notNodeId
          };
          tempObj.name = parameter.name;
          tempObj.value = this.getParameterValue(params);

          tempObj.userInput = false;
          parametersToApi.push(tempObj);
        }
        if (parameter.userInput === true) {
          tempObj.name = parameter.name;
          tempObj.id = parameter.name + index;
          tempObj.value = '';
          tempObj.userInput = true;
          parametersToApi.push(tempObj);
        }
        if (parameter.name === 'link') {
          fullMalwareReportLink = !isUndefined(parameter.value)
          ? parameter.value : '';
        }
      }

      userInputParameters = checkForUserInputs(parameters);
    }
    return {
      parametersToApi: parametersToApi,
      userInputParameters: userInputParameters,
      fullMalwareReportLink: fullMalwareReportLink
    };
  }

  getParameterValue(params) {
    let {name, value, itemId, itemType, notNodeId} = params;
    if (isUndefined(value)) {
      let {props} = this,
        {nodeObjects, edgeObjects} = props,
        parameterName = ((name).includes('metadata')) ? 'metadata' : name;

      parameterName = ((name).includes('actionData')) ? 'actionData' : parameterName;

      value = '';
      switch (parameterName) {
        case 'id':
          value = notNodeId;
          break;
        case 'nodeId':
          value = itemId;
          break;
        case 'type':
          value = itemType;
          break;
        case 'date':
          value = props.alertDate;
          break;
        case 'ip':
          if (itemType.toLowerCase() === 'internal_ip' || itemType.toLowerCase() === 'external_ip') {
            value = itemId;
          }
          break;
        case 'source.id':
          if (!isUndefined(edgeObjects[itemId])) {
            value = edgeObjects[itemId].from;
          }
          break;
        case 'target.id':
          if (!isUndefined(edgeObjects[itemId])) {
            value = edgeObjects[itemId].to;
          }
          break;
        case 'metadata':
          let paramName = (name).replace('metadata.', ''),
            metadataValue = (!isUndefined(nodeObjects[itemId]) && !isUndefined(nodeObjects[itemId].metadata))
              ? nodeObjects[itemId].metadata[paramName]
              : '';
          // metadataValue = (!isUndefined(edgeObjects[itemId]) && !isUndefined(edgeObjects[itemId].metadata))
          //   ? edgeObjects[itemId].metadata[paramName]
          //   : '';
          value = (!isUndefined(metadataValue)) ? metadataValue : '';
          break;
        case 'actionData':
          let actionParamName = (name).replace('actionData.', ''),
            actiondataValue = (!isUndefined(nodeObjects[itemId]) && !isUndefined(nodeObjects[itemId].actionData))
              ? nodeObjects[itemId].actionData[actionParamName]
              : '';
          // actiondataValue = (!isUndefined(edgeObjects[itemId]) && !isUndefined(edgeObjects[itemId].actionData))
          //   ? edgeObjects[itemId].actionData[actionParamName]
          //   : '';
          value = (!isUndefined(actiondataValue)) ? actiondataValue : '';
          break;
        default:
          break;
      }
    }
    return value;
  }

  createHTML(details) {
    let {props} = this,
      {actions, table, index, parameters, sourceDetails} = details,
      {parametersToApi, userInputParameters, fullMalwareReportLink} = parameters;

    let tr = document.createElement('tr'),
      td1 = document.createElement('td'),
      reportId = (!isUndefined(actions[index].reportId)) ? actions[index].reportId
      : (!isUndefined(actions[index].name) ? actions[index].name : ''),
      actionDetails = {
        reportId: reportId,
        parameters: parametersToApi,
        actionsCount: actions.length,
        actionId: 'action' + index,
        actionLabel: actions[index].label,
        fullMalwareReportLink: fullMalwareReportLink,
        actionType: actions[index].actionType
      };

    td1.appendChild(document.createTextNode(actions[index].label));
    td1.id = 'action' + index;
    td1.onclick = props.doAction(sourceDetails, actionDetails);

    let td2 = document.createElement('td');
    if (userInputParameters.length > 0) {
      td2.id = 'downarrow' + index;
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

    displayTextBoxForInputParam(table, userInputParameters, index);

    return table;
  }

  collapseExpand(action) {
    return (event) => {
      if (action === 'collapse') {
        document.getElementById('contextual-menu').style.width = '0px';
        document.getElementById('right-arrow').style.display = 'none';
        document.getElementById('contextual-menu-contents').style.display = 'none';
        document.getElementById('expand-contextual-menu').style.display = 'block';
      }
      if (action === 'expand') {
        document.getElementById('contextual-menu').style.width = '260px';
        document.getElementById('right-arrow').style.display = 'block';
        document.getElementById('contextual-menu-contents').style.display = 'block';
        document.getElementById('expand-contextual-menu').style.display = 'none';
      }
    };
  }

  render() {
    const {props} = this;
    let contextMenuStyle = {display: props.showContextMenu ? 'block' : 'none'};

    return (
      <div>
        <div ref={(ref) => this.contextualMenu = ref}
          style={{...styles.contextualMenu, ...contextMenuStyle}} id='contextual-menu'>
          <div style={styles.contextualMenuContents} className='context-menu scrollbar' id='contextual-menu-contents'>
            <div
              style={{...styles.selectedDetails}}>
              {props.selectedDetails}
            </div>
            <div id='actions' />
          </div>

          <div id='collapse-contextual-menu' style={styles.collapseContextualMenu}>
            <img id='right-arrow' src='/img/rightArrow.png' onClick={this.collapseExpand('collapse')} />
          </div>
        </div>

        <div id='expand-contextual-menu' style={styles.expandContextualMenu}>
          <img id='left-arrow' src='/img/menu.png' onClick={this.collapseExpand('expand')} />
        </div>

        <div style={{...styles.notificationMessage}} id='notification-message' />
      </div>
    );
  }
}

export default ContextualMenu;
