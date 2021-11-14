import React, { useState, useContext, FormEvent, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';

import { UserLoginOptions } from 'app/shared/types/UserLogin';
import { clearUserState, signUpRequest } from 'app/stores/user/actions';
import { RootState } from '../../../stores/app-reducer';
import { NotificationContext } from '../notifications/NotificationProvider';
import { LoadingContext } from '../loading/LoadingProvider';

interface SignUpEmailOptions {
  handleShowSignInModal: () => void,
  handleShowSignInEmail: () => void,
}

const SignUpEmail = ({ handleShowSignInModal, handleShowSignInEmail }: SignUpEmailOptions) => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Invalid email'),
    password: yup.string().min(8, 'Password must be more than 8 characters').max(20, 'Password must be less than 20 characters').required(),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const [dateOfBirth, setDateOfBirth] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [pass, setPass] = useState<string>('');
  const [repeatPass, setRepeatPass] = useState<string>('');

  const { handleAddNotification } = useContext(NotificationContext)
  const { handleShowLoading } = useContext(LoadingContext)
  const { isLoading, message, error } = useSelector((state: RootState) => state.userState)

  useEffect(() => {
    handleShowLoading(isLoading ? true : false)
    if (error) {
      handleAddNotification({ type: 'ERROR', message: error })
    }
    if (message) {
      handleAddNotification({ type: 'SUCCESS', message: 'Sign up user success' })
      handleShowSignInEmail()
    }
  }, [isLoading, message, error, dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearUserState())
    }
  }, [dispatch])

  const resetForm = () => {
    reset();
    setDateOfBirth('')
  }

  const onSubmit = (data: UserLoginOptions) => {
    if (pass === repeatPass) {
      const infoUser = {
        ...data,
        gender: gender,
        dob: dateOfBirth,
      }
      dispatch(signUpRequest(infoUser, resetForm));
    } else {
      console.log('Password not match')
      // setError('repeatPassword', {
      //   type: "manual",
      //   message: "Password not match",
      // })
    }
  };

  return (
    <div className="sign-up-email">
      <h2 className="sign-up-email-title">
        Join <span className="blog-name">Boogle</span>
      </h2>
      <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register('email')} required></input>
        <input type="text" placeholder="First name" {...register('firstName')} required></input>
        <input type="text" placeholder="Last name" {...register('lastName')} required></input>
        <input type="text" placeholder="Display name" {...register('displayName')} required></input>
        <div className="select-gender">
          <label className="container-radio">Male
            <input type="radio" name="radio" onChange={(e: FormEvent<HTMLInputElement>) => setGender('male')} required></input>
            <span className="checkmark"></span>
          </label>
          <label className="container-radio">Female
            <input type="radio" name="radio" onChange={(e: FormEvent<HTMLInputElement>) => setGender('female')} required></input>
            <span className="checkmark"></span>
          </label>
        </div>
        <InputMask mask="99/99/9999" placeholder="Enter birthdate" value={dateOfBirth} onChange={(e: FormEvent<HTMLInputElement>) => setDateOfBirth(e.currentTarget.value)} required />
        <input type="number" placeholder="Phone" {...register('phone')} required></input>
        <input type="password" placeholder="Password" {...register('password')} onChange={(e: FormEvent<HTMLInputElement>) => setPass(e.currentTarget.value)} required></input>
        <input type="password" placeholder="Repeat password" onChange={(e: FormEvent<HTMLInputElement>) => setRepeatPass(e.currentTarget.value)} required></input>
        <button className="btn btn-primary">Sign Up</button>
      </form>
      <Link to="" className="back-all-action" onClick={handleShowSignInModal}>
        <i className="fal fa-chevron-left"></i> All sign in options
      </Link>
    </div>
  );
};

export default SignUpEmail;
