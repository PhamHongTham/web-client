import axiosClient from './axios-client';

export const getNewPost = (params: {size: number }): any =>
  axiosClient.get(`posts/public?size=${params}`);

export const getSpecificPost = (params: { id: number }): any => axiosClient.get(`posts/${params}`);

export const getRecommendPost = (params: { size: number }): any =>
  axiosClient.get(`posts/recommend?size=${params}`);

export const getUserPost = (params: { userId: number }): any =>
  axiosClient.get(`users/${params}/posts`);

  export const deleteUserPost = (params: { postId: number }): any =>
  axiosClient.delete(`posts/${params}`);
