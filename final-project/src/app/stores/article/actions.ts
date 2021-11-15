import { articleConstant } from 'share/constants/articleConstant';

import articleApi from 'api/service-article';

export const fetchArticleRequest = () => async (dispatch: any) => {
  dispatch({ type: articleConstant.FETCH_ARTICLE_REQUEST });
  const params: { page: number; size: number } = {
    page: 1,
    size: 6,
  };
  try {
    const res = await articleApi.getAll(params);
    dispatch({ type: articleConstant.FETCH_ARTICLE_SUCCESS, payload: res.data });
  } catch (error: any) {
    dispatch({
      type: articleConstant.FETCH_ARTICLE_FAILURE,
      payload: error.response.data.errors[0],
    });
  }
};
