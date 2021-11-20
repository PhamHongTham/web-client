import React, { FormEvent, useContext, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RootState } from 'app/stores/app-reducer';
import { UserInfoOptions } from 'app/shared/models/User';
import { updateUserInfoRequest } from 'app/stores/user/actions';
import { NotificationContext } from 'app/shared/components/notifications/NotificationProvider';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';

const UpdateInfo = () => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    phone: yup
      .string()
      .trim()
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Wrong phone number')
      .required(),
  });
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const { handleAddNotification } = useContext(NotificationContext);
  const { handleShowLoading } = useContext(LoadingContext);
  const { isLoading, message, error } = useSelector(
    (state: RootState) => state.userState
  );

  useEffect(() => {
    handleShowLoading(isLoading ? true : false);
    if (error) {
      handleAddNotification({ type: 'ERROR', message: error });
    }
    if (message) {
      handleAddNotification({
        type: 'SUCCESS',
        message: 'Update user info success',
      });
    }
    return () => {
      dispatch(clearUserState())
    }
  }, [isLoading, message, error]);

  useEffect(() => {
    let date = new Date(dateOfBirth);
    let currentDate = new Date();
    if (date.getTime() > currentDate.getTime()) {
      setError('dateOfBirth', {
        type: 'manual',
        message: 'Wrong date of birth',
      });
    } else {
      clearErrors('dateOfBirth');
    }
  }, [dateOfBirth, clearErrors, setError]);

  const onSubmit = (data: UserInfoOptions) => {
    const newUserInfo: UserInfoOptions = {
      ...data,
      gender: gender,
      dob: dateOfBirth,
    };
    dispatch(updateUserInfoRequest(newUserInfo));
    reset();
    setDateOfBirth('');
  };
  return (
    <section className="section-update-info">
      <div className="container">
        <h2 className="update-info-title">Update information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="update-form">
          <input
            placeholder="First name"
            {...register('firstName')}
            required
          ></input>
          <input
            placeholder="Last name"
            {...register('lastName')}
            required
          ></input>
          <div className="select-gender">
            <label className="container-radio">
              Male
              <input
                type="radio"
                name="radio"
                onChange={(e: FormEvent<HTMLInputElement>) => setGender('male')}
                required
              ></input>
              <span className="checkmark"></span>
            </label>
            <label className="container-radio">
              Female
              <input
                type="radio"
                name="radio"
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setGender('female')
                }
                required
              ></input>
              <span className="checkmark"></span>
            </label>
          </div>
          <InputMask
            mask="99/99/9999"
            placeholder="Enter birthdate"
            value={dateOfBirth}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setDateOfBirth(e.currentTarget.value)
            }
            required
          />
          {errors.dateOfBirth ? (
            <p className="error">{errors.dateOfBirth.message}</p>
          ) : (
            ''
          )}
          <input
            placeholder="Display name"
            {...register('displayName')}
            required
          ></input>
          <input placeholder="Phone" {...register('phone')} required></input>
          {errors.phone ? <p className="error">{errors.phone.message}</p> : ''}
          <div className="form-btn">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateInfo;
