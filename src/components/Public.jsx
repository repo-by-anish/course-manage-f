import React from "react";
import "./Public.css";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div className="public__landing-page">
      <header>
        <nav>
          <div className="public__container">
            <Link to="/" className="public__logo">
              Course Management System
            </Link>
            <ul className="public__navigation">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="bgimg">
        <div className="public__hero">
          <div className="public__container">
            <h1>Welcome to the Course Management System</h1>
            <p>Manage and organize your courses with ease.</p>
            <Link to="/login" className="public__btn">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <footer>
        <div className="public__container">
          <p>&copy; 2023 Course Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Public;
