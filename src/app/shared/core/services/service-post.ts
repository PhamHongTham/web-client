import axiosClient from './axios-client';

export const getNewPost = (params: { page: number; size: number }): any =>
  axiosClient.get('posts/public', { params });

export const getSpecificPost = (params: { id: number }): any => axiosClient.get(`posts/${params}`);

export const getRecommendPost = (params: { page: number }): any =>
  axiosClient.get(`posts/recommend?page=${params}`);

export const getUserPost = (params: { userId: number }): any =>
  axiosClient.get(`users/${params}/posts`);

  export const deleteUserPost = (params: { postId: number }): any =>
  axiosClient.delete(`posts/${params}`);
