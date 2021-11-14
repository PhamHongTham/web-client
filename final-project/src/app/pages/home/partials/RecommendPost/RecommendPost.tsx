import React, { useEffect } from 'react';

import Post from './Post';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'app/stores/app-reducer';
import { fetchArticle } from 'app/stores/article/reducer';

import { articleOptions } from 'share/model/article-interface';

const RecommendPost = () => {
  const { articles }: any = useSelector((state: RootState) => state.article);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticle());
  }, [dispatch]);
  return (
    <section className="section-recommend-post">
      <div className="container">
        <ul className="row group-item">
          {articles?.map((article: articleOptions) => (
            <Post article={article} />
          ))}
        </ul>
      </div>
    </section>
  );
};
export default RecommendPost;
