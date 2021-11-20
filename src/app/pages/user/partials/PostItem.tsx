import React from 'react';

import { Link } from 'react-router-dom';

import { postOptions } from 'app/shared/models/post-interface';

import { calculateTimeSince } from 'app/shared/helper/helper-function';

const PostItem = ({ post, handleDeletePost }: { post: postOptions; handleDeletePost: any }) => {
  const { id, title, cover, description, createdAt, tags } = post;
  const timeSince = calculateTimeSince(createdAt);

  return (
    <li key={id} className="wall-item">
      <div className="item-img">
        <img src={cover} alt="" className="item-image" />
      </div>
      <div className="item-detail">
        <Link to={`/detail/${id}`} className="item-title">
          <h2>{title}</h2>
        </Link>
        <div className="item-description">{description}</div>
        <ul className="sub-info-list">
          <li className="sub-info-item">{timeSince}</li>
          <li className="sub-info-item">
            {' '}
            Tags:
            {tags?.map((item, index) => {
              return (
                <button key={index} className="tags">
                  {item}
                </button>
              );
            })}
          </li>
        </ul>
      </div>
      <div className="sign-optional">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <ul className="list-option">
          <li className="option-item">
            <i className="fal fa-pencil-alt"></i> Edit
          </li>
          <li
            className="option-item"
            onClick={() => {
              handleDeletePost(id);
            }}
          >
            <i className="fal fa-trash-alt"></i> Delete
          </li>
          <li className="option-item">
            <i className="fal fa-bookmark"></i> Add to bookmark
          </li>
        </ul>
      </div>
    </li>
  );
};
export default PostItem;
