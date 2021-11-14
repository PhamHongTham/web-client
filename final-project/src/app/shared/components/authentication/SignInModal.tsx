import React from 'react'

import { Link } from 'react-router-dom'

interface SignInOptions {
  handleShowSignInEmail: () => void,
  handleShowSignUpEmail: () => void,
}
const SignInModal = ({ handleShowSignInEmail, handleShowSignUpEmail }: SignInOptions) => {
  return (
    <div className="sign-in-modal">
      <h2 className="sign-in-title">Welcome to <span className="blog-name">Boogle</span>.</h2>
      <ul className="list-action">
        <li className="action-item">
          <Link to="" className="action-link" onClick={handleShowSignInEmail}>
            <i className="fal fa-envelope"></i> Sign in with email
          </Link>
        </li>
      </ul>
      <span className="sign-up-action">No account? <Link to="" className="create-account" onClick={handleShowSignUpEmail}>Create one</Link></span>
      <p className="sign-in-info">Click “Sign In” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</p>
    </div>
  )
}

export default SignInModal
