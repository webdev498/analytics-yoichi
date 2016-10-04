import React from 'react';
import $ from 'jquery';
import {Colors} from 'theme/colors';

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

class ContextualMenu extends React.Component {
  constructor(props) {
    super(props);

    this.collapseExpand = this.collapseExpand.bind(this);
  }

  collapseExpand(action) {
    return (event) => {
      if (action === 'collapse') {
        $('#contextualMenu').animate({width: '0px'});
        document.getElementById('rightArrow').style.display = 'none';
        document.getElementById('contextualMenuContents').style.display = 'none';
        // This is needed when we add search text box in contextual menu. Currently, it is commented.
        // document.getElementById('searchNetworkNode').style.display = 'none';
        document.getElementById('expandCM').style.display = 'block';
      }
      if (action === 'expand') {
        $('#contextualMenu').animate({width: '259px'});
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
