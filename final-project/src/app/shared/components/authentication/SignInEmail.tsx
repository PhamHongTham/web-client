import React, { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from 'app/stores/user/actions';
import { UserLoginOptions } from 'app/shared/types/UserLogin';

import { RootState } from '../../../stores/app-reducer';
import { NotificationContext } from '../notifications/NotificationProvider';
import Loading from '../loading/Loading';
import { LoadingContext } from '../loading/LoadingProvider';

interface SignInEmailPropsOptions {
  handleShowSignInModal: () => void;
  showLoginModal: () => void;
}

const SignInEmail = ({ handleShowSignInModal, showLoginModal }: SignInEmailPropsOptions) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const { handleAddNotification } = useContext(NotificationContext);
  const { handleShowLoading } = useContext(LoadingContext);
  const { isLoading, userCurrent, error } = useSelector((state: RootState) => state.userState);

  useEffect(() => {
    handleShowLoading(isLoading ? true : false);
    if (error) {
      handleAddNotification({ type: 'ERROR', message: error });
    }
    if (userCurrent) {
      handleAddNotification({
        type: 'SUCCESS',
        message: 'Sign in user success',
      });
      showLoginModal();
    }
  }, [
    isLoading,
    userCurrent,
    dispatch,
    error,
    showLoginModal,
    handleAddNotification,
    handleShowLoading,
  ]);

  const onSubmit = (data: UserLoginOptions) => {
    dispatch(loginRequest(data));
    reset();
  };
  return (
    <div className="sign-in-email">
      <h2 className="sign-in-email-title">
        Join <span className="blog-name">Boogle</span>
      </h2>
      <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
        <p className="input-description">Your email</p>
        <input className="form-input" type="text" {...register('email')}></input>
        <p className="input-description">Your password</p>
        <input className="form-input" type="password" {...register('password')}></input>
        <button className="btn btn-primary">Sign In</button>
      </form>
      <Link to="" className="back-all-action" onClick={handleShowSignInModal}>
        <i className="fal fa-chevron-left"></i> All sign in options
      </Link>
      <p className="sign-in-info">
        Click “Sign In” to agree to Boogle’s Terms of Service and acknowledge that Boogle’s Privacy
        Policy applies to you.
      </p>
      {isLoading ? <Loading /> : ''}
    </div>
  );
};

export default SignInEmail;
