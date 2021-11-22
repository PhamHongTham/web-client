import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import SignInEmail from './SignInEmail';
import SignInModal from './SignInModal';
import SignUpEmail from './SignUpEmail';
import { showModalSignInRequest } from 'app/stores/user/actions';

const AuthenticationModal = () => {
  const dispatch = useDispatch();
  const [UIModalOptions, setUIModalOptions] = useState({
    signInModal: true,
    signInEmail: false,
    signUpEmail: false,
  });
  const handleShowSignInEmail = () => {
    setUIModalOptions({
      signInModal: false,
      signInEmail: true,
      signUpEmail: false,
    });
  };
  const handleShowSignUpEmail = () => {
    setUIModalOptions({
      signInModal: false,
      signInEmail: false,
      signUpEmail: true,
    });
  };
  const handleShowSignInModal = () => {
    setUIModalOptions({
      signInModal: true,
      signInEmail: false,
      signUpEmail: false,
    });
  };

  const showLoginModal = () => {
    dispatch(showModalSignInRequest(false));
  };
  return (
    <div className="modal">
      <div className="authentication-modal">
        <button className="close-modal" onClick={showLoginModal}>
          <i className="fal fa-times"></i>
        </button>
        {UIModalOptions.signInModal ? (
          <SignInModal
            handleShowSignInEmail={handleShowSignInEmail}
            handleShowSignUpEmail={handleShowSignUpEmail}
          />
        ) : (
          ''
        )}
        {UIModalOptions.signInEmail ? (
          <SignInEmail
            handleShowSignInModal={handleShowSignInModal}
            showLoginModal={showLoginModal}
          />
        ) : (
          ''
        )}
        {UIModalOptions.signUpEmail ? (
          <SignUpEmail
            handleShowSignInModal={handleShowSignInModal}
            handleShowSignInEmail={handleShowSignInEmail}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default AuthenticationModal;
