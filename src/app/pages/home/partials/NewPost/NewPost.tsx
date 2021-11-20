import React, { useEffect, useState, useRef, useCallback } from 'react';

import Post from './Post';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'app/stores/app-reducer';

import { postOptions } from 'app/shared/models/post-interface';
import SkeletonNewPost from 'app/pages/home/partials/skeleton-component/SkeletonNewPost';
import { fetchPostRequest, fetchRecommendPostRequest } from 'app/stores/post/actions';

const NewPost = () => {
  const { posts, isLoading, loadMore }: any = useSelector((state: RootState) => state.post);
  const { userCurrent }: any = useSelector((state: RootState) => state.userState);
  const [elementQuantity, setElementQuantity] = useState(6);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userCurrent) {
      dispatch(fetchRecommendPostRequest(elementQuantity));
    } else {
      dispatch(fetchPostRequest(elementQuantity));
    }
  }, [elementQuantity,userCurrent]);
  const observer: any = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && loadMore) {
            setElementQuantity(elementQuantity + 6);
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 1,
        }
      );
      if (node) observer.current.observe(node);
      return [];
    },
    [isLoading]
  );
  return (
    <section className="section-new-post">
      <div className="container">
        <ul className="row group-item">
          {posts?.map((post: postOptions) => (
            <Post post={post} />
          ))}
        </ul>
        {isLoading && (
          <ul className="row group-item">
            {[1, 2, 3, 4, 5, 6].map((n: number) => (
              <SkeletonNewPost key={n} />
            ))}
          </ul>
        )}
      </div>
      {loadMore && (
        <div className="load-more-wrap" ref={lastPostElementRef}>
          <div className="load-more">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      )}
    </section>
  );
};
export default NewPost;
