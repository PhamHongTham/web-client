import React, { useState } from 'react';
import SignInEmail from './SignInEmail';
import SignInModal from './SignInModal';
import SignUpEmail from './SignUpEmail';

interface modalUIOptions {
  showLoginModal: () => void;
}

const AuthenticationModal = ({ showLoginModal }: modalUIOptions) => {
  const [UIModalOptions, setUIModalOptions] = useState<any>({
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
