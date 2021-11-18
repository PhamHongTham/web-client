import React, { useEffect } from 'react';

import Post from './Post';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'app/stores/app-reducer';

import { postOptions } from 'app/shared/models/post-interface';
import SkeletonNewPost from 'app/pages/home/partials/skeleton-component/SkeletonNewPost';
import { fetchPostRequest } from 'app/stores/post/actions';
const NewPost = () => {
  const { posts, isLoading }: any = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostRequest());
  }, []);
  return (
    <section className="section-recommend-post">
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
    </section>
  );
};
export default NewPost;
