import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import postReducer from './post/reducer';

export const rootReducer = combineReducers({
  userState: userReducer,
  post: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
