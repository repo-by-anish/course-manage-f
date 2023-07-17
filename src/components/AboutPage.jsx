import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <h2>About Course Management System</h2>
        <p>
          The Course Management System is a web application designed to
          streamline and manage courses, students, instructors, and the overall
          administration of an educational institution. It provides a
          user-friendly interface for students, instructors, and the principal
          to interact with the system and perform various tasks.
        </p>
        <p>
          With the Course Management System, students can easily enroll in
          courses, access course materials, submit assignments, and track their
          progress. Instructors can create and manage courses, upload course
          materials, grade assignments, and communicate with students. The
          principal has administrative privileges to oversee the system,
          manage users, and monitor the overall performance of the institution.
        </p>
        <p>
          The system offers features such as course enrollment, assignment
          submission, grading, attendance tracking, messaging, and reporting.
          It aims to simplify the process of course management, enhance
          collaboration between students and instructors, and provide valuable
          insights for the principal to make informed decisions.
        </p>
        <p>
          The Course Management System is built using modern web technologies
          such as React for the frontend user interface, Node.js and Express.js
          for the backend server, and MongoDB as the database. It leverages the
          power of these technologies to create a robust, scalable, and
          efficient solution for educational institutions.
        </p>
        <p>
          We are committed to continuously improving the Course Management
          System and providing the best user experience for our users. We value
          feedback and suggestions to enhance the functionality and usability
          of the system.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
