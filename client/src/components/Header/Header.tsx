import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <nav className="header-nav">
      <div className="nav-wrapper">
        <a>Home</a>
        <button>Login</button>
      </div>
    </nav>
  );
};

export default Header;
