import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Post from './partials/Post';
import SkeletonPost from '../home/partials/skeleton-component/SkeletonPost';
import { fetchUserPostRequest, deleteUserPostRequest } from 'app/stores/post/actions';
import { postOptions } from 'app/shared/models/post-interface';
import { localStorageOption } from 'app/shared/helper/LocalAction';
const Wall = () => {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const currentUserId = localStorageOption.getUserId;

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(fetchUserPostRequest(currentUserId)).then((res: any) => {
      setPosts(res.Posts);
      setLoading(false);
    });
  }, []);
  const handleDeletePost: any = (id: number) => {
    dispatch(deleteUserPostRequest(id));
    setPosts(posts.filter((post: any) => post.id !== id));
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
              return <Post post={post} handleDeletePost={handleDeletePost} />;
            })}
            {loading && (
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