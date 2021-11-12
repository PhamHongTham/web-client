import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="active">
      <div className="container">
        <div className="page-header">
          <div className="header-logo">
            <h1 className="brand">
              <span className="text-primary logo-letter">B</span>oogle
            </h1>
          </div>
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
                    Categories
                  </Link>
                </li>
                <li className="list-item menu-item">
                  <Link to="/" className="menu-link">
                    Travel
                  </Link>
                </li>
                <li className="list-item menu-item">
                  <Link to="/" className="menu-link">
                    Food
                  </Link>
                </li>
                <li className="list-item menu-item">
                  <Link to="/" className="menu-link">
                    Technology
                  </Link>
                </li>
                <li className="list-item menu-item">
                  <Link to="/" className="menu-link">
                    Business
                  </Link>
                </li>
              </ul>
            </nav>
            <button className="btn btn-primary">Get started</button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
