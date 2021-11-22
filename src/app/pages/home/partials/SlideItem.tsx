import React from 'react';

import { Link } from 'react-router-dom';

const SlideItem = ({ index }: { index: number }) => {
  return (
    <li className="post-item" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
      <Link to="" className="post-link">
        <div className="row">
          <div className="post-image col-5 col-md-12">
            <img
              src="https://preview.colorlib.com/theme/magdesign/images/xpost_lg_4.jpg.pagespeed.ic.hSr_aHpE_J.webp"
              alt=""
            ></img>
          </div>
          <div className="post-content col-7 col-md-12">
            <p className="post-topic">
              Business, Travel -<span className="post-create-at">July 2, 2020</span>
            </p>
            <h2 className="post-title">
              Your most unhappy customers are your greatest source of learning.
            </h2>
            <p className="post-text-content">
              Far far away, behind the word mountains, far from the countries Vokalia and
              Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right
              at the coast of the Semantics, a large language ocean.
            </p>
            <div className="post-author">
              <img
                src="https://preview.colorlib.com/theme/magdesign/images/xperson_1.jpg.pagespeed.ic.Zebptmx_f8.webp"
                alt=""
                className="author-avatar"
              ></img>
              <div className="author-content">
                <strong className="author-name">Cao Kha Hieu</strong>
                <span className="author-role">CEO and Founder</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SlideItem;
