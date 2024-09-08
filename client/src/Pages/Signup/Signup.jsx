import { Input, Button } from 'antd';
import Link from 'antd/es/typography/Link';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './Signup.css';

const Signup = () => {
  return (
    <>
      <div className="signup-form">
        <h2>Begin Your Story with Us!</h2>
        <label className="label">Username</label>
        <Input className="input" />
        <label className="label">Email</label>
        <Input className="input" />
        <label className="label">Password</label>
        <Input className="input" type="password" />
        <Button className="btn">Sign Up</Button>
        <h5>
          Already with us?{' '}
          <Link to="/login" className="signin-link">
            Jump back in!
          </Link>
        </h5>
      </div>
    </>
  );
};

export default Signup;
