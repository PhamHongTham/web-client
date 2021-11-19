import { articleConstant } from 'app/shared/constants/articleConstant';

const initialState = {
  currentArticle: null,
  articles: [],
  isLoading: false,
  error: null,
  message: null,
  signUrl: {
    signedRequest: null,
    url: null,
  },
  liked: false,
  followed: false,
  comments: [],
};

const articleReducer = (
  state: any = initialState,
  action: { type: string; payload: object[] }
) => {
  switch (action.type) {
    case articleConstant.FETCH_ARTICLE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case articleConstant.FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };
    case articleConstant.FETCH_ARTICLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case articleConstant.FETCH_SPECIFIC_ARTICLE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case articleConstant.FETCH_SPECIFIC_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentArticle: action.payload,
      };
    case articleConstant.FETCH_SPECIFIC_ARTICLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case articleConstant.GET_SIGN_URL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case articleConstant.GET_SIGN_URL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        signUrl: action.payload,
        error: null,
      };
    case articleConstant.GET_SIGN_URL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case articleConstant.UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case articleConstant.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        error: null,
      };
    case articleConstant.UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case articleConstant.CREATE_NEW_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case articleConstant.CREATE_NEW_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        error: null,
      };
    case articleConstant.CREATE_NEW_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case articleConstant.UPDATE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case articleConstant.UPDATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: 'Update post success',
        error: null,
      };
    case articleConstant.UPDATE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    
    case articleConstant.LIKE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case articleConstant.LIKE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        liked: action.payload,
      };
    case articleConstant.LIKE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case articleConstant.GET_COMMENT_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case articleConstant.GET_COMMENT_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };
    case articleConstant.GET_COMMENT_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case articleConstant.COMMENT_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case articleConstant.COMMENT_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: [...state.comments, action.payload],
      };
    case articleConstant.COMMENT_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

      case articleConstant.FOLLOW_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case articleConstant.FOLLOW_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          followed: action.payload
        };
      case articleConstant.FOLLOW_USER_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };

    default:
      return state;
  }
};

export default articleReducer;
