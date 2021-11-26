import React from 'react';

import { Link } from 'react-router-dom';

interface SignInOptions {
  handleShowSignInEmail: () => void;
  handleShowSignUpEmail: () => void;
}
const SignInModal = ({
  handleShowSignInEmail,
  handleShowSignUpEmail,
}: SignInOptions) => {
  const redirectTo =
    'https://61a030366e749f9491a6f2df--awesome-heyrovsky-5739ca.netlify.app/';
  const urlLoginSocial =
    'https://vast-lowlands-08945.herokuapp.com/api/v1/auth/';

  const handleLoginWithSocial = (url: string, typeSocial: string) => {
    return `${url}${typeSocial}?redirect_to=${redirectTo}`;
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
          <a
            href={handleLoginWithSocial(urlLoginSocial, 'google')}
            className="action-link"
          >
            <i className="fab fa-google"></i> Sign in with Google
          </a>
        </li>
        <li className="action-item">
          <a
            href={handleLoginWithSocial(urlLoginSocial, 'github')}
            className="action-link"
          >
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
        Click “Sign In” to agree to Medium’s Terms of Service and acknowledge
        that Medium’s Privacy Policy applies to you.
      </p>
    </div>
  );
};

export default SignInModal;
