import { PostHandleOptions } from 'app/shared/types/PostHandle';
import axiosClient from './axios-client';
import axios from 'axios';
import { HandleFollowOptions } from 'app/shared/types/HandleFollow';
import { postOptions } from 'app/shared/models/post-interface';

export const getRecommendPost = (params: { page: number; size: number }): any =>
  axiosClient.get('posts/public', { params });

export const getSpecificArticle = (params: { id: number }): any =>
  axiosClient.get(`posts/${params}`);

export const getSignUrl = (
  typeUpload: string,
  fileName: string,
  fileType: string
): Promise<postOptions[]> =>
  axiosClient.get(
    `/signatures?type_upload=${typeUpload}&file_name=${fileName}&file_type=${fileType}`
  );

export const upLoadImage = (url: string, fileImage: File): any =>
  axios.put(url, fileImage);

export const createNewPost = (post: PostHandleOptions): any =>
  axiosClient.post('posts', post);

export const updatePost = (post: PostHandleOptions, postId: string): any =>
  axiosClient.put(`posts/${postId}`, post);

export const likePost = (postId: string): any =>
  axiosClient.put(`posts/${postId}/likes`);

export const getCommentPost = (postId: string): any =>
  axiosClient.get(`posts/${postId}/comments`);

export const commentPost = (postId: string, post: CommentHanldeOptions): any =>
  axiosClient.post(`posts/${postId}/comments`, post);

export const followUser = (data: HandleFollowOptions): any =>
  axiosClient.post(`/friends/follow`, data);


