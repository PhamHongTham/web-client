import { postConstant } from 'app/shared/constants/postConstant';
import { apiWrapper } from 'app/shared/core/services/apiWrapper';
import { HandleFollowOptions } from 'app/shared/types/HandleFollow';
import { PostHandleOptions } from 'app/shared/types/PostHandle';
import {
  addBookmark,
  commentPost,
  createNewPost,
  followUser,
  getCommentPost,
  getUrlImage,
  likePost,
  updatePost,
  upLoadImage,
  getNewPost,
  getUserPost,
  deleteUserPost,
  getRecommendPost,
  getSpecificArticle,
} from 'app/shared/core/services/service-post';

export const fetchSpecificPostRequest: any = (id: any) => async (dispatch: any) => {
  return apiWrapper(() => getSpecificArticle(id), dispatch);
};

export const getUrlImageRequest: any = (imageFile: File) => async (dispatch: any) => {
  return apiWrapper(() => getUrlImage(imageFile), dispatch);
};

export const createNewPostRequest: any = (post: PostHandleOptions) => async (dispatch: any) => {
  return apiWrapper(() => createNewPost(post), dispatch);
};

export const updatePostRequest: any =
  (post: PostHandleOptions, postId: string) => async (dispatch: any) => {
    return apiWrapper(() => updatePost(post, postId), dispatch);
  };

export const likePostRequest: any = (postId: string) => async (dispatch: any) => {
  return apiWrapper(() => likePost(postId), dispatch);
};
export const addBookmarkRequest: any = (postId: { postId: string }) => async (dispatch: any) => {
  return apiWrapper(() => addBookmark(postId), dispatch);
};

export const getCommentPostRequest: any = (postId: string) => async (dispatch: any) => {
  return apiWrapper(() => getCommentPost(postId), dispatch);
};

export const commentPostRequest: any =
  (postId: string, post: CommentHandleOptions) => async (dispatch: any) => {
    return apiWrapper(() => commentPost(postId, post), dispatch);
  };

export const followUserRequest: any = (followId: HandleFollowOptions) => async (dispatch: any) => {
  return apiWrapper(() => followUser(followId), dispatch);
};

export const saveInfoPost: any = (infoPost: {
  title: string;
  description: string;
  content: string;
}) => {
  return {
    type: postConstant.SAVE_INFO_POST,
    payload: infoPost,
  };
};

export const fetchPostRequest: any = (size: any) => async (dispatch: any) => {
  return apiWrapper(() => getNewPost(size), dispatch);
};

export const fetchRecommendPostRequest: any = (pageNumber: any) => async (dispatch: any) => {
  return apiWrapper(() => getRecommendPost(pageNumber), dispatch);
};

export const fetchUserPostRequest: any = (userId: any) => async (dispatch: any) => {
  return apiWrapper(() => getUserPost(userId), dispatch);
};

export const deleteUserPostRequest: any = (postId: any) => async (dispatch: any) => {
  return apiWrapper(() => deleteUserPost(postId), dispatch);
};

export const uploadImage: any = (imageFile: File) => async (dispatch: any) => {
  return apiWrapper(async () => {
    const { signedRequest, url }: any = await getUrlImage(imageFile);
    await upLoadImage(signedRequest, imageFile);
    return url;
  }, dispatch);
};
