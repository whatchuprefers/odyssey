import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
// import { ToastContainer, toast } from 'react-toastify';
import axios from '../../utils/axios';
import './Login.css';

const Login = () => {
  return (
    <>
      <div className="login-form">
        <h2>Embark on Your Odyssey Today!</h2>
        <label className="label">Email</label>
        <Input className="input" />
        <label className="label">Password</label>
        <Input className="input" type="password" />
        <Button className="btn">Login</Button>
        <h5>
          Not with us yet?{' '}
          <Link to="/signup" className="signup-link">
            {' '}
            Start your journey here!
          </Link>
        </h5>
      </div>
    </>
  );
};

export default Login;
