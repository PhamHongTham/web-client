import React, { FormEvent, useState } from 'react';

import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { UserInfoOptions } from 'app/shared/models/User';
import { useDispatch } from 'react-redux';
import { updateUserInfoRequest } from 'app/stores/user/actions';

const UpdateInfo = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const [dateOfBirth, setDateOfBirth] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const idUser = localStorage.getItem('USER_ID')

  const onSubmit = (data: UserInfoOptions) => {
    const newUserInfo: UserInfoOptions = {
      ...data,
      gender: gender,
      dob: dateOfBirth
    }
    dispatch(updateUserInfoRequest(newUserInfo))
  }
  return (
    <section className="section-update-info">
      <div className="container">
        <h2 className="update-info-title">Update information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="update-form">
          <input placeholder="Firstname" {...register('firstName')}></input>
          <input placeholder="Lastname" {...register('lastName')}></input>
          <div className="select-gender">
            <label className="container-radio">Male
              <input type="radio" name="radio" onChange={(e: FormEvent<HTMLInputElement>) => setGender('male')}></input>
              <span className="checkmark"></span>
            </label>
            <label className="container-radio">Female
              <input type="radio" name="radio" onChange={(e: FormEvent<HTMLInputElement>) => setGender('female')}></input>
              <span className="checkmark"></span>
            </label>
          </div>
          <InputMask mask="99/99/9999" placeholder="Enter birthdate" value={dateOfBirth} onChange={(e: FormEvent<HTMLInputElement>) => setDateOfBirth(e.currentTarget.value)} />
          <input placeholder="Display name" {...register('displayName')}></input>
          <input placeholder="Phone" {...register('phone')}></input>
          <div className="form-btn">
            <button className="btn btn-primary" type="submit">Update </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UpdateInfo;
