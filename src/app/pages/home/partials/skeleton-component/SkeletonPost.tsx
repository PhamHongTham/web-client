import React from 'react';
import SkeletonElement from './SkeletonElement';

const SkeletonPost = () => {
  return (
    <li className="wall-item">
      <div className="item-img">
        <SkeletonElement type="image" />
      </div>
      <div className="item-detail">
        <div className="item-title">
          <SkeletonElement type="sub-title" />
        </div>
        <div className="item-description">
          <SkeletonElement type="text-long" />
          <SkeletonElement type="text-long" />
          <SkeletonElement type="text-medium" />
        </div>
        <ul className="sub-info-list">
          <SkeletonElement type="text-medium" />
          <SkeletonElement type="text-extra-short" />
        </ul>
      </div>
    </li>
  );
};

export default SkeletonPost;
