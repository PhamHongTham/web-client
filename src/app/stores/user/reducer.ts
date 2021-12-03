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
        ...state,
        isLoading: true,
        error: null,
        userCurrent: null,
      };
    }
    case UserConstant.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userCurrent: action.payload.userInfo,
        error: null,
      };
    }
    case UserConstant.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case UserConstant.SIGN_UP_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case UserConstant.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    }
    case UserConstant.SIGN_UP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case UserConstant.GET_USER_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserConstant.GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userCurrent: action.payload,
      };
    }
    case UserConstant.GET_USER_INFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case UserConstant.CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserConstant.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    }
    case UserConstant.CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case UserConstant.UPDATE_USER_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserConstant.UPDATE_USER_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userCurrent: action.payload,
        message: 'update user success',
      };
    }
    case UserConstant.UPDATE_USER_INFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case UserConstant.GET_USER_INFO_BY_ID_REQUEST: {
      return {
        ...state,
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
        ...state,
        isLoading: false,
      };
    }

    case UserConstant.LOGOUT: {
      return {
        ...state,
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
        ...state,
        isLoading: false,
        error: null,
        message: null,
      };
    }

    default:
      return state;
  }
};
