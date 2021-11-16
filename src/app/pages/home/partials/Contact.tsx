import React from 'react';

const Contact = () => {
  return (
    <section className="section-contact">
      <div className="container">
        <h3 className="contact-title">Subscribe to newsletter</h3>
        <form className="contact-form row">
          <div className="col-8 col-md-12">
            <input
              type="text"
              className="contact-input"
              placeholder="Enter your email"
            ></input>
          </div>
          <div className="col-4 col-md-12">
            <button className="btn btn-primary col-4">SUBCRIBE</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
