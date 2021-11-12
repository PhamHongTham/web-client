import { combineReducers } from 'redux';
import articleReducer from './article/articleReducer';

export const rootReducer = combineReducers({
  article: articleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
