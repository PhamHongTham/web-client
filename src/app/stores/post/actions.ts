import { postConstant } from 'app/shared/constants/postConstant';
import {
  getNewPost,
  getSpecificPost,
  getRecommendPost,
  getUserPost,
  deleteUserPost,
} from 'app/shared/core/services/service-post';

export const fetchPostRequest = (s: number) => async (dispatch: any) => {
  dispatch({ type: postConstant.FETCH_POST_REQUEST });
  const params: { page: number; size: number } = {
    page: 1,
    size: s,
  };
  try {
    const res = await getNewPost(params);
    dispatch({ type: postConstant.FETCH_POST_SUCCESS, payload: res.data });
  } catch (error: any) {
    console.log(error);
    dispatch({
      type: postConstant.FETCH_POST_FAILURE,
      payload: error.response.data,
    });
  }
};

export const fetchSpecificPostRequest = (id: any) => async (dispatch: any) => {
  dispatch({ type: postConstant.FETCH_SPECIFIC_POST_REQUEST });
  try {
    const res = await getSpecificPost(id);
    dispatch({ type: postConstant.FETCH_SPECIFIC_POST_SUCCESS, payload: res });
  } catch (error: any) {
    console.log(error);
    dispatch({
      type: postConstant.FETCH_SPECIFIC_POST_FAILURE,
      payload: error.response.data,
    });
  }
};

export const fetchRecommendPostRequest = (pageNumber: any) => async (dispatch: any) => {
  dispatch({ type: postConstant.FETCH_MORE_POST_REQUEST });
  try {
    const res = await getRecommendPost(pageNumber);
    dispatch({ type: postConstant.FETCH_MORE_POST_SUCCESS, payload: res });
  } catch (error: any) {
    console.log(error);
    dispatch({
      type: postConstant.FETCH_MORE_POST_FAILURE,
      payload: error.response.data,
    });
  }
};

export const fetchUserPostRequest = (userId: any) => async (dispatch: any) => {
  dispatch({ type: postConstant.FETCH_USER_POST_REQUEST });
  try {
    const res = await getUserPost(userId);
    dispatch({ type: postConstant.FETCH_USER_POST_SUCCESS, payload: res.Posts });
  } catch (error: any) {
    console.log(error);
    dispatch({
      type: postConstant.FETCH_USER_POST_FAILURE,
      payload: error.response,
    });
  }
};

export const deleteUserPostRequest = (postId: any) => async (dispatch: any) => {
  dispatch({ type: postConstant.DELETE_USER_POST_REQUEST });
  try {
    const res = await deleteUserPost(postId);
    console.log(res)
    dispatch({ type: postConstant.DELETE_USER_POST_SUCCESS, payload: {postId,message:res} });
  } catch (error: any) {
    console.log(error);
    dispatch({
      type: postConstant.DELETE_USER_POST_FAILURE,
      payload: error.response,
    });
  }
};
