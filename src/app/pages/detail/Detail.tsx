import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState } from 'app/stores/app-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import UserComment from './partials/UserComment';
import {
  getUserInfoByIdRequest,
  showModalSignInRequest,
} from 'app/stores/user/actions';
import {
  commentPostRequest,
  fetchSpecificArticleRequest,
  followUserRequest,
  getCommentPostRequest,
  likePostRequest,
} from 'app/stores/post/actions';

const Detail = () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const schema = yup.object().shape({
    content: yup
      .string()
      .max(30, 'Password must not exceed 30 characters')
      .required('Password is require'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const [post, setPost] = useState<any>();
  const [comments, setComments] = useState<any>([]);
  const [follow, setFollow] = useState<boolean>(false);
  const { userCurrent }: any = useSelector(
    (state: RootState) => state.userState
  );

  useEffect(() => {
    dispatch(fetchSpecificArticleRequest(id)).then((res: any) => {
      setPost(res);
    });
    dispatch(getCommentPostRequest(id)).then((res: any) => setComments(res));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getUserInfoByIdRequest(String(post.userId))).then((res: any) => {
        setFollow(res.isFollowed);
      });
    }
  }, [post]);

  const handleLikePost = () => {
    if (userCurrent) {
      if (post.isLiked) {
        post.likes = +post.likes - 1;
        post.isLiked = false;
      } else {
        post.likes = +post.likes + 1;
        post.isLiked = true;
      }
      setPost({ ...post });
      dispatch(likePostRequest(id));
    } else {
      dispatch(showModalSignInRequest(true));
    }
  };

  const onSubmit = (data: CommentHandleOptions) => {
    if (userCurrent) {
      dispatch(commentPostRequest(id, data)).then((res: any) => {
        let newComment = {
          ...res,
          user: {
            displayName: userCurrent?.displayName,
          },
        };
        setComments((comments: any) => [...comments, newComment]);
      });
      reset();
    } else {
      dispatch(showModalSignInRequest(true));
    }
  };

  const handleFollowUser = () => {
    if (userCurrent) {
      let data = {
        followingId: post.userId,
      };
      setFollow(!follow);
      dispatch(followUserRequest(data));
    } else {
      dispatch(showModalSignInRequest(true));
    }
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
                <ul className="interact-action-list">
                  {post.isLiked ? (
                    <li
                      className="interact-action-item"
                      onClick={handleLikePost}
                    >
                      <span className="item-icon">
                        <i className="fas fa-heart"></i>
                      </span>
                      <p>UNLIKE</p>
                    </li>
                  ) : (
                    <li
                      className="interact-action-item"
                      onClick={handleLikePost}
                    >
                      <span className="item-icon">
                        <i className="fal fa-heart"></i>
                      </span>
                      <p>LIKE</p>
                    </li>
                  )}
                  {follow ? (
                    <li
                      className="interact-action-item"
                      onClick={handleFollowUser}
                    >
                      <span className="item-icon">
                        <i className="fal fa-user-minus"></i>
                      </span>
                      <p>UN FOLLOW ME</p>
                    </li>
                  ) : (
                    <li
                      className="interact-action-item"
                      onClick={handleFollowUser}
                    >
                      <span className="item-icon">
                        <i className="fal fa-user-plus"></i>
                      </span>
                      <p>FOLLOW ME</p>
                    </li>
                  )}

                  <li className="interact-action-item">
                    <span className="item-icon">
                      <i className="fal fa-bookmark"></i>
                    </span>
                    <p>BOOKMARK</p>
                  </li>
                </ul>
              </aside>
              <article className="post-detail col-8 offset-2 col-lg-12 offset-lg-0">
                <div className="article-header">
                  <h2 className="article-title">{post.title}</h2>
                </div>
                <ul className="author-info-list">
                  <li className="author-info-item author-avatar">
                    <img
                      src={
                        post.user.picture
                          ? `${post.user.picture}`
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU'
                      }
                      alt={post.user?.displayName}
                    />
                  </li>
                  <li className="author-info-item author-name">
                    <Link to="" className="text-primary">
                      <h3>{post.user?.displayName}</h3>
                    </Link>
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
                <div className="post-footer">
                  <ul className="interact-detail-list">
                    <li className="interact-detail-item">
                      {post.likes} <i className="fas fa-heart"></i>
                    </li>
                    <li className="interact-detail-item">
                      {comments.length}{' '}
                      <i className="fal fa-comment-alt-lines"></i>
                    </li>
                    <li className="interact-detail-item">
                      <i className="fal fa-bookmark"></i>
                    </li>
                  </ul>
                </div>
                <div className="interact-box">
                  Responses ({comments.length})
                </div>
                <form
                  className="form-comment"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    type="text"
                    className="comment-input"
                    {...register('content')}
                    required
                  ></input>
                  <button className="btn btn-primary" disabled={errors.isValid}>
                    Comment
                  </button>
                </form>
                {errors.content ? (
                  <p className="error">{errors.content.message}</p>
                ) : (
                  ''
                )}
              </article>
              <ul className="list-user-comment col-8 offset-2 col-lg-12 offset-lg-0">
                {comments?.map((props: any) => {
                  return <UserComment props={props} />;
                })}
              </ul>
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
