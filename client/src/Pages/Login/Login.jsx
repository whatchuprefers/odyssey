import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
// import { ToastContainer, toast } from 'react-toastify';
import axios from '../../utils/axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };

  const onLogin = async () => {
    try {
      const response = await axios.post('/host/login', {
        emailOrUsername: login.email, // Change this line
        password: login.password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('ID', response.data.id);
      navigate('/host/home');
    } catch (e) {
      toast.error('Email or Password is incorrect!');
    }
  };

  const signup = async () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="login-form">
        <h2>Embark on Your Odyssey Today!</h2>
        <label className="l">Email</label>
        <Input className="inp" onChange={e => onChange(e, 'email')} />
        <label className="l">Password</label>
        <Input
          className="inp"
          type="password"
          onChange={e => onChange(e, 'password')}
        />
        <Button className="bt" onClick={onLogin}>
          Login
        </Button>
        <h5>
          Not with us yet?{' '}
          <Link to="/signup" className="signup-link" onClick={signup}>
            {' '}
            Start your journey here!
          </Link>
        </h5>
      </div>
    </>
  );
};

export default Login;
