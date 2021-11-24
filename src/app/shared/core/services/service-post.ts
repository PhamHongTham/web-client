import axios from 'axios';
import axiosClient from './axios-client';
import { HandleFollowOptions } from 'app/shared/types/HandleFollow';
import { PostHandleOptions } from 'app/shared/types/PostHandle';

export const getSpecificArticle = (params: { id: number }): any =>
  axiosClient.get(`posts/${params}`);

export const getUrlImage = async (imageFile: File, typeUpload: string) => {
  const signUrlOption = {
    typeUpload: typeUpload,
    fileName: imageFile.name,
    fileType: imageFile.type,
  };
  const res = await axiosClient.get(
    `/signatures?type_upload=${signUrlOption.typeUpload}&file_name=${signUrlOption.fileName}&file_type=${signUrlOption.fileType}`
  );
  return res;
};

export const upLoadImage = (url: string, fileImage: File): any => axios.put(url, fileImage);

export const createNewPost = (post: PostHandleOptions): any => axiosClient.post('posts', post);

export const updatePost = (post: PostHandleOptions, postId: string): any =>
  axiosClient.put(`posts/${postId}`, post);

export const likePost = (postId: string): any => axiosClient.put(`posts/${postId}/likes`);

export const addBookmark = (bookmarkState: { postId: string }): any =>
  axiosClient.post(`bookmarks/`, bookmarkState);

export const getCommentPost = (postId: string): any => axiosClient.get(`posts/${postId}/comments`);

export const commentPost = (postId: string, post: CommentHandleOptions): any =>
  axiosClient.post(`posts/${postId}/comments`, post);

export const followUser = (data: HandleFollowOptions): any =>
  axiosClient.post(`/friends/follow`, data);

export const getNewPost = (params: number): any => axiosClient.get(`posts/public?page=${params}`);

export const getSpecificPost = (params: number): any => axiosClient.get(`posts/${params}`);

export const getRecommendPost = (params: number): any => axiosClient.get(`posts?page=${params}`);

export const getUserPost = (params: number): any =>
  axiosClient.get(`users/${params}/posts`);

  export const getUserBookmark = (): any =>
  axiosClient.get(`/bookmarks/`);

export const deleteUserPost = (params: number): any =>
  axiosClient.delete(`posts/${params}`);
