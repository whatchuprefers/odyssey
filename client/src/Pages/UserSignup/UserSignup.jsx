import { Input, Button, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../utils/axios';
import './UserSignup.css';

const UserSignup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e, key) => {
    setSignup({ ...signup, [key]: e.target.value });
  };

  const onSignup = async () => {
    try {
      const response = await axios.post('/user/signup', {
        firstname: signup.firstname,
        lastname: signup.lastname,
        email: signup.email,
        password: signup.password,
        confirmPassword: signup.confirmPassword,
      });

      // Save new user's token and ID
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('ID', response.data.id);

      navigate('/user/home'); // Redirect to user home
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
      <h2>Join Our Community!</h2>
      <label className="l">First Name</label>
      <Input
        className="inp"
        onChange={e => onChange(e, 'firstname')}
        value={signup.firstname}
      />
      <label className="l">Last Name</label>
      <Input
        className="inp"
        onChange={e => onChange(e, 'lastname')}
        value={signup.lastname}
      />
      <label className="l">Email</label>
      <Input
        className="inp"
        onChange={e => onChange(e, 'email')}
        value={signup.email}
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
        Already a member?{' '}
        <Link to="/user/login" className="signin-link">
          Log in here!
        </Link>
      </h5>
    </div>
  );
};

export default UserSignup;
