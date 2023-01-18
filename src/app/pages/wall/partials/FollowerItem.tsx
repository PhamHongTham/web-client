import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { followUserRequest } from 'app/stores/post/actions';
import { RootState } from 'app/stores/app-reducer';

const FollowerItem = (props: any) => {
  const dispatch = useDispatch();
  const { person, action, handleShowPopupFollow } = props;
  const [follow, setFollow] = useState<boolean>(true);
  const { userCurrent }: any = useSelector(
    (state: RootState) => state.userState
  );
  const { id }: { id: string } = useParams();

  const handleUnfollow = () => {
    let data = {
      followingId: person._id,
    };
    setFollow(!follow);
    dispatch(followUserRequest(data)).then((res: any) => {
      props.setCountFollow(
        res.isFollowed
          ? (preState: number) => preState + 1
          : (preState: number) => preState - 1
      );
    });
  };
  return (
    <div key={person._id} className="follow-item">
      <Link
        to={
          userCurrent?.email === person?.email
            ? '/wall/me'
            : `/wall/${person._id}`
        }
        className="follow-item-content"
        onClick={() => handleShowPopupFollow(false)}
      >
        <img
          src={
            person?.picture
              ? `${person?.picture}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU'
          }
          alt=""
          className="user-avatar"
        ></img>
        <span className="user-name">
          {person?.displayName ? person?.displayName : person?.lastName}
        </span>
      </Link>
      {action &&
        id === 'me' &&
        (follow ? (
          <button className="btn btn-primary" onClick={() => handleUnfollow()}>
            <i className="fas fa-user-check"></i>
          </button>
        ) : (
          <button className="btn btn-outline" onClick={() => handleUnfollow()}>
            <i className="far fa-user-plus"></i>
          </button>
        ))}
    </div>
  );
};
export default FollowerItem;
