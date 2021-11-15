import { articleConstant } from 'app/shared/constants/articleConstant';
import { getRecommendPost } from 'app/shared/core/services/service-article';

export const fetchArticleRequest = () => async (dispatch: any) => {
  dispatch({ type: articleConstant.FETCH_ARTICLE_REQUEST });
  const params: { page: number; size: number } = {
    page: 1,
    size: 6,
  };
  try {
    const res = await getRecommendPost(params);
    dispatch({ type: articleConstant.FETCH_ARTICLE_SUCCESS, payload: res });
  } catch (error: any) {
    console.log(error);
    // dispatch({
    //   type: articleConstant.FETCH_ARTICLE_FAILURE,
    //   payload: error.response.data,
    // });
  }
};
