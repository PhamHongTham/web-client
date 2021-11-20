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

const Detail = () => {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const { register, handleSubmit, reset } = useForm();

  const [post, setPost] = useState<any>()
  const [comments, setComments] = useState<any>([])
  const [follow, setFollow] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchSpecificArticleRequest(id)).then((res: any) => {
      setPost(res)
    })
    dispatch(getCommentPostRequest(id)).then((res: any) => setComments(res));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getUserInfoByIdRequest(String(post.userId))).then((res: any) => {
        setFollow(res.isFollowed)
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

  const onSubmit = (data: CommentHanldeOptions) => {
    dispatch(commentPostRequest(id, data)).then((res: any) => setComments((comments: any) => [...comments, res]));
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
