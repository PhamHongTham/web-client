import { articleConstant } from 'app/shared/constants/articleConstant';
import { apiWrapper } from 'app/shared/core/services/apiWrapper';
import axiosClient from 'app/shared/core/services/axios-client';
import {
  getRecommendPost,
  getSpecificArticle,
  upLoadImage,
  createNewPost,
  updatePost,
  likePost,
  commentPost,
  getCommentPost,
  followUser,
  getUrlImage,
} from 'app/shared/core/services/service-article';
import { removeInfoUserLocalStorage } from 'app/shared/helper/LocalAction';
import { HandleFollowOptions } from 'app/shared/types/HandleFollow';
import { PostHandleOptions } from 'app/shared/types/PostHandle';

export const fetchArticleRequest = () => async (dispatch: any) => {
  dispatch({ type: articleConstant.FETCH_ARTICLE_REQUEST });
  const params: { page: number; size: number } = {
    page: 1,
    size: 6,
  };
  try {
    const res = await getRecommendPost(params);
    dispatch({ type: articleConstant.FETCH_ARTICLE_SUCCESS, payload: res });
  } catch (error: any) {
    dispatch({
      type: articleConstant.FETCH_ARTICLE_FAILURE,
      payload: error.response.data,
    });
  }
};

export const fetchSpecificArticleRequest: any =
  (id: any) => async (dispatch: any) => {
    return apiWrapper(() => getSpecificArticle(id), dispatch);
  };

export const getUrlImageRequest: any =
  (imageFile: File) => async (dispatch: any) => {
    return apiWrapper(() => getUrlImage(imageFile), dispatch);
  };

export const createNewPostRequest: any =
  (post: PostHandleOptions) => async (dispatch: any) => {
    return apiWrapper(() => createNewPost(post), dispatch);
  };

export const updatePostRequest: any =
  (post: PostHandleOptions, postId: string) => async (dispatch: any) => {
    return apiWrapper(() => updatePost(post, postId), dispatch);
  };

export const likePostRequest: any =
  (postId: string) => async (dispatch: any) => {
    return apiWrapper(() => likePost(postId), dispatch);
  };

export const getCommentPostRequest: any =
  (postId: string) => async (dispatch: any) => {
    return apiWrapper(() => getCommentPost(postId), dispatch);
  };

export const commentPostRequest: any =
  (postId: string, post: CommentHanldeOptions) => async (dispatch: any) => {
    return apiWrapper(() => commentPost(postId, post), dispatch);
  };

export const followUserRequest: any =
  (followId: HandleFollowOptions) => async (dispatch: any) => {
    return apiWrapper(() => followUser(followId), dispatch);
  };

export const saveInfoPost = (infoPost: {
  title: string;
  description: string;
  content: string;
}) => {
  return {
    type: articleConstant.SAVE_INFO_POST,
    payload: infoPost,
  };
};
