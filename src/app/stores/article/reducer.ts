import { articleConstant } from 'app/shared/constants/articleConstant';

const initialState = {
  articles: [],
  isLoading: false,
  error: null,
  message: null,
  infoPost: null,
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

    case articleConstant.SAVE_INFO_POST:
      return {
        ...state,
        infoPost: action.payload,
      };

    default:
      return state;
  }
};

export default articleReducer;
