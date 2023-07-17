import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-content">
        <h2>Contact Us</h2>
        <p>
          We would love to hear from you! If you have any questions, feedback, or
          inquiries, please feel free to reach out to us using the contact details
          provided below or by filling out the contact form.
        </p>
        <div className="contact-details">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>Email: info@coursemanagementsystem.com</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <span>Phone: +1 (123) 456-7890</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Address: 123 Main Street, City, Country</span>
          </div>
        </div>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
