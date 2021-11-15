import {
  changePassword,
  getUserInfo,
  login,
  signUp,
  updateUserInfo,
} from 'app/shared/core/services/auth';
import { UserConstant } from 'app/shared/constants/UserConstant';
import { UserLoginOptions } from 'app/shared/types/UserLogin';
import { PasswordOptions } from 'app/shared/types/Password';
import { UserInfoOptions } from 'app/shared/models/User';
import {
  addInfoLocalStorage,
  removeInfoLocalStorage,
} from 'app/shared/helper/LocalAction';

export const loginRequest =
  (userInfo: UserLoginOptions) => async (dispatch: any) => {
    dispatch({ type: UserConstant.LOGIN_REQUEST, payload: userInfo });
    try {
      const data = await login(userInfo);
      dispatch({ type: UserConstant.LOGIN_SUCCESS, payload: data });
      addInfoLocalStorage('USER_TOKEN', JSON.stringify(data.accessToken));
      addInfoLocalStorage('USER_ID', JSON.stringify(data.userInfo.id));
    } catch (error: any) {
      dispatch({
        type: UserConstant.LOGIN_FAILURE,
        payload: error.response.data.errors[0],
      });
    }
  };

export const signUpRequest =
  (userInfo: any, callback: () => void) => async (dispatch: any) => {
    dispatch({ type: UserConstant.SIGN_UP_REQUEST, payload: userInfo });
    try {
      const data = await signUp(userInfo);
      dispatch({ type: UserConstant.SIGN_UP_SUCCESS, payload: data });
      callback();
    } catch (error: any) {
      dispatch({
        type: UserConstant.SIGN_UP_FAILURE,
        payload: error.response.data.errors[0],
      });
    }
  };

export const logoutRequest = () => {
  removeInfoLocalStorage('USER_TOKEN');
  removeInfoLocalStorage('USER_ID');
  return {
    type: UserConstant.LOGOUT,
  };
};

export const getUserInfoRequest = () => async (dispatch: any) => {
  dispatch({ type: UserConstant.GET_USER_INFO_REQUEST });
  try {
    const data = await getUserInfo();
    dispatch({ type: UserConstant.GET_USER_INFO_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: UserConstant.GET_USER_INFO_FAILURE,
      payload: error.response.data.errors[0],
    });
  }
};

export const changePasswordRequest =
  (info: PasswordOptions) => async (dispatch: any) => {
    dispatch({ type: UserConstant.CHANGE_PASSWORD_REQUEST });
    try {
      const data = await changePassword(info);
      dispatch({ type: UserConstant.CHANGE_PASSWORD_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: UserConstant.CHANGE_PASSWORD_FAILURE,
        payload: error.response.data.errors[0],
      });
    }
  };

export const updateUserInfoRequest =
  (info: UserInfoOptions) => async (dispatch: any) => {
    dispatch({ type: UserConstant.UPDATE_USER_INFO_REQUEST });
    try {
      const idUser = localStorage.getItem('USER_ID');
      if (idUser) {
        const data = await updateUserInfo(info, idUser);
        dispatch({
          type: UserConstant.UPDATE_USER_INFO_SUCCESS,
          payload: data,
        });
      }
    } catch (error: any) {
      dispatch({
        type: UserConstant.UPDATE_USER_INFO_FAILURE,
        payload: error.response.data.errors[0],
      });
    }
  };

export const clearUserState = () => {
  return {
    type: UserConstant.CLEAR_USER_STATE,
  };
};
