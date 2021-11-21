import axiosClient from './axios-client';
import { UserLoginOptions } from 'app/shared/types/UserLogin';
import { PasswordOptions } from 'app/shared/types/Password';
import { UserInfoOptions } from 'app/shared/models/User';

export const login = (user: UserLoginOptions): any =>
  axiosClient.post('/users/login', user);

export const signUp = (user: UserLoginOptions): any =>
  axiosClient.post('/users/register', user);

export const getUserInfo = (): any => axiosClient.get('/users/me');

export const changePassword = (data: PasswordOptions): any =>
  axiosClient.put('/users/change-password', data);

export const updateUserInfo = (data: UserInfoOptions): any =>
  axiosClient.put('/users/me', data);
  
export const getUserInfoById = (id: string): any =>
  axiosClient.get(`/users/${id}`);
