import React, { useEffect, useState, useRef, useCallback } from 'react';

import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'app/stores/app-reducer';
import { postOptions } from 'app/shared/models/post-interface';
import { fetchPostRequest, fetchRecommendPostRequest } from 'app/stores/post/actions';
import SkeletonNewPost from 'app/pages/home/partials/skeleton-component/SkeletonNewPost';

const NewPost = () => {
  const { userCurrent }: any = useSelector((state: RootState) => state.userState);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [elementQuantity, setElementQuantity] = useState(6);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userCurrent) {
      setLoading(true);
      dispatch(fetchRecommendPostRequest(elementQuantity)).then((res: any) => {
        setPosts(res);
        setLoading(false);
      });
    } else {
      setLoading(true);
      dispatch(fetchPostRequest(elementQuantity)).then((res: any) => {
        setPosts(res);
        setLoading(false);
      });
    }
  }, [elementQuantity, userCurrent]);
  const observer: any = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && posts?.loadMore) {
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
    [loading]
  );
  return (
    <section className="section-new-post">
      <div className="container">
        <ul className="row group-item">
          {posts.data?.map((post: postOptions) => (
            <Post post={post} />
          ))}
        </ul>
        {loading && (
          <ul className="row group-item">
            {[1, 2, 3, 4, 5, 6].map((n: number) => (
              <SkeletonNewPost key={n} />
            ))}
          </ul>
        )}
      </div>
      {posts.loadMore && (
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
