import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="section-footer">
      <div className="container">
        <ul className="list-media">
          <li className="media-item">
            <Link to="" className="media-link">
              <i className="fab fa-facebook-f"></i>
            </Link>
          </li>
          <li className="media-item">
            <Link to="" className="media-link">
              <i className="fab fa-twitter"></i>
            </Link>
          </li>
          <li className="media-item">
            <Link to="" className="media-link">
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
          <li className="media-item">
            <Link to="" className="media-link">
              <i className="fab fa-youtube"></i>
            </Link>
          </li>
        </ul>
        <div className="footer-copy-right">
          <p>
            Copyright &copy; 2021 All rights reserved | This template is made
            with by Cao Kha Hieu &amp; Nguyen Trong Huu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
