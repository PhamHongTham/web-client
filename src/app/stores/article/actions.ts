import { articleConstant } from 'app/shared/constants/articleConstant';
import {
  getRecommendPost,
  getSignUrl,
  getSpecificArticle,
  upLoadImage,
  createNewPost,
  updatePost,
  likePost,
  commentPost,
  getCommentPost,
  followUser,
} from 'app/shared/core/services/service-article';
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

export const fetchSpecificArticleRequest =
  (id: any) => async (dispatch: any) => {
    dispatch({ type: articleConstant.FETCH_SPECIFIC_ARTICLE_REQUEST });
    try {
      const res = await getSpecificArticle(id);
      dispatch({
        type: articleConstant.FETCH_SPECIFIC_ARTICLE_SUCCESS,
        payload: res,
      });
    } catch (error: any) {
      dispatch({
        type: articleConstant.FETCH_SPECIFIC_ARTICLE_FAILURE,
        payload: error.response.data,
      });
    }
  };

export const getSignUrlRequest =
  ({
    typeUpload,
    fileName,
    fileType,
  }: {
    typeUpload: string;
    fileName: string;
    fileType: string;
  }) =>
  async (dispatch: any) => {
    dispatch({ type: articleConstant.GET_SIGN_URL_REQUEST });
    try {
      const data = await getSignUrl(typeUpload, fileName, fileType);
      dispatch({ type: articleConstant.GET_SIGN_URL_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: articleConstant.GET_SIGN_URL_FAILURE,
        payload: error.response.data,
      });
    }
  };

export const uploadImageRequest =
  (url: string, fileImage: File) => async (dispatch: any) => {
    dispatch({ type: articleConstant.UPLOAD_IMAGE_REQUEST });
    try {
      const data = await upLoadImage(url, fileImage);
      dispatch({ type: articleConstant.UPLOAD_IMAGE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: articleConstant.UPLOAD_IMAGE_FAILURE,
        payload: error.response.data,
      });
    }
  };

export const createNewPostRequest =
  (post: PostHandleOptions) => async (dispatch: any) => {
    dispatch({ type: articleConstant.CREATE_NEW_POST_REQUEST });
    try {
      const data = await createNewPost(post);
      dispatch({
        type: articleConstant.CREATE_NEW_POST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: articleConstant.CREATE_NEW_POST_FAILURE,
        payload: error.response.data,
      });
    }
  };

export const updatePostRequest =
  (post: PostHandleOptions, postId: string) => async (dispatch: any) => {
    dispatch({ type: articleConstant.UPDATE_POST_REQUEST });
    try {
      const data = await updatePost(post, postId);
      dispatch({ type: articleConstant.UPDATE_POST_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: articleConstant.UPDATE_POST_FAILURE,
        payload: error.response.data,
      });
    }
  };

export const likePostRequest = (postId: string) => async (dispatch: any) => {
  dispatch({ type: articleConstant.LIKE_POST_REQUEST });
  try {
    const data = await likePost(postId);
    dispatch({ type: articleConstant.LIKE_POST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: articleConstant.LIKE_POST_FAILURE,
      payload: error.response.data,
    });
  }
};

export const getCommentPostRequest =
  (postId: string) => async (dispatch: any) => {
    dispatch({ type: articleConstant.GET_COMMENT_POST_REQUEST });
    try {
      const data = await getCommentPost(postId);
      dispatch({
        type: articleConstant.GET_COMMENT_POST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: articleConstant.GET_COMMENT_POST_FAILURE,
        payload: error.response.data,
      });
    }
  };

export const commentPostRequest =
  (postId: string, post: CommentHanldeOptions) => async (dispatch: any) => {
    dispatch({ type: articleConstant.COMMENT_POST_REQUEST });
    try {
      const data = await commentPost(postId, post);
      dispatch({ type: articleConstant.COMMENT_POST_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: articleConstant.COMMENT_POST_FAILURE,
        payload: error.response.data,
      });
    }
  };

export const followUserRequest =
  (followId: HandleFollowOptions) => async (dispatch: any) => {
    dispatch({ type: articleConstant.FOLLOW_USER_REQUEST });
    try {
      const data = await followUser(followId);
      dispatch({ type: articleConstant.FOLLOW_USER_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: articleConstant.FOLLOW_USER_FAILURE,
        payload: error.response.data,
      });
    }
  };
