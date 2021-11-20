import { postConstant } from 'app/shared/constants/postConstant';

const initialState = {
  currentPost: {},
  posts: [],
  isLoading: false,
  error: null,
  loadMore: true,
};

const postReducer = (
  state: any = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case postConstant.FETCH_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case postConstant.FETCH_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload.data,
        loadMore: action.payload.loadMore,
      };
    case postConstant.FETCH_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case postConstant.FETCH_MORE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case postConstant.FETCH_MORE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload.data,
        loadMore: action.payload.loadMore,
      };
    case postConstant.FETCH_MORE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case postConstant.FETCH_USER_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case postConstant.FETCH_USER_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadMore: false,
        posts: action.payload,
      };
    case postConstant.FETCH_USER_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        loadMore: false,
        error: action.payload,
      };

    case postConstant.FETCH_SPECIFIC_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case postConstant.FETCH_SPECIFIC_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentPost: action.payload,
      };
    case postConstant.FETCH_SPECIFIC_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case postConstant.DELETE_USER_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case postConstant.DELETE_USER_POST_SUCCESS:
      const newPost = state.posts.filter(
        (post: any) => post.id !== action.payload.postId
      );
      return {
        ...state,
        isLoading: false,
        posts: newPost,
        message: action.payload.message,
      };
    case postConstant.DELETE_USER_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case postConstant.SAVE_INFO_POST:
      return {
        ...state,
        infoPost: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
