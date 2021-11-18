import React from 'react';

import { Link } from 'react-router-dom';

import { postOptions } from 'app/shared/models/post-interface';

import { calculateTimeSince } from 'app/shared/helper/helper-function';

const NewFeedItem = ({ post }: { post: postOptions }) => {
  const { id, title, user, cover, description, createdAt, tags } = post;
  const timeSince = calculateTimeSince(createdAt) + ' ago';

  return (
    <li key={id} className="newsfeed-item">
      <div className="newsfeed-item-content">
        <Link to="/" className="creator-info">
          <img src={user.picture} alt="" className="author-avatar" />
          <div className="author-info">
            <h4 className="author-name">{user.displayName}</h4>
          </div>
        </Link>
        <Link  to={`/detail/${id}`} className="newsfeed-item-title">
          <h2>{title}</h2>
        </Link>
        <p className="newsfeed-item-description">{description}</p>
        <ul className="sub-info-list">
          <li className="sub-info-item">{timeSince}</li>
          <li className="sub-info-item">{tags}</li>
        </ul>
      </div>
      <div className="newsfeed-img">
        <img src={cover} alt="" className="newsfeed-image" />
      </div>
    </li>
  );
};
export default NewFeedItem;
