import React, { useEffect } from 'react';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificPostRequest } from 'app/stores/post/actions';
import { RootState } from 'app/stores/app-reducer';

import { calculateTimeSince } from 'app/shared/helper/helper-function';

const Detail = () => {
  const { currentPost, isLoading }: any = useSelector((state: RootState) => state.post);
  const { id }: any = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSpecificPostRequest(id));
  }, [dispatch, id]);
  const timeSince = calculateTimeSince(currentPost.createdAt) + ' ago';
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="detail-page">
          <div className="container">
            <div className="row">
              <aside className="author-interact col-2">
                <h3 className="author-name">
                  <Link to="">{currentPost.user?.displayName}</Link>
                </h3>
                <div className="interact-action">
                  <button className="btn btn-primary">Follow</button>
                  <button className="btn btn-primary">
                    <i className="fal fa-envelope"></i>
                  </button>
                </div>
                <div className="interact-detail">
                  <ul className="interact-detail-list">
                    <li className="interact-detail-item">
                      {currentPost.likes} <i className="far fa-thumbs-up"></i>
                    </li>
                    <li className="interact-detail-item">
                      {currentPost.comments} <i className="fal fa-comment-alt-lines"></i>
                    </li>
                    <li className="interact-detail-item">
                      <i className="fal fa-bookmark"></i>
                    </li>
                  </ul>
                </div>
              </aside>
              <article className="article-detail col-8">
                {isLoading && <h2>Loading...</h2>}
                <div className="article-header">
                  <h2 className="article-title">{currentPost.title}</h2>
                </div>
                <ul className="author-info-list">
                  <li className="author-info-item author-avatar">
                    <img
                      src={currentPost.user?.picture}
                      alt={currentPost.user?.displayName}
                    />
                  </li>
                  <li className="author-info-item author-name">
                    <Link to="" className="text-primary">
                      {currentPost.user?.displayName}
                    </Link>
                  </li>
                  <li className="author-info-item article-create-at">{timeSince}</li>
                </ul>
                <div className="article-image">
                  <img src={currentPost.cover} alt="article-cover" />
                </div>
                <div className="article-content">
                  <p
                    className="post-description"
                    dangerouslySetInnerHTML={{ __html: currentPost.content }}
                  ></p>
                </div>
                <div className="article-footer">
                  <ul className="interact-detail-list">
                    <li className="interact-detail-item">
                      {currentPost.likes} <i className="far fa-thumbs-up"></i>
                    </li>
                    <li className="interact-detail-item">
                      {currentPost.comments} <i className="fal fa-comment-alt-lines"></i>
                    </li>
                    <li className="interact-detail-item">
                      <i className="fal fa-bookmark"></i>
                    </li>
                  </ul>
                </div>
                <div className="interact-box">Responses ({currentPost.comments})</div>
              </article>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Detail;
