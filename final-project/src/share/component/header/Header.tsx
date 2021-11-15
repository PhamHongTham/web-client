import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMobileMenu = () => {
    setShowMenu(true);
  };
  const handleHiddenMobileMenu = () => {
    setShowMenu(false);
  };
  return (
    <header>
      <div className="page-header container">
        <Link to="/" className="text-primary menu-link">
          <h1 className="header-logo">
            <span className="text-primary logo-letter">B</span>oogle
          </h1>
        </Link>
        <div className="header-action">
          <nav className="navigation-bar">
            <ul className="group-item menu-list">
              <li className="list-item menu-item">
                <Link to="/" className="text-primary menu-link">
                  Home
                </Link>
              </li>
              <li className="list-item menu-item">
                <Link to="/" className="menu-link" href="/#">
                  Membership
                </Link>
              </li>
              <li className="list-item menu-item">
                <Link to="/" className="menu-link">
                  Write
                </Link>
              </li>
              <li className="list-item menu-item">
                <Link to="/" className="menu-link">
                  Sign In
                </Link>
              </li>
              <li className="list-item menu-item menu-mobile">
                <Link to="/" className="menu-link" onClick={handleShowMobileMenu}>
                  <i className="fas fa-bars"></i>
                </Link>
                <ul
                  className={
                    showMenu ? 'group-item menu-mobile-list active' : 'group-item menu-mobile-list'
                  }
                >
                  <li className="list-item menu-mobile-item hide-menu">
                    <button className="hide-menu-btn" onClick={handleHiddenMobileMenu}>
                      <i className="fal fa-times"></i>
                    </button>
                  </li>
                  <li className="list-item menu-mobile-item">
                    <Link to="/" className="text-primary menu-mobile-link">
                      Home
                    </Link>
                  </li>
                  <li className="list-item menu-mobile-item">
                    <Link to="/" className="menu-mobile-link" href="/#">
                      Membership
                    </Link>
                  </li>
                  <li className="list-item menu-mobile-item">
                    <Link to="/" className="menu-mobile-link">
                      Write
                    </Link>
                  </li>
                  <li className="list-item menu-mobile-item">
                    <Link to="/" className="menu-mobile-link">
                      Sign In
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <button className="user-avatar">
            <i className="fal fa-user-circle"></i>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
