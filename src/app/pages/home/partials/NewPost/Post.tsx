import React from 'react';

import { Link } from 'react-router-dom';

import { postOptions } from 'app/shared/models/post-interface';

import { calculateTimeSince } from 'app/shared/helper/helper-function';

const Post = ({ post }: { post: postOptions }) => {
  const { id, title, comments, likes, user, cover, description, createdAt } = post;
  const timeSince = calculateTimeSince(createdAt) + ' ago';

  return (
    <li key={id} className="list-item col-4 col-lg-6 col-md-12">
      <div className="card">
        <div className="card-img">
          <img src={cover} alt="" className="post-image" />
        </div>
        <div className="card-body post-content">
          <Link to={`/detail/${id}`}>
            <h2 className="card-title">{title}</h2>
          </Link>
          <p className="post-description" dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
        <div className="card-footer">
          <Link to="/" className="post-creator-info">
            <img
              src={
                user && user.picture
                  ? `${user.picture}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU'
              }
              alt={user?.displayName}
              className="author-avatar"
            />
            <div className="author-info">
              <h4 className="card-content author-name">{user?.displayName}</h4>
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
