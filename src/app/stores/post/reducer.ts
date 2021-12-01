import { postConstant } from 'app/shared/constants/postConstant';

const initialState = {
  infoPost: null,
  urlImage: null,
};

const postReducer = (
  state: any = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case postConstant.SAVE_INFO_POST:
      return {
        ...state,
        infoPost: action.payload,
      };
    case postConstant.SAVE_URL_IMAGE:
      return {
        ...state,
        urlImage: action.payload,
      };
    case postConstant.CLEAR_URL_IMAGE:
      return {
        ...state,
        urlImage: null,
      };
    default:
      return state;
  }
};

export default postReducer;
