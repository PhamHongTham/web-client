import React from 'react';
import { Link } from 'react-router-dom';

interface PopupFollowOptions {
  handleShowPopupFollow: (value: boolean) => void;
}

const PopupFollow = ({ handleShowPopupFollow }: PopupFollowOptions) => {
  return (
    <div className="popup-follow">
      <div className="popup-content">
        <h3 className="popup-follow-title">Followers</h3>
        <div className="list-follow">
          <div className="follow-item">
            <Link to="" className="follow-item-content">
              <img
                src="https://cdn1.tuoitre.vn/zoom/600_315/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
                alt=""
                className="user-avatar"
              ></img>
              <span className="user-name">
                Cao Kha Hieu sdcsa cdc ad v asdvsfvsadssaasds asdass
              </span>
            </Link>
            <button className="btn btn-primary">Followed</button>
          </div>
          <div className="follow-item">
            <Link to="" className="follow-item-content">
              <img
                src="https://cdn1.tuoitre.vn/zoom/600_315/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
                alt=""
                className="user-avatar"
              ></img>
              <span className="user-name">Cao Kha Hieu</span>
            </Link>
            <button className="btn btn-outline">Follow</button>
          </div>
          <div className="follow-item">
            <Link to="" className="follow-item-content">
              <img
                src="https://cdn1.tuoitre.vn/zoom/600_315/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
                alt=""
                className="user-avatar"
              ></img>
              <span className="user-name">Cao Kha Hieu</span>
            </Link>
            <button className="btn btn-outline">Follow</button>
          </div>
          <div className="follow-item">
            <Link to="" className="follow-item-content">
              <img
                src="https://cdn1.tuoitre.vn/zoom/600_315/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
                alt=""
                className="user-avatar"
              ></img>
              <span className="user-name">Cao Kha Hieu</span>
            </Link>
            <button className="btn btn-outline">Follow</button>
          </div>
          <div className="follow-item">
            <Link to="" className="follow-item-content">
              <img
                src="https://cdn1.tuoitre.vn/zoom/600_315/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
                alt=""
                className="user-avatar"
              ></img>
              <span className="user-name">Cao Kha Hieu</span>
            </Link>
            <button className="btn btn-outline">Follow</button>
          </div>
          <div className="follow-item">
            <Link to="" className="follow-item-content">
              <img
                src="https://cdn1.tuoitre.vn/zoom/600_315/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
                alt=""
                className="user-avatar"
              ></img>
              <span className="user-name">Cao Kha Hieu</span>
            </Link>
            <button className="btn btn-outline">Follow</button>
          </div>
          <div className="follow-item">
            <Link to="" className="follow-item-content">
              <img
                src="https://cdn1.tuoitre.vn/zoom/600_315/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
                alt=""
                className="user-avatar"
              ></img>
              <span className="user-name">Cao Kha Hieu</span>
            </Link>
            <button className="btn btn-outline">Follow</button>
          </div>
        </div>
        <button
          className="close-popup"
          onClick={() => handleShowPopupFollow(false)}
        >
          <i className="fal fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default PopupFollow;
