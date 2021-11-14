import articleApi from 'api/service-article';

import { getArticle } from './actions';

import { articleConstant } from 'share/constants/articleConstant';

const initialState = {
  articles: [],
};

export const fetchArticle = () => async (dispatch: any) => {
  const params: { page: number; size: number } = {
    page: 1,
    size: 6,
  };
  const res = await articleApi.getAll(params);
  dispatch(getArticle(res.data));
};

const articleState = (state: any = initialState, action: { type: string; payload: object[] }) => {
  switch (action.type) {
    case articleConstant.GET_ARTICLE:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

export default articleState;
