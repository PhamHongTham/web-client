import React from 'react';

const UserComment = ({ props }: { props: any }) => {
  const { id, comment, user } = props;
  console.log(props);
  // console.log("id",props.id)
  return (
    <li key={id} className="user-comment-item">
      <div className="user-picture">
        <img
          src={
            user && user.picture
              ? `${user.picture}`
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU'
          }
          alt=""
        />
      </div>
      <div className="comment-detail">
        <h4>{user && user.displayName ? user.displayName : ''}</h4>
        <p className="user-content">
          {comment}
        </p>
      </div>
    </li>
  );
};
export default UserComment;
