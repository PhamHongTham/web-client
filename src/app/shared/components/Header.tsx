import { RootState } from 'app/stores/app-reducer';
import { logoutRequest } from 'app/stores/user/actions';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { UserInfoOptions } from '../models/User';

import AuthenticationModal from './authentication/AuthenticationModal';

const Header = () => {
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showUserAction, setShowUserAction] = useState<boolean>(false);
  const { userCurrent }: { userCurrent: UserInfoOptions } = useSelector(
    (state: RootState) => state.userState
  );
  const userCurrentId = localStorage.getItem('USER_ID');

  const handleShowLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };
  const handleShowMobileMenu = () => {
    setShowMenu(true);
  };
  const handleHiddenMobileMenu = () => {
    setShowMenu(false);
  };
  const handleShowUserAction = () => {
    setShowUserAction(!showUserAction);
  };
  const handleSignOut = () => {
    dispatch(logoutRequest());
  };
  const UserAction = () => (
    <li className="user-avatar">
      {userCurrent ? (
        <img
          src={
            userCurrent.picture
              ? `${userCurrent.picture}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU'
          }
          alt=""
          className="avatar-image"
          onClick={handleShowUserAction}
        ></img>
      ) : (
        ''
      )}
      {showUserAction ? (
        <div className="user-action">
          <ul className="action-list">
            <li className="action-item">
              <Link
                to="/user/update"
                className="action-link"
                onClick={handleShowUserAction}
              >
                Update information
              </Link>
            </li>
            <li className="action-item">
              <Link
                to="/user/changepass"
                className="action-link"
                onClick={handleShowUserAction}
              >
                Update password
              </Link>
            </li>
            <li className="action-item" onClick={handleSignOut}>
              <Link
                to=""
                className="action-link"
                onClick={handleShowUserAction}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        ''
      )}
    </li>
  );
  return (
    <header>
      <div className="page-header container">
        <Link to="/" className="menu-link">
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
              {userCurrentId ? (
                <UserAction />
              ) : (
                <li className="list-item menu-item">
                  <Link to="/" className="menu-link" onClick={() => { handleShowLoginModal(); handleHiddenMobileMenu() }}>
                    Sign In
                  </Link>
                </li>
              )}
              <li className="list-item menu-item menu-mobile">
                <ul
                  className={
                    showMenu
                      ? 'group-item menu-mobile-list active'
                      : 'group-item menu-mobile-list'
                  }
                >
                  <li className="list-item menu-mobile-item hide-menu">
                    <button
                      className="hide-menu-btn"
                      onClick={handleHiddenMobileMenu}
                    >
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
                  {
                    !userCurrentId ? (<li
                    className="list-item menu-mobile-item"
                    onClick={handleShowLoginModal}
                  >
                    <Link to="" className="menu-mobile-link" onClick={() => { handleShowLoginModal(); handleHiddenMobileMenu() }}>
                      Sign In
                    </Link>
                    </li>) : ''
                  }
                </ul>
                <Link
                  to="/"
                  className="menu-link"
                  onClick={handleShowMobileMenu}
                >
                  <i className="fas fa-bars"></i>
                </Link>
              </li>
            </ul>
          </nav>
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
