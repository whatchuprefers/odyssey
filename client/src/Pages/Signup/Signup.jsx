import { Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    username: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e, key) => {
    setSignup({ ...signup, [key]: e.target.value });
  };

  const onSignup = async () => {
    try {
      const response = await axios.post('/host/signup', {
        username: signup.username,
        email: signup.email,
        contactNumber: signup.contactNumber,
        password: signup.password,
        confirmPassword: signup.confirmPassword,
      });

      // Save new user's token and ID
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('ID', response.data.id);

      navigate('/host/home');
    } catch (e) {
      if (e.response && e.response.status === 403) {
        notification.error({
          message: 'Failed!!',
          description: e.response.data.message,
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'Something went wrong. Please try again later.',
        });
      }
      console.log(e);
    }
  };

  return (
    <div className="signup-form">
      <h2>Begin Your Story with Us!</h2>
      <label className="l">Username</label>
      <Input
        className="inp"
        onChange={e => onChange(e, 'username')}
        value={signup.username}
      />
      <label className="l">Email</label>
      <Input
        className="inp"
        onChange={e => onChange(e, 'email')}
        value={signup.email}
      />
      <label className="l">Contact</label>
      <Input
        className="inp"
        onChange={e => onChange(e, 'contactNumber')}
        value={signup.contactNumber}
      />
      <label className="l">Password</label>
      <Input
        className="inp"
        type="password"
        onChange={e => onChange(e, 'password')}
        value={signup.password}
      />
      <label className="l">Confirm Password</label>
      <Input
        className="inp"
        type="password"
        onChange={e => onChange(e, 'confirmPassword')}
        value={signup.confirmPassword}
      />
      <Button className="bt" onClick={onSignup}>
        Sign Up
      </Button>
      <h5>
        Already with us?{' '}
        <Link to="host/login" className="signin-link">
          Jump back in!
        </Link>
      </h5>
    </div>
  );
};

export default Signup;
