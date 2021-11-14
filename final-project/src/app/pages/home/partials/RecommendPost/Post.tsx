import React from 'react';

import { Link } from 'react-router-dom';

import { articleOptions } from 'share/model/article-interface';

import { calculateTimeSince } from 'share/helper/helper-function';

const Post = ({article}:{article:articleOptions}) => {
  const { id, title, comments, likes, user, cover, description, createdAt } = article;
  const timeSince = calculateTimeSince(createdAt) + ' ago';

  return (
    <li key={id} className="list-item col-4 col-lg-6 col-md-12">
      <div className="card">
        <div className="card-img">
          <img src={cover} alt="" className="post-image" />
        </div>
        <div className="card-body post-content">
          <h2 className="card-title">{title}</h2>
          <p className="post-description" dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
        <div className="card-footer">
          <Link to="/" className="post-creator-info">
            <img src={user.picture} alt="" className="author-avatar" />
            <div className="author-info">
              <h4 className="card-content author-name">{user.displayName}</h4>
              <p className="card-content post-sub-info">{timeSince}</p>
            </div>
          </Link>
          <div className="post-status-info">
            <div className="post-interact ">
              <p>
                {likes} <i className="fal fa-heart"></i>
              </p>
              <p>
                {comments} <i className="fal fa-comment"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default Post;
