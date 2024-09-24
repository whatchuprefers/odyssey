import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link correctly
import axios from '../../utils/axios';
import './UserLogin.css';

const UserLogin = () => {
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
      const response = await axios.post('/user/login', {
        email: login.email,
        password: login.password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('ID', response.data.id);
      navigate('/user/home');
    } catch (e) {
      console.error('Login error:', e);
      // Optionally show an error notification here
    }
  };

  return (
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
        <Link to="/user/signup" className="signup-link">
          Start your journey here!
        </Link>
      </h5>
    </div>
  );
};

export default UserLogin;
