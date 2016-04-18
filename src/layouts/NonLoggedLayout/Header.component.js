import React from 'react';

class HeaderComponent extends React.Component {
  render () {
    return (
      <header id="header">
        <div className="brand-holder">
          <a href="/">
            <span className="text-lg text-bold text-primary">RANK</span>
          </a>
        </div>
      </header>
    )
  }
}

export default HeaderComponent;
