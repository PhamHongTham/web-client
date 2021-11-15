import { articleConstant } from 'share/constants/articleConstant';

const initialState = {
  articles: [],
  isLoading: false,
  error: null,
};

const articleReducer = (state: any = initialState, action: { type: string; payload: object[] }) => {
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
    default:
      return state;
  }
};

export default articleReducer;
