import React from 'react';

import { Link } from 'react-router-dom';

import { postOptions } from 'app/shared/models/post-interface';

import { calculateTimeSince } from 'app/shared/helper/helper-function';

const PostItem = ({ post, handleDeletePost }: { post: postOptions; handleDeletePost: any }) => {
  const { id, title, cover, description, createdAt, tags } = post;
  const timeSince = calculateTimeSince(createdAt);

  return (
    <li key={id} className="post-item">
      <div className="item-img">
        <img src={cover} alt="" className="item-image" />
      </div>
      <div className="item-detail">
        <div className="item-content">
          <Link to={`/detail/${id}`} className="item-title">
            <h2>{title}</h2>
          </Link>
          <div className="item-description">{description}</div>
        </div>
        <ul className="sub-info-list">
          <li className="sub-info-item">
            Tags:
            {tags?.map((item, index) => {
              return (
                <button key={index} className="tags">
                  {item}
                </button>
              );
            })}
          </li>
          <li className="sub-info-item">{timeSince}</li>
        </ul>
      </div>
      <div className="sign-optional">
        <i className="far fa-ellipsis-h dot"></i>
        <ul className="list-option">
          <li className="option-item">
            <i className="fal fa-pencil-alt option-item-icon"></i> Edit
          </li>
          <li
            className="option-item"
            onClick={() => {
              handleDeletePost(id);
            }}
          >
            <i className="fal fa-trash-alt option-item-icon"></i> Delete
          </li>
          <li className="option-item">
            <i className="fal fa-bookmark option-item-icon"></i> Add to bookmark
          </li>
        </ul>
      </div>
    </li>
  );
};
export default PostItem;
