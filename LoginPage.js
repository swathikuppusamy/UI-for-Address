// src/components/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const LoginPage = ({ setAuthenticatedUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === 'admin' && email === 'swathik.22cse@kongu.edu' && password === 'swathi') {
      setAuthenticatedUser({ role: 'admin' });
      navigate('/admin');
    } else if (role === 'user' && email && password) {
      // No specific username or password check for users, just ensure they are not empty
      setAuthenticatedUser({ role: 'user' });
      navigate('/user');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <div className="heading">Login</div>
      <form className="form" onSubmit={handleLogin}>
        <input 
          required 
          className="input" 
          type="email" 
          name="email" 
          id="email" 
          placeholder="E-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          required 
          className="input" 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className="role-selector">
          <label>
            <input 
              type="radio" 
              name="role" 
              value="user" 
              checked={role === 'user'} 
              onChange={(e) => setRole(e.target.value)} 
            />
            User
          </label>
          <label>
            <input 
              type="radio" 
              name="role" 
              value="admin" 
              checked={role === 'admin'} 
              onChange={(e) => setRole(e.target.value)} 
            />
            Admin
          </label>
        </div>

        <input className="login-button" type="submit" value="Login" />
      </form>
      <div className="social-account-container">
        <div className="forgot-signin">
          <p className="forgot-password"><a href="#">Forgot Password ?</a></p>
          <p className="signin"><a href="signin.html" className="login-link">Signin?</a></p>
        </div>
        <span className="title">Or Sign in with</span><br />
        <div className="social-accounts">
          <button className="social-button google">
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
