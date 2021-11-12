import React from 'react';
import { articleOption } from 'share/model/articleInterface';
import { Link } from 'react-router-dom';
import { convertFromStringToDate } from 'share/helper/helper-function';

const Post = (props: articleOption) => {
  const { id, title, likes, user, cover, description, createdAt } = props;
  const postCreateTime = convertFromStringToDate(createdAt);
  return (
    <li key={id} className="list-item col-4 col-lg-6 col-md-12">
      <div className="post">
        <div className="post-img-top">
          <img src={cover} alt="" className="image" />
        </div>
        <div className="post-body">
          <div className="post-topic-date">
            <h4 className="post-topic">Business, Travel</h4>
            <p className="post-text post-date">—{postCreateTime}</p>
          </div>
          <h2 className="post-title">{title}</h2>
          <p className="post-text" dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
        <Link to="/" className="post-footer">
          <img src={user.picture} alt="" className="author-avatar" />
          <div className="author-info">
            <h4 className="post-text author-name">{user.displayName}</h4>
            <p className="post-text author-email">{user.email}</p>
          </div>
        </Link>
      </div>
    </li>
  );
};
export default Post;
