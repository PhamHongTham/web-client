import React, { useEffect, useState } from 'react';

import Post from './Post';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'app/stores/app-reducer';

import { postOptions } from 'app/shared/models/post-interface';
import SkeletonNewPost from 'app/pages/home/partials/skeleton-component/SkeletonNewPost';
import { fetchPostRequest } from 'app/stores/post/actions';

const NewPost = () => {
  const { posts, isLoading }: any = useSelector((state: RootState) => state.post);
  const [elementQuantity, setElementQuantity] = useState(6);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostRequest(elementQuantity));
  }, [elementQuantity]);
  const loadMore = () => {
    setElementQuantity(elementQuantity + 6);
  };
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
      <div className="section-footer">
        <button className="load-more-btn btn btn-primary" onClick={loadMore}>
          Load more stories
        </button>
      </div>
    </section>
  );
};
export default NewPost;
