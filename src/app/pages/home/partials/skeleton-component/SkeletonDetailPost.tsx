import React from 'react';
import SkeletonElement from './SkeletonElement';

const SkeletonDetailPost = () => {
  return (
    <div className="detail-page">
      <div className="container">
        <div className="row">
          <div className="post-detail col-8 offset-2 col-lg-12 offset-lg-0">
            <div className="post-header">
              <div className="post-title d-flex justify-content-center">
                <SkeletonElement type="title" />
              </div>
            </div>
            <div className="author-info-list">
              <div className="author-info-item">
                <SkeletonElement type="avatar-lg" />
              </div>
              <SkeletonElement type="sub-title-short" />
            </div>
            <div className="post-image">
              <SkeletonElement type="image" />
            </div>
            <div className="post-content">
              <SkeletonElement type="text-long" />
              <SkeletonElement type="text-long" />
              <SkeletonElement type="text-long" />
              <SkeletonElement type="text-long" />
              <SkeletonElement type="text-long" />
              <SkeletonElement type="text-long" />
              <SkeletonElement type="text-medium" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonDetailPost;
