import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPostRequest, deleteUserPostRequest } from 'app/stores/post/actions';
import { RootState } from 'app/stores/app-reducer';
import PostItem from './partials/PostItem';
import { postOptions } from 'app/shared/models/post-interface';
import SkeletonPost from '../home/partials/skeleton-component/SkeletonPost';
import { localStorageOption } from 'app/shared/helper/LocalAction';
import { Link } from 'react-router-dom';

const Wall = () => {
  const { posts, isLoading }: any = useSelector((state: RootState) => state.post);
  console.log(posts);
  const currentUserId = localStorageOption.getUserId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserPostRequest(currentUserId));
  }, []);

  const handleDeletePost: any = (id: number) => {
    dispatch(deleteUserPostRequest(id));
    alert('deleted');
  };

  return (
    <div className="wall container">
      <div className="row">
        <aside className="author-interact">
          <h3 className="author-name">
            <Link to="">{}</Link>
          </h3>
          <ul className="interact-action-list">
            <li className="interact-action-item">
              <span className="item-icon">
                <i className="fal fa-heart"></i>
              </span>
            </li>
            <li className="interact-action-item">
              <span className="item-icon">
                <i className="fal fa-user-plus"></i>
              </span>
            </li>
            <li className="interact-action-item">
              <span className="item-icon">
                <i className="fal fa-bookmark"></i>
              </span>
            </li>
          </ul>
        </aside>
        <div className="wall-container col-8 col-lg-12 offset-2 offset-lg-0">
          <ul className="wall-list">
            {posts?.map((post: postOptions) => {
              return <PostItem post={post} handleDeletePost={handleDeletePost} />;
            })}
            {isLoading && (
              <ul className="wall-list">
                {[1, 2, 3, 4, 5, 6].map((n: number) => (
                  <SkeletonPost key={n} />
                ))}
              </ul>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Wall;
