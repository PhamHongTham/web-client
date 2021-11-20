import React, { useEffect, useState, useContext } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'app/stores/app-reducer';
import {
  commentPostRequest,
  fetchSpecificArticleRequest,
  followUserRequest,
  getCommentPostRequest,
  likePostRequest,
} from 'app/stores/article/actions';

import { calculateTimeSince } from 'app/shared/helper/helper-function';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';
import { NotificationContext } from 'app/shared/components/notifications/NotificationProvider';
import { getUserInfoByIdRequest } from 'app/stores/user/actions';

const Detail = () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { anotherUser }: any = useSelector(
    (state: RootState) => state.userState
  );

  const [userIdPost, setUserIdPost] = useState<string>('');
  const [timeSince, setTimeSince] = useState<string>('');
  const [follow, setFollow] = useState<boolean>(false);

  const [post, setPost] = useState<any>()zy

  useEffect(() => {
    dispatch(fetchSpecificArticleRequest(id)).then((res: any) => {
      setPost(res)
    })
    dispatch(getCommentPostRequest(id));
  }, [id]);

  useEffect(() => {
    if (isLoading) {
      handleShowLoading();
    }
  }, [isLoading]);

  useEffect(() => {
    if (anotherUser) {
      setFollow(anotherUser.isFollowed);
    }
  }, [anotherUser]);

  useEffect(() => {
    if (userIdPost) {
      console.log(userIdPost);
      dispatch(getUserInfoByIdRequest(String(userIdPost)));
    }
  }, [userIdPost]);

  // useEffect(() => {
  //   if (post) {
  //     setTimeSince(calculateTimeSince(post.createdAt) + ' ago');
  //     setUserIdPost(post.userId);
  //   }
  // }, [post]);

  const handleLikePost = () => {
    if (post.isLiked) {
      post.likes = +post.likes - 1;
      post.isLiked = false;
    } else {
      post.likes = +post.likes + 1;
      post.isLiked = true;
    }
    // setLike(true);
    // setCountLike((like: number) => +like + 1);
    setPost({ ...post });
    dispatch(likePostRequest(id));
  };

  // const handleDeleteLikePost = () => {
  //   dispatch(likePostRequest(id));
  // };

  const onSubmit = (data: CommentHanldeOptions) => {
    dispatch(commentPostRequest(id, data));
    reset();
  };

  const handleFollowUser = () => {
    let data = {
      followingId: userIdPost,
    };
    setFollow(!follow);
    dispatch(followUserRequest(data));
  };

  return (
    <>
      {post ? (
        <div className="detail-page">
          <div className="container">
            <div className="row">
              <aside className="author-interact col-2">
                <h3 className="author-name">
                  <Link to="">{post.user?.displayName}</Link>
                </h3>
                <div className="interact-action">
                  {follow ? (
                    <button
                      className="btn btn-primary"
                      onClick={handleFollowUser}
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={handleFollowUser}
                    >
                      Follow
                    </button>
                  )}
                  <button className="btn btn-primary">
                    <i className="fal fa-envelope"></i>
                  </button>
                </div>
                <div className="interact-detail">
                  <ul className="interact-detail-list">
                    <li className="interact-detail-item">
                      {post.likes}{' '}
                      <i className="far fa-thumbs-up"></i>
                    </li>
                    <li className="interact-detail-item">
                      {post.comments}{' '}
                      <i className="fal fa-comment-alt-lines"></i>
                    </li>
                    <li className="interact-detail-item">
                      <i className="fal fa-bookmark"></i>
                    </li>
                  </ul>
                </div>
              </aside>
              <article className="article-detail col-8">
                {/* {isLoading && <h2>Loading...</h2>} */}
                <div className="article-header">
                  <h2 className="article-title">{post.title}</h2>
                </div>
                <ul className="author-info-list">
                  <li className="author-info-item author-avatar">
                    <img
                      src={post.user?.picture}
                      alt={post.user?.displayName}
                    />
                  </li>
                  <li className="author-info-item author-name">
                    <Link to="" className="text-primary">
                      {post.user?.displayName}
                    </Link>
                  </li>
                  <li className="author-info-item article-create-at">
                    {timeSince}
                  </li>
                </ul>
                <div className="article-image">
                  <img src={post.cover} alt="article-cover" />
                </div>
                <div className="article-content">
                  <p
                    className="post-description"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></p>
                </div>
                <div className="article-footer">
                  <ul className="interact-detail-list">
                    <li className="interact-detail-item">
                      {post.likes}
                      {post.isLiked ? (
                        <i
                          className="fas fa-heart"
                          onClick={handleLikePost}
                        ></i>
                      ) : (
                        <i
                          className="far fa-thumbs-up"
                          onClick={handleLikePost}
                        ></i>
                      )}
                    </li>
                    <li className="interact-detail-item">
                      {post.comments}{' '}
                      <i className="fal fa-comment-alt-lines"></i>
                    </li>
                    <li className="interact-detail-item">
                      <i className="fal fa-bookmark"></i>
                    </li>
                  </ul>
                </div>
                <div className="interact-box">
                  Responses ({post.comments})
                </div>
                <form
                  className="form-comment"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    type="text"
                    className="comment-input"
                    {...register('content')}
                  ></input>
                  <button className="btn btn-primary">Comment</button>
                </form>
              </article>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default Detail;
