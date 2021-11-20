import React from 'react';

const Contact = () => {
  return (
    <section className="section-contact">
      <div className="container">
        <h3 className="contact-title">Subscribe to newsletter</h3>
        <form className="contact-form row">
          <div className="col-6 col-md-12">
            <input
              type="text"
              className="contact-input"
              placeholder="Enter your email"
            ></input>
          </div>
          <div className="col-2 col-md-12">
            <button className="btn btn-primary">SUBSCRIBE</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
