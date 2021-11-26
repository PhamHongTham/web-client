import React from 'react';

import { Link } from 'react-router-dom';

interface SignInOptions {
  handleShowSignInEmail: () => void;
  handleShowSignUpEmail: () => void;
}
const SignInModal = ({ handleShowSignInEmail, handleShowSignUpEmail }: SignInOptions) => {
  const handleLoginWithSocial = (typeSocial: string) => {
    return `${
      process.env.REACT_APP_API_URL
    }/api/v1/auth/${typeSocial}?redirect_to=${encodeURIComponent(
      process.env.REACT_APP_REDIRECT_URL || ' '
    )}`;
  };

  return (
    <div className="sign-in-modal">
      <h2 className="sign-in-title">
        Welcome to <span className="blog-name">Boogle</span>.
      </h2>
      <ul className="list-action">
        <li className="action-item">
          <p className="action-link" onClick={handleShowSignInEmail}>
            <i className="fas fa-envelope"></i> Sign in with email
          </p>
        </li>
        <li className="action-item">
          <a href={handleLoginWithSocial('google')} className="action-link">
            <i className="fab fa-google"></i> Sign in with Google
          </a>
        </li>
        <li className="action-item">
          <a href={handleLoginWithSocial('github')} className="action-link">
            <i className="fab fa-github"></i> Sign in with github
          </a>
        </li>
      </ul>
      <span className="sign-up-action">
        No account?{' '}
        <Link to="" className="create-account" onClick={handleShowSignUpEmail}>
          Create one
        </Link>
      </span>
      <p className="sign-in-info">
        Click “Sign In” to agree to Boogle’s Terms of Service and acknowledge that Boogle’s Privacy
        Policy applies to you.
      </p>
    </div>
  );
};

export default SignInModal;
