import React, { useEffect, useRef, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStudentLoginMutation } from './authApiSlice';
import { setCredentials } from './authSlice';



const StudentLogin = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRef = useRef();
    const errRef = useRef();
    const [login, { isLoading,isError,error }] = useStudentLoginMutation();

    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        setErrMsg('');
    },[email,pwd])

    if(isError){
        console.log(error);
    }

    const errorClass = errMsg ? "errmsg" : "offscreen";

    if (isLoading) return <p>Loading...</p>

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, pwd);
        try {
            const{accessToken}=await login({email,password:pwd}).unwrap()
            dispatch(setCredentials({accessToken}))
            setEmail("");
            setPwd("");
            navigate("/dash/student")
        } catch (error) {
            if (!error.status) {
                setErrMsg("No Server Response");
              } else if (error.status === 400) {
                setErrMsg("Missing username or password");
              } else if (error.status === 401) {
                setErrMsg("Unauthorized");
              } else {
                setErrMsg(error?.data?.message);
              }
              errRef.current.focus();
        }
    }

    const content = (
        <div className="login-container">
        <p ref={errRef} className={errorClass} aria-live='assertive'>{errMsg}</p>
            <h2>Student Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Email</label>
                    <input 
                    ref={userRef} 
                    autoComplete='off' 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                    required 
                    value={pwd} 
                    onChange={e => setPwd(e.target.value)} 
                    type="password" 
                    placeholder="Enter your password" />
                </div>
                <button className="login-btn student">Login</button>
            </form>
        </div>
    )

    return content
};

export default StudentLogin;
