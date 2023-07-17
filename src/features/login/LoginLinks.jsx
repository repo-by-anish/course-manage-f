import React from 'react';
import './LoginLinks.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginLinks = () => {
    const navigate = useNavigate();
    return (
        <>
            <h2 className='log__main__heading'>Login Links</h2>
            <hr />
            <Link to={"/"}>{"<---Back To Home"}</Link>
            <div className="login-links">
                <div className="login-box">
                    <h2>Student Login</h2>
                    <button className="log-login-btn" onClick={() => navigate("/login/student")}>
                        Login
                    </button>
                </div>
                <div className="login-box">
                    <h2>Instructor Login</h2>
                    <button className="log-login-btn" onClick={() => navigate("/login/instructor")}>
                        Login
                    </button>
                </div>
                <div className="login-box">
                    <h2>Principal Login</h2>
                    <button className="log-login-btn" onClick={() => navigate("/login/principal")}>
                        Login
                    </button>
                </div>
                <div className="login-box">
                    <h2>Admin Login</h2>
                    <button className="log-login-btn" onClick={() => navigate("/login/admin")}>
                        Login
                    </button>
                </div>
            </div>
        </>
    );
};

export default LoginLinks;
