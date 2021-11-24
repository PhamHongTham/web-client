import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Post from './partials/Post';

import SkeletonPost from '../home/partials/skeleton-component/SkeletonPost';
import { postOptions } from 'app/shared/models/post-interface';
import { localStorageOption } from 'app/shared/helper/LocalAction';
import { RootState } from 'app/stores/app-reducer';
import { getUserInfoByIdRequest, showModalSignInRequest } from 'app/stores/user/actions';
import { followUserRequest } from 'app/stores/post/actions';
import {
  fetchUserPostRequest,
  deleteUserPostRequest,
  fetchUserBookmarkRequest,
} from 'app/stores/post/actions';

const Wall = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<any>([]);
  const [authorInfo, setAuthorInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [follow, setFollow] = useState<boolean>(false);
  const [isMyself, setIsMyself] = useState<boolean>(false);
  const [showBookmark, setShowBookmark] = useState<boolean>(false);
  const currentUserId = localStorageOption.getUserId;
  const userCurrent = useSelector((state: RootState) => state.userState);
  const { id }: any = useParams();
  const handleFollowUser = () => {
    if (userCurrent) {
      let data = {
        followingId: authorInfo.id,
      };
      setFollow(!follow);
      dispatch(followUserRequest(data));
    } else {
      dispatch(showModalSignInRequest(true));
    }
  };

  useEffect(() => {
    let authorId: any = null;
    setLoading(true);
    if (currentUserId === id) {
      authorId = 'me';
      setIsMyself(true);
    } else {
      authorId = id;
      setIsMyself(false);
    }
    dispatch(fetchUserPostRequest(authorId)).then((res: any) => {
      setAuthorInfo(res);
      setPosts(res.Posts);
      setLoading(false);
    });
    dispatch(getUserInfoByIdRequest(authorId)).then((res: any) => {
      setFollow(res.isFollowed);
    });
  }, [id]);

  useEffect(() => {
    if (showBookmark) {
      setLoading(true);
      dispatch(fetchUserBookmarkRequest()).then((res: any) => {
        let newList = res.map((item: any) => item.post);
        setPosts(newList);
        setLoading(false);
      });
    } else {
      setLoading(true);
      dispatch(fetchUserPostRequest(currentUserId)).then((res: any) => {
        setAuthorInfo(res);
        setPosts(res.Posts);
        setLoading(false);
      });
    }
  }, [showBookmark]);

  const handleDeletePost: any = (id: number) => {
    dispatch(deleteUserPostRequest(id));
    setPosts(posts.filter((post: any) => post.id !== id));
    alert('deleted');
  };

  const handleShowBookmark: () => void = () => {
    setShowBookmark(!showBookmark);
  };

  return (
    <div className="wall container">
      <div className="row">
        <div className="author-public-info col-8 col-lg-12 offset-2 offset-lg-0">
          <div className="author-info-content">
            <div className="author-avatar">
              <img src={authorInfo?.picture} alt="" className="avatar-image" />
            </div>
            <div className="public-info-detail">
              <h2 className="author-name">{authorInfo?.displayName}</h2>
              <ul className="activity-info-list">
                <li className="activity-info-item">
                  <p>
                    Stories: <b>{authorInfo?.Posts?.length}</b>
                  </p>
                </li>
                <li className="activity-info-item">
                  <p>
                    Followers: <b>{authorInfo?.followers}</b>
                  </p>
                </li>
                <li className="activity-info-item">
                  <p>
                    Followings: <b>{authorInfo?.followings}</b>
                  </p>
                </li>
              </ul>
              {isMyself ? (
                <div className="user-action">
                  <div onClick={handleShowBookmark}>
                    {showBookmark ? (
                      <p className="view-mode-item">Show your posts</p>
                    ) : (
                      <p className="view-mode-item">Show your bookmarks</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="user-action">
                  <span className="item-icon" onClick={handleFollowUser}>
                    {follow ? (
                      <i className="fal fa-user-minus"></i>
                    ) : (
                      <i className="fal fa-user-plus"></i>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div className=""></div> */}

        <div className="wall-container col-8 col-lg-12 offset-2 offset-lg-0">
          <ul className="wall-list">
            {posts?.map((post: postOptions) => {
              return (
                <Post
                  post={post}
                  handleDeletePost={handleDeletePost}
                  isMyself={isMyself}
                  showBookmark={showBookmark}
                />
              );
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
