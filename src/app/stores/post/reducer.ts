import { postConstant } from 'app/shared/constants/postConstant';

const initialState = {
  currentPost: {},
  posts: [],
  isLoading: false,
  error: null,
  loadMore: true,
};

const postReducer = (state: any = initialState, action: { type: string; payload: any }) => {
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
        posts: action.payload,
      };
    case postConstant.FETCH_MORE_POST_SUCCESS:
      const newPosts = [...state.posts, ...action.payload.data];
      return {
        ...state,
        isLoading: false,
        posts: newPosts,
        loadMore: action.payload.loadMore,
      };
    case postConstant.FETCH_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
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

    default:
      return state;
  }
};

export default postReducer;
