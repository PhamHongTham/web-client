import React, { useEffect, useContext, useState } from 'react';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/stores/app-reducer';
import { fetchSpecificPostRequest } from 'app/stores/post/actions';

import { calculateTimeSince } from 'app/shared/helper/helper-function';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';

const Detail = () => {
  const { currentPost, isLoading }: any = useSelector((state: RootState) => state.post);
  const [timeSince, setTimeSince] = useState<string>('');
  const { id }: any = useParams();
  const dispatch = useDispatch();

  const { handleShowLoading } = useContext(LoadingContext);
  useEffect(() => {
    dispatch(fetchSpecificPostRequest(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (isLoading) {
      handleShowLoading();
    }
  }, [isLoading]);
  useEffect(() => {
    if (currentPost) {
      setTimeSince(calculateTimeSince(currentPost.createdAt) + ' ago');
    }
  }, [currentPost]);
  return (
    <>
      {currentPost ? (
        <div className="detail-page">
          <div className="container">
            <div className="row">
              <aside className="author-interact col-2">
                <h3 className="author-name">
                  <Link to="">{currentPost.user?.displayName}</Link>
                </h3>
                <ul className="interact-action-list">
                  <li className="interact-action-item">
                    <span className="item-icon">
                      <i className="fal fa-heart"></i>
                    </span>
                    <p>LIKE</p>
                  </li>
                  <li className="interact-action-item">
                    <span className="item-icon">
                      <i className="fal fa-user-plus"></i>
                    </span>
                    <p>FOLLOW ME</p>
                  </li>
                  <li className="interact-action-item">
                    <span className="item-icon">
                      <i className="fal fa-bookmark"></i>
                    </span>
                    <p>BOOKMARK</p>
                  </li>
                </ul>
              </aside>
              <article className="post-detail col-8 offset-2 col-lg-12 offset-lg-0">
                <div className="post-header">
                  <h2 className="post-title">{currentPost.title}</h2>
                </div>
                <ul className="author-info-list">
                  <li className="author-info-item author-avatar">
                    <img
                      src={
                        currentPost.user?.picture
                          ? `${currentPost.user.picture}`
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU'
                      }
                      alt={currentPost.user?.displayName}
                    />
                  </li>
                  <li className="author-info-item author-name">
                    <Link to="" className="text-primary">
                      {currentPost.user?.displayName}
                    </Link>
                  </li>
                  <li className="author-info-item post-create-at">{timeSince}</li>
                </ul>
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: currentPost.content }}
                ></div>
                <div className="post-footer">
                  <ul className="interact-detail-list">
                    <li className="interact-detail-item">
                      {currentPost.likes} <i className="far fa-thumbs-up"></i>
                    </li>
                    <li className="interact-detail-item">
                      {currentPost.comments} <i className="fal fa-comment-alt-lines"></i>
                    </li>
                  </ul>
                </div>
                <div className="interact-box">Responses ({currentPost.comments})</div>
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
