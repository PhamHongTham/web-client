import { combineReducers } from 'redux';
import articleState from './article/reducer';

export const rootReducer = combineReducers({
  article: articleState,
});

export type RootState = ReturnType<typeof rootReducer>;
