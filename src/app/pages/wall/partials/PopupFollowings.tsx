import React, { useContext, useEffect, useState } from 'react';

import FollowerItem from './FollowerItem';
import { useDispatch } from 'react-redux';

import { getFollowingsRequest } from 'app/stores/post/actions';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';

interface PopupFollowOptions {
  handleShowPopupFollow: (value: boolean) => void;
  authorId: number;
}

const PopupFollowings = ({ handleShowPopupFollow, authorId }: PopupFollowOptions) => {
  const dispatch = useDispatch();
  const [listPeople, setListPeople] = useState<object[]>([]);
  const { handleShowLoading, showLoading } = useContext(LoadingContext);
  useEffect(() => {
    handleShowLoading(true);
    dispatch(getFollowingsRequest(authorId)).then((res: any) => {
      setListPeople(res);
      handleShowLoading(false);
    });
  }, []);
  return (
    <div className="popup-follow">
      <div className="popup-content">
        <h3 className="popup-follow-title">Followings</h3>
        <div className="list-follow">
          {listPeople?.length
            ? listPeople.map((person) => (
                <FollowerItem
                  person={person}
                  action={true}
                  handleShowPopupFollow={handleShowPopupFollow}
                />
              ))
            : !showLoading && <p className="empty-list-mess">No one to show!</p>}
        </div>
        <button className="close-popup" onClick={() => handleShowPopupFollow(false)}>
          <i className="fal fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default PopupFollowings;
