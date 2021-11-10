import React from 'react';
import Post from './Post';
const RecommendPost = () => {
  return (
    <section className="section-recommend-post">
      <div className="container">
        <ul className="row group-item">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </ul>
      </div>
    </section>
  );
};
export default RecommendPost;
