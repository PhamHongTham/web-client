import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Post from './partials/Post';

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
import { localStorageOption } from 'app/shared/helper/LocalAction';

const Wall = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<any>([]);
  const [authorInfo, setAuthorInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [follow, setFollow] = useState<boolean>(false);
  const [showBookmark, setShowBookmark] = useState<boolean>(false);
  const { userCurrent }: any = useSelector(
    (state: RootState) => state.userState
  );
  const { handleAddNotification } = useContext(NotificationContext);
  const { id }: any = useParams();
  const idUserCurrent = localStorageOption.getUserId;

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUserPostRequest(idUserCurrent === id ? 'me' : id)).then(
      (res: any) => {
        setAuthorInfo(res);
        setPosts(res.Posts);
        setLoading(false);
      }
    );
    if (idUserCurrent !== id) {
      dispatch(getUserInfoByIdRequest(id)).then((res: any) => {
        setFollow(res.isFollowed);
      });
    }
    return () => {
      setAuthorInfo(null);
      setPosts(null);
    };
<<<<<<< HEAD
  }, [id,showBookmark]);
=======
  }, [idUserCurrent, id]);
>>>>>>> sprint-3

  useEffect(() => {
    if (showBookmark && idUserCurrent === id) {
      setLoading(true);
      dispatch(fetchUserBookmarkRequest()).then((res: any) => {
        let newList = res.map((item: any) => item.post);
        newList = newList.filter((item: any) => item !== null);
        setPosts(newList);
        setLoading(false);
      });
    }
    if (!showBookmark && idUserCurrent === id) {
      dispatch(fetchUserPostRequest('me')).then((res: any) => {
        setAuthorInfo(res);
        setPosts(res.Posts);
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
        followingId: authorInfo.id,
      };
      setFollow(!follow);
      dispatch(followUserRequest(data));
    } else {
      dispatch(showModalSignInRequest(true));
    }
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
              {idUserCurrent === id ? (
                <div className="user-action">
                  <p
                    className={
                      showBookmark ? `view-mode-item` : `view-mode-item active`
                    }
                    onClick={() => handleShowBookmark(false)}
                  >
                    Show your posts
                  </p>
                  <p
                    className={
                      showBookmark ? `view-mode-item active` : `view-mode-item`
                    }
                    onClick={() => handleShowBookmark(true)}
                  >
                    Show your bookmarks
                  </p>
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

        <div className="wall-container col-8 col-lg-12 offset-2 offset-lg-0">
          <ul className="wall-list">
            {posts?.length > 0 && posts
              ? posts?.map((post: postOptions) => {
                  return (
                    <Post
                      post={post}
                      handleDeletePost={handleDeletePost}
                      isMyself={idUserCurrent === id}
                      showBookmark={showBookmark}
                    />
                  );
                })
              : !loading && (
                  <p className="empty-post">You don't have any posts yet</p>
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
    </section>
  );
};;
export default Wall;
