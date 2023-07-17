import React, { useEffect } from 'react';
import './DashHeader.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/login/authApiSlice';
import useAuth from '../hooks/useAuth';

const DashHeader = () => {

  const navigate = useNavigate()
  const {status,foundUser}=useAuth()
  return (
    <header className="dash-header">
      <h1 className="dash-logo">Course Management System</h1>
      <nav className="dash-nav">
        <ul className="dash-nav-list">
          <li className="dash-nav-item">{foundUser.email?foundUser.email.substring(0, foundUser.email.indexOf('@')):foundUser.username}({status})</li>
        </ul>
      </nav>
    </header>
  );
};

export default DashHeader;