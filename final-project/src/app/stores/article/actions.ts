import { articleConstant } from 'share/constants/articleConstant';

export const getArticle = (param: object[]) => ({
  type: articleConstant.GET_ARTICLE,
  payload: param,
});