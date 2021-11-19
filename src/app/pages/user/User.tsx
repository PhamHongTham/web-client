import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPostRequest, deleteUserPostRequest } from 'app/stores/post/actions';
import { RootState } from 'app/stores/app-reducer';
import NewFeedItem from '../newsfeed/partials/NewsfeedItem';
import { postOptions } from 'app/shared/models/post-interface';
import SkeletonPost from '../home/partials/skeleton-component/SkeletonPost';
import { localStorageOption } from 'app/shared/helper/LocalAction';

const UserPost = () => {
  const { posts, isLoading, loadMore }: any = useSelector((state: RootState) => state.post);
  // const [listPost, setListPost] = useState([]);
  console.log(posts)
  const currentUserId = localStorageOption.getUserId;
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserPostRequest(currentUserId));
  }, []);

  // useEffect(() => {
  //   setListPost(() => posts);
  // }, [posts]);

  const handleDeletePost = (id: number) => {
    dispatch(deleteUserPostRequest(id));
    alert("deleted");
  };

  const observer: any = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && loadMore) {
            setPageNumber(() => pageNumber + 1);
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
    <div className="newsfeed container">
      <div className="row">
        <div className="newsfeed-container col-8 col-lg-12 offset-2 offset-lg-0">
          <h3>Your Stories</h3>
          <ul className="newsfeed-list">
            {posts?.map((post: postOptions) => {
              return (
                <>
                  <div className="sign-optional">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <ul className="list-option">
                      <li className="option-item">Edit</li>
                      <li className="option-item" onClick={() => handleDeletePost(post.id)}>
                        Delete
                      </li>
                    </ul>
                  </div>
                  <NewFeedItem post={post} />
                </>
              );
            })}
            {isLoading && (
              <ul className="newsfeed-list">
                {[1, 2, 3, 4, 5, 6].map((n: number) => (
                  <SkeletonPost key={n} />
                ))}
              </ul>
            )}
          </ul>
        </div>
      </div>
      {loadMore && (
        <div className="load-wrap" ref={lastPostElementRef}>
          <div className="load-more">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserPost;
