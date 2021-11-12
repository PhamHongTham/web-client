import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/stores/app-reducer';
import Post from './Post';
import { articleOption } from 'share/model/articleInterface';
const RecommendPost = () => {
  const listArticle = useSelector((state: RootState) => state.article?.articles);
  console.log('component', listArticle.data);
  return (
    <section className="section-recommend-post">
      <div className="container">
        <ul className="row group-item">{listArticle.data?.map((article: articleOption) => Post(article))}</ul>
      </div>
    </section>
  );
};
export default RecommendPost;
