import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import AuthenticationModal from './authentication/AuthenticationModal';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleShowLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };
  return (
    <header>
      <div className="container">
        <div className="page-header">
          <div className="logo">
            <h1>
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
            <Link to="" className="signin" onClick={handleShowLoginModal}>
              Signin
            </Link>
          </div>
        </div>
      </div>

      {showLoginModal ? (
        <AuthenticationModal showLoginModal={handleShowLoginModal} />
      ) : (
        ''
      )}
    </header>
  );
};

export default Header;
