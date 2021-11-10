import React from 'react';

const Post = () => {
  return (
    <li className="list-item col-4 col-lg-12 ">
      <div className="card">
        <img src="pictures/picture1.jpg" alt="" className="card-img-top" />
        <div className="card-body">
          <div className="post-topic-date">
            <h4 className="post-topic">Business, Travel</h4>
            <p className="card-text post-date">— July 2, 2020</p>
          </div>
          <h2 className="card-title post-title">
            Your most unhappy customers are your greatest source of learning.
          </h2>
          <p className="card-text">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of
            the Semantics, a large language ocean.
          </p>
        </div>
        <a href="/#" className="card-footer">
          <img src="pictures/avatar.jpg" alt="" className="author-avatar" />
          <div className="author-info">
            <h4 className="card-title">Sergy Campbell</h4>
            <p className="card-text">CEO and Founder</p>
          </div>
        </a>
      </div>
    </li>
  );
};
export default Post;
