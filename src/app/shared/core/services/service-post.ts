import axios from 'axios';
import axiosClient from './axios-client';
import { HandleFollowOptions } from 'app/shared/types/HandleFollow';
import { PostHandleOptions } from 'app/shared/types/PostHandle';

export const getNewPost = (params: {size: number }): any =>
  axiosClient.get(`posts/public?size=${params}`);

export const getSpecificPost = (params: { id: number }): any => axiosClient.get(`posts/${params}`);

export const getRecommendPost = (params: { size: number }): any =>
  axiosClient.get(`posts/recommend?size=${params}`);

export const getUserPost = (params: { userId: number }): any =>
  axiosClient.get(`users/${params}/posts`);

  export const deleteUserPost = (params: { postId: number }): any =>
  axiosClient.delete(`posts/${params}`);

  
  // export const getRecommendPost = (params: { page: number; size: number }): any =>
  //   axiosClient.get('posts/public', { params });
  
  export const getSpecificArticle = (params: { id: number }): any =>
    axiosClient.get(`posts/${params}`);
  
  export const getUrlImage = (imageFile: File) => {
    const signUrlOption = {
      typeUpload: 'cover-post',
      fileName: imageFile.name,
      fileType: imageFile.type,
    };
    return axiosClient.get(
      `/signatures?type_upload=${signUrlOption.typeUpload}&file_name=${signUrlOption.fileName}&file_type=${signUrlOption.fileType}`
    );
  }
  
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
  
  export const commentPost = (postId: string, post: CommentHandleOptions): any =>
    axiosClient.post(`posts/${postId}/comments`, post);
  
  export const followUser = (data: HandleFollowOptions): any =>
    axiosClient.post(`/friends/follow`, data);
  
  
  
