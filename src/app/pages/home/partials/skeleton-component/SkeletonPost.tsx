import React from 'react';
import SkeletonElement from './SkeletonElement';

const SkeletonPost = () => {
  return (
    <li className="newsfeed-item">
      <div className="newsfeed-item-content">
        <div className="creator-info">
          <SkeletonElement type="avatar" />
          <div className="author-info">
            <SkeletonElement type="sub-title" />
          </div>
        </div>
        <SkeletonElement type="sub-title" />
        <SkeletonElement type="text-long" />
        <SkeletonElement type="text-medium" />
        <SkeletonElement type="text-extra-short" />
        <div className="sub-info-list">
          
        </div>
      </div>
      <div className="newsfeed-img">
        <SkeletonElement type="image" />
      </div>
    </li>
  );
};

export default SkeletonPost;
