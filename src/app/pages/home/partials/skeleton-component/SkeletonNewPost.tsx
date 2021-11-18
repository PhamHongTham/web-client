import React from 'react';
import SkeletonElement from './SkeletonElement';

const SkeletonNewPost = () => {
  return (
    <li className="list-item col-4 col-lg-6 col-md-12">
      <div className="card">
        <div className="card-img">
          <SkeletonElement type="image" />
        </div>
        <div className="card-body post-content">
          <SkeletonElement type="title" />
          <SkeletonElement type="text-long" />
          <SkeletonElement type="text-long" />
          <SkeletonElement type="text-short" />
        </div>
        <div className="card-footer">
          <div className="post-creator-info">
            <SkeletonElement type="avatar" />
            <div className="author-info">
              <SkeletonElement type="text-long" />
              <SkeletonElement type="text-short" />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SkeletonNewPost;
