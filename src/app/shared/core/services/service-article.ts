import { PostHandleOptions } from 'app/shared/types/PostHandle';
import axiosClient from './axios-client';
import axios from 'axios';
import { HandleFollowOptions } from 'app/shared/types/HandleFollow';
// import { postOptions } from 'app/shared/models/post-interface';

export const getRecommendPost = (params: { page: number; size: number }): any =>
  axiosClient.get('posts/public', { params });

export const getSpecificArticle = (params: { id: number }): any =>
  axiosClient.get(`posts/${params}`);

export const getUrlImage = (imageFile: File) => {
  const signUrlOption = {
    typeUpload: 'cover-post',
    fileName: imageFile.name,
    fileType: imageFile.type,
  };
  axiosClient.get(
    `/signatures?type_upload=${signUrlOption.typeUpload}&file_name=${signUrlOption.fileName}&file_type=${signUrlOption.fileType}`
  );
  return signUrlOption;
};

export const upLoadImage = (url: string, fileImage: File): any => axios.put(url, fileImage);

export const createNewPost = (post: PostHandleOptions): any => axiosClient.post('posts', post);

export const updatePost = (post: PostHandleOptions, postId: string): any =>
  axiosClient.put(`posts/${postId}`, post);

export const likePost = (postId: string): any => axiosClient.put(`posts/${postId}/likes`);

export const addBookmark = (bookmarkState: {postId:string}): any =>
  axiosClient.post(`bookmarks/`, bookmarkState);

export const getCommentPost = (postId: string): any => axiosClient.get(`posts/${postId}/comments`);

export const commentPost = (postId: string, post: CommentHandleOptions): any =>
  axiosClient.post(`posts/${postId}/comments`, post);

export const followUser = (data: HandleFollowOptions): any =>
  axiosClient.post(`/friends/follow`, data);
