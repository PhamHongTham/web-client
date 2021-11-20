import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  commentPostRequest,
  fetchSpecificArticleRequest,
  followUserRequest,
  getCommentPostRequest,
  likePostRequest,
} from 'app/stores/article/actions';
import { getUserInfoByIdRequest } from 'app/stores/user/actions';
import UserComment from './partials/UserComment';
import { formatNumber } from 'app/shared/helper/helper-function';

const Detail = () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const { register, handleSubmit, reset } = useForm();

  const [post, setPost] = useState<any>();
  const [comments, setComments] = useState<any>([]);
  const [follow, setFollow] = useState<boolean>(false);
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
    if (post.isLiked) {
      post.likes = +post.likes - 1;
      post.isLiked = false;
    } else {
      post.likes = +post.likes + 1;
      post.isLiked = true;
    }
    setPost({ ...post });
    dispatch(likePostRequest(id));
  };

  const onSubmit = (data: CommentHandleOptions) => {
    dispatch(commentPostRequest(id, data)).then((res: any) =>
      setComments((comments: any) => [...comments, res])
    );
    reset();
  };

  const handleFollowUser = () => {
    let data = {
      followingId: post.userId,
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
              <aside className="author-interact">
                <ul className="interact-action-list">
                  {post.isLiked ? (
                    <li className="interact-action-item" onClick={handleLikePost}>
                      <span className="item-icon">
                        <i className="fas fa-heart"></i>
                      </span>
                    </li>
                  ) : (
                    <li className="interact-action-item" onClick={handleLikePost}>
                      <span className="item-icon">
                        <i className="fal fa-heart"></i>
                      </span>
                    </li>
                  )}
                  {follow ? (
                    <li className="interact-action-item" onClick={handleFollowUser}>
                      <span className="item-icon">
                        <i className="fas fa-user"></i>
                      </span>
                    </li>
                  ) : (
                    <li className="interact-action-item" onClick={handleFollowUser}>
                      <span className="item-icon">
                        <i className="fal fa-user"></i>
                      </span>
                    </li>
                  )}
                  <li className="interact-action-item">
                    <span className="item-icon">
                      <i className="fal fa-bookmark"></i>
                    </span>
                  </li>
                </ul>
              </aside>
              <article className="post-detail col-8 offset-2 col-lg-12 offset-lg-0">
                <div className="post-header">
                  <h2 className="post-title">{post.title}</h2>
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
                <div className="post-image">
                  <img src={post.cover} alt="post-cover" />
                </div>
                <div className="post-content">
                  <p
                    className="post-description"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></p>
                </div>
                <div className="post-footer">
                  <ul className="interact-detail-list">
                    <li className="interact-detail-item">
                      {formatNumber(post.likes)}{' '}
                      {post.isLiked ? (
                        <i className="fas fa-heart" onClick={handleLikePost}></i>
                      ) : (
                        <i className="fal fa-heart" onClick={handleLikePost}></i>
                      )}
                    </li>
                    <li className="interact-detail-item">
                      {formatNumber(comments.length)} <i className="fal fa-comment-alt-lines"></i>
                    </li>
                    <li className="interact-detail-item">
                      <i className="fal fa-bookmark"></i>
                    </li>
                    <li className="interact-detail-item">
                      {follow ? (
                        <i className="fa fa-user" onClick={handleFollowUser}></i>
                      ) : (
                        <i className="fal fa-user" onClick={handleFollowUser}></i>
                      )}
                    </li>
                  </ul>
                </div>
                <div className="interact-box">Responses ({formatNumber(comments.length)})</div>
                <form className="form-comment" onSubmit={handleSubmit(onSubmit)}>
                  <input type="text" className="comment-input" {...register('content')}></input>
                  <button className="btn btn-primary">Comment</button>
                </form>
              </article>
              <ul className="list-user-comment col-8 offset-2 col-lg-12 offset-lg-0">
                {comments?.slice(0).reverse().map((props: any) => {
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
