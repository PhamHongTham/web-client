import { postConstant } from 'app/shared/constants/postConstant';
import {
  commentPost,
  createNewPost,
  followUser,
  getCommentPost,
  getUrlImage,
  likePost,
  updatePost,
  upLoadImage,
} from 'app/shared/core/services/service-article';
import {
  getNewPost,
  getSpecificPost,
  getRecommendPost,
  getUserPost,
  deleteUserPost,
} from 'app/shared/core/services/service-post';
import { HandleFollowOptions } from 'app/shared/types/HandleFollow';
import { PostHandleOptions } from 'app/shared/types/PostHandle';

const apiWrapper = async (api: any, dispatch: any) => {
  try {
    const res = await api();
    return res;
  } catch (error: any) {
    if (error.response.status === 401) {
      // removeInfoUserLocalStorage();
      dispatch({
        type: 'CLEAR_SESSION',
        payload: error.response.data,
      });
    } else {
      dispatch({
        type: 'OPEN_POPUP',
        payload: error.response.data.errors[0],
      });
    }
  }
};
export const fetchSpecificArticleRequest: any =
  (id: any) => async (dispatch: any) => {
    return apiWrapper(() => getSpecificPost(id), dispatch);
  };

export const fetchPostRequest = (size: any) => async (dispatch: any) => {
  dispatch({ type: postConstant.FETCH_POST_REQUEST });
  try {
    const res = await getNewPost(size);
    dispatch({ type: postConstant.FETCH_POST_SUCCESS, payload: res });
  } catch (error: any) {
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
    dispatch({
      type: postConstant.FETCH_SPECIFIC_POST_FAILURE,
      payload: error.response.data,
    });
  }
};

export const fetchRecommendPostRequest =
  (pageNumber: any) => async (dispatch: any) => {
    dispatch({ type: postConstant.FETCH_MORE_POST_REQUEST });
    try {
      const res = await getRecommendPost(pageNumber);
      dispatch({ type: postConstant.FETCH_MORE_POST_SUCCESS, payload: res });
    } catch (error: any) {
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
    dispatch({
      type: postConstant.FETCH_USER_POST_SUCCESS,
      payload: res.Posts,
    });
  } catch (error: any) {
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
    dispatch({
      type: postConstant.DELETE_USER_POST_SUCCESS,
      payload: { postId, message: res },
    });
  } catch (error: any) {
    dispatch({
      type: postConstant.DELETE_USER_POST_FAILURE,
      payload: error.response,
    });
  }
};

export const getUrlImageRequest: any =
  (imageFile: File) => async (dispatch: any) => {
    return apiWrapper(() => getUrlImage(imageFile), dispatch);
  };

export const uploadImage: any = (imageFile: File) => async (dispatch: any) => {
  return apiWrapper(async () => {
    const { signedRequest, url }: any = await getUrlImage(imageFile);
    await upLoadImage(signedRequest, imageFile);
    return url;
  }, dispatch);
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
  (postId: string, post: CommentHandleOptions) => async (dispatch: any) => {
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
    type: postConstant.SAVE_INFO_POST,
    payload: infoPost,
  };
};
