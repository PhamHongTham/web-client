import { postConstant } from 'app/shared/constants/postConstant';

const initialState = {
  infoPost: null,
};

const postReducer = (state: any = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case postConstant.SAVE_INFO_POST:
      return {
        ...state,
        infoPost: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
