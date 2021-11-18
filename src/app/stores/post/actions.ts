import { postConstant } from 'app/shared/constants/postConstant';
import {
  getNewPost,
  getSpecificPost,
  getRecommendPost,
} from 'app/shared/core/services/service-post';

export const fetchPostRequest = () => async (dispatch: any) => {
  dispatch({ type: postConstant.FETCH_POST_REQUEST });
  const params: { page: number; size: number } = {
    page: 1,
    size: 6,
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
  dispatch({ type: postConstant.FETCH_POST_REQUEST });
  try {
    const res = await getRecommendPost(pageNumber);
    console.log(res)
    dispatch({ type: postConstant.FETCH_MORE_POST_SUCCESS, payload: res });
  } 
  catch (error: any) {
    console.log(error);
    dispatch({
      type: postConstant.FETCH_POST_FAILURE,
      payload: error.response.data,
    });
  }
};
