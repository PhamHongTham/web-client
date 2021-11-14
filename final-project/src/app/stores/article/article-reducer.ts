import articleApi from 'api/service-article';
const initialState = {
  articles: [],
};

const GET_ARTICLE = 'GET_ARTICLE';

export const getArticle = (param: object[]) => ({
  type: GET_ARTICLE,
  payload: param,
});

export const fetchArticle = () => async (dispatch: any) => {
  const params: { page: number; size: number } = {
    page: 19,
    size: 6,
  };
  const res = await articleApi.getAll(params);
  dispatch(getArticle(res.data));
};

const articleReducer = (state: any = initialState, action: { type: string; payload: object[] }) => {
  switch (action.type) {
    case GET_ARTICLE:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
