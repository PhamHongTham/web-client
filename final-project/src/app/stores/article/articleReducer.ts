import axios from 'axios';
const initialState = {
  articles: [],
};

const GET_ARTICLE = 'GET_ARTICLE';

export const getArticle = (param: object[]) => ({
  type: GET_ARTICLE,
  payload: param,
});

export const fetchArticle = () => async (dispatch: any) => {
  console.log('reducer');
  const res = await axios.get(
    'https://vast-lowlands-08945.herokuapp.com/api/v1/posts/public?page=22&size=6'
  );
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
