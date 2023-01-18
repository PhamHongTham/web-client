import React, { useContext, useEffect, useState } from 'react';

import Post from './partials/Post';
import PopupFollowings from './partials/PopupFollowings';
import PopupFollowers from './partials/PopupFollowers';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import SkeletonPost from '../home/partials/skeleton-component/SkeletonPost';
import { postOptions } from 'app/shared/models/post-interface';
import { RootState } from 'app/stores/app-reducer';
import {
  getUserInfoByIdRequest,
  showModalSignInRequest,
} from 'app/stores/user/actions';
import { followUserRequest } from 'app/stores/post/actions';
import {
  fetchUserPostRequest,
  deleteUserPostRequest,
  fetchUserBookmarkRequest,
} from 'app/stores/post/actions';
import { NotificationContext } from 'app/shared/components/notifications/NotificationProvider';
import { UserInfoOptions } from 'app/shared/models/User';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';

const Wall = () => {
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();
  const [posts, setPosts] = useState<any>([]);
  const [authorInfo, setAuthorInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [follow, setFollow] = useState<boolean>(false);
  const [countFollow, setCountFollow] = useState<number>(0);
  const [showBookmark, setShowBookmark] = useState<boolean>(false);
  const [showPopupFollowings, setShowPopupFollowings] =
    useState<boolean>(false);
  const [showPopupFollowers, setShowPopupFollowers] = useState<boolean>(false);
  const { userCurrent }: { userCurrent: UserInfoOptions } = useSelector(
    (state: RootState) => state.userState
  );
  const { handleAddNotification } = useContext(NotificationContext);
  const { handleShowLoading } = useContext(LoadingContext);
  useEffect(() => {
    setLoading(true);
    handleShowLoading(true);
    dispatch(fetchUserPostRequest(id)).then((res: any) => {
      setAuthorInfo(res.user);
      setCountFollow(res.user.followings);
      setPosts(res.posts);
      setLoading(false);
      handleShowLoading(false);
      setFollow(res.user.isfollowed);
    });
    if (id !== 'me') {
      dispatch(getUserInfoByIdRequest(id)).then((res: any) => {
        // console.log(res)
        // setFollow(res.user.isFollowed);
      });
    }
  }, [id]);

  useEffect(() => {
    setPosts([]);
    setLoading(true);
    if (showBookmark && id === 'me') {
      dispatch(fetchUserBookmarkRequest()).then((res: any) => {
        // let newList = res.posts.map((item: any) => item.post);
        // newList = newList.filter((item: any) => item !== null);
        // setPosts(newList);
        // setLoading(false);

        setPosts(res.posts);
        setLoading(false);
      });
    }
    if (!showBookmark && id === 'me') {
      dispatch(fetchUserPostRequest('me')).then((res: any) => {
        setAuthorInfo(res.user);
        setPosts(res.posts);
        setLoading(false);
      });
    }
  }, [showBookmark]);

  const handleDeletePost: any = (id: number) => {
    dispatch(deleteUserPostRequest(id));
    setPosts(posts.filter((post: any) => post.id !== id));
    handleAddNotification({ type: 'SUCCESS', message: 'Deleted post' });
  };

  const handleShowBookmark = (value: boolean) => {
    setShowBookmark(value);
  };

  const handleFollowUser = () => {
    if (userCurrent) {
      let data = {
        followingId: authorInfo._id,
      };
      setFollow(!follow);
      dispatch(followUserRequest(data));
    } else {
      dispatch(showModalSignInRequest(true));
    }
  };

  const handleShowPopupFollowers = (value: boolean) => {
    setShowPopupFollowers(value);
  };

  const handleShowPopupFollowings = (value: boolean) => {
    setShowPopupFollowings(value);
  };

  return (
    <section className="wall container">
      <div className="row">
        <div className="author-public-info col-8 col-lg-12 offset-2 offset-lg-0">
          <div className="author-info-content">
            <div className="author-avatar">
              <img
                src={
                  authorInfo?.picture
                    ? `${authorInfo?.picture}`
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU'
                }
                alt=""
                className="avatar-image"
              />
            </div>
            <div className="public-info-detail">
              <h2 className="author-name">
                {authorInfo?.displayName
                  ? authorInfo?.displayName
                  : authorInfo?.lastName}
              </h2>
              <ul className="activity-info-list">
                <li className="activity-info-item">
                  <p>
                    Stories: <b>{posts?.length}</b>
                  </p>
                </li>
                <li
                  className="activity-info-item follow"
                  onClick={() => handleShowPopupFollowers(true)}
                >
                  <p>
                    Followers: <b>{authorInfo?.followers}</b>
                  </p>
                </li>
                <li
                  className="activity-info-item follow"
                  onClick={() => handleShowPopupFollowings(true)}
                >
                  <p>
                    Followings: <b>{countFollow}</b>
                  </p>
                </li>
              </ul>
              {id === 'me' ? (
                <div className="user-action">
                  <p
                    className={
                      showBookmark ? `view-mode-item` : `view-mode-item active`
                    }
                    onClick={() => handleShowBookmark(false)}
                  >
                    Your posts
                  </p>
                  <p
                    className={
                      showBookmark ? `view-mode-item active` : `view-mode-item`
                    }
                    onClick={() => handleShowBookmark(true)}
                  >
                    Your bookmarks
                  </p>
                </div>
              ) : (
                <div className="user-action">
                  {follow ? (
                    <span
                      className="item-icon active"
                      onClick={handleFollowUser}
                    >
                      <i className="fas fa-user-check"></i>
                    </span>
                  ) : (
                    <span className="item-icon" onClick={handleFollowUser}>
                      <i className="far fa-user-plus"></i>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="wall-container col-8 col-lg-12 offset-2 offset-lg-0">
          <ul className="wall-list">
            {posts?.length > 0 && posts
              ? posts?.map((post: postOptions) => {
                  return (
                    <Post
                      post={post}
                      handleDeletePost={handleDeletePost}
                      isMyself={id === 'me'}
                      showBookmark={showBookmark}
                    />
                  );
                })
              : !loading && (
                  <p className="empty-post">Don't have any thing to show</p>
                )}
            {loading ? (
              <ul className="wall-list">
                {[1, 2, 3, 4, 5, 6].map((n: number) => (
                  <SkeletonPost key={n} />
                ))}
              </ul>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
      {showPopupFollowers ? (
        <PopupFollowers
          authorId={authorInfo._id}
          handleShowPopupFollow={handleShowPopupFollowers}
        />
      ) : (
        ''
      )}
      {showPopupFollowings ? (
        <PopupFollowings
          authorId={authorInfo._id}
          handleShowPopupFollow={handleShowPopupFollowings}
          setCountFollow={setCountFollow}
        />
      ) : (
        ''
      )}
    </section>
  );
};
export default Wall;
