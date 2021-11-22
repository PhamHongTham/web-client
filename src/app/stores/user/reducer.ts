import { UserConstant } from 'app/shared/constants/UserConstant';
const initialState = {
  isLoading: false,
  userCurrent: null,
  error: null,
  message: null,
  anotherUser: null,
  showModalSignIn: false,
};
export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserConstant.LOGIN_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case UserConstant.LOGIN_SUCCESS: {
      return {
        isLoading: false,
        userCurrent: action.payload.userInfo,
      };
    }
    case UserConstant.LOGIN_FAILURE: {
      return {
        isLoading: false,
        error: action.payload,
      };
    }

    case UserConstant.SIGN_UP_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case UserConstant.SIGN_UP_SUCCESS: {
      return {
        isLoading: false,
        message: action.payload,
      };
    }
    case UserConstant.SIGN_UP_FAILURE: {
      return {
        isLoading: false,
        error: action.payload,
      };
    }
    case UserConstant.GET_USER_INFO_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case UserConstant.GET_USER_INFO_SUCCESS: {
      return {
        isLoading: false,
        userCurrent: action.payload,
      };
    }
    case UserConstant.GET_USER_INFO_FAILURE: {
      return {
        isLoading: false,
      };
    }

    case UserConstant.CHANGE_PASSWORD_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case UserConstant.CHANGE_PASSWORD_SUCCESS: {
      return {
        isLoading: false,
        message: action.payload,
      };
    }
    case UserConstant.CHANGE_PASSWORD_FAILURE: {
      return {
        isLoading: false,
        error: action.payload,
      };
    }

    case UserConstant.UPDATE_USER_INFO_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case UserConstant.UPDATE_USER_INFO_SUCCESS: {
      return {
        isLoading: false,
        userCurrent: action.payload,
        message: 'update user success',
      };
    }
    case UserConstant.UPDATE_USER_INFO_FAILURE: {
      return {
        isLoading: false,
        error: action.payload,
      };
    }

    case UserConstant.GET_USER_INFO_BY_ID_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case UserConstant.GET_USER_INFO_BY_ID_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        anotherUser: action.payload,
      };
    }
    case UserConstant.GET_USER_INFO_BY_ID_FAILURE: {
      return {
        isLoading: false,
      };
    }

    case UserConstant.LOGOUT: {
      return {
        isLoading: false,
        userCurrent: null,
        error: null,
        message: null,
      };
    }
    case UserConstant.SHOW_MODAL_SIGN_IN: {
      return {
        ...state,
        showModalSignIn: action.payload,
      };
    }

    case UserConstant.CLEAR_USER_STATE: {
      return {
        isLoading: false,
        userCurrent: null,
        error: null,
        message: null,
      };
    }

    default:
      return state;
  }
};
