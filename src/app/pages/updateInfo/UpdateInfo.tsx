import React, { useContext, useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RootState } from 'app/stores/app-reducer';
import {
  clearUserState,
  getUserInfoRequest,
  updateUserInfoRequest,
} from 'app/stores/user/actions';
import SelectGender from './partials/SelectGender';
import HandleBirthdate from './partials/HandleBirthdate';
import Avatar from './partials/Avatar';
import { uploadImage } from 'app/stores/post/actions';
import { NotificationContext } from 'app/shared/components/notifications/NotificationProvider';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';
import { useHistory } from 'react-router';

const UpdateInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const schema = yup.object().shape({
    picture: yup.mixed().required('You need upload image to update'),
    phone: yup
      .string()
      .trim()
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Wrong phone number')
      .required(),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const { handleAddNotification } = useContext(NotificationContext);
  const { handleShowLoading } = useContext(LoadingContext);
  const { userCurrent, isLoading, message, error } = useSelector(
    (state: RootState) => state.userState
  );

  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, []);

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
      reset(userCurrent);
      setTimeout(() => {
        history.push('/');
      }, 2500);
    }
    if (userCurrent) {
      reset(userCurrent);
    }
  }, [isLoading, message, error]);

  useEffect(() => {
    return () => {
      dispatch(clearUserState());
    };
  }, []);

  const onSubmit = async (data: any) => {
    const infoData = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      dob: data.dob,
      displayName: data.displayName,
      phone: data.phone,
      picture: data.picture,
    };
    if (data.picture instanceof File) {
      const url = await dispatch(uploadImage(data.picture, 'avatar'));
      infoData.picture = url;
    }
    dispatch(updateUserInfoRequest(infoData));
  };

  return (
    <section className="section-update-info">
      <div className="container">
        <h2 className="update-info-title">Update information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="update-form">
          <Controller
            control={control}
            name="picture"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Avatar value={value} onChange={onChange} />
            )}
          />
          {errors.picture ? (
            <p className="error error-avatar">{errors.picture.message}</p>
          ) : (
            ''
          )}
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
          <Controller
            control={control}
            name="gender"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <SelectGender value={value} onChange={onChange} />
            )}
          />
          <Controller
            control={control}
            name="dob"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <HandleBirthdate value={value} onChange={onChange} />
            )}
          />
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
