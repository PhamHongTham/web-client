import React, { useEffect } from 'react';

import Post from './Post';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'app/stores/app-reducer';
// import { fetchArticle } from 'app/stores/article/reducer';

import { articleOptions } from 'share/model/article-interface';
import SkeletonRecommendArticle from 'share/component/skeleton-component/SkeletonRecommendArticle';
import { fetchArticleRequest } from 'app/stores/article/actions';
const RecommendPost = () => {
  const { articles, isLoading }: any = useSelector((state: RootState) => state.article);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticleRequest());
  }, [dispatch]);
  return (
    <section className="section-recommend-post">
      <div className="container">
        <ul className="row group-item">
          {articles.data?.map((article: articleOptions) => (
            <Post article={article} />
          ))}
        </ul>
        {isLoading && (
          <ul className="row group-item">
            {[1, 2, 3, 4, 5, 6].map((n: number) => (
              <SkeletonRecommendArticle key={n} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
export default RecommendPost;
