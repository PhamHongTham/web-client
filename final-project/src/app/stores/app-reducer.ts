import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import articleState from './article/reducer';

export const rootReducer = combineReducers({
  userState: userReducer,
  article: articleState,
});

export type RootState = ReturnType<typeof rootReducer>;
