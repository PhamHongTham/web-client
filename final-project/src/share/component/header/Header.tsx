import React, { useState } from 'react';

const Header = () => {
  const [headerStyle, setHeaderStyle] = useState(false);
  const changeHeaderStyle = () => {
    if (window.scrollY >= 76 && window.scrollY <= 760) {
      setHeaderStyle(() => true);
    } else {
      setHeaderStyle(() => false);
    }
  };
  window.addEventListener('scroll', changeHeaderStyle);
  return (
    <header className={headerStyle ? 'active' : ''}>
      <div className="container">
        <div className="page-header">
          <div className="logo">
            <h1 className="brand">
              <span className="text-primary logo-letter">B</span>oogle
            </h1>
          </div>
          <div className="header-action">
            <nav className="navigation-bar">
              <ul className="group-item group-nav-link">
                <li className="list-item list-nav-link">
                  <a className="text-primary nav-link" href="/#">
                    Home
                  </a>
                </li>
                <li className="list-item list-nav-link">
                  <a className="nav-link" href="/#">
                    Categories
                  </a>
                </li>
                <li className="list-item list-nav-link">
                  <a className="nav-link" href="/#">
                    Travel
                  </a>
                </li>
                <li className="list-item list-nav-link">
                  <a className="nav-link" href="/#">
                    Food
                  </a>
                </li>
                <li className="list-item list-nav-link">
                  <a className="nav-link" href="/#">
                    Technology
                  </a>
                </li>
                <li className="list-item list-nav-link">
                  <a className="nav-link" href="/#">
                    Business
                  </a>
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
