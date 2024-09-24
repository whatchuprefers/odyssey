import axios from '../../utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './UserSide.css';

const UserSidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const getUserProfile = async () => {
    const userID = localStorage.getItem('ID');
    try {
      const response = await axios.get(`/user/${userID}`);
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    navigate('/user/login');
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="side">
      <div className="user-profile">
        <div className="det">
          <img src="/images/logo.png" alt="Logo" className="logo-image" />
          <p></p>
          <div className="sub">
            <h3>{user.firstname}</h3>
            <h5>{user.email}</h5>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="menuu">
        <p>
          <NavLink className="link" to="/user/home">
            Dashboard
          </NavLink>
        </p>

        <p>
          <NavLink className="link" to="/user/getaways">
            Getaways
          </NavLink>
        </p>

        {/* <p>
          <NavLink className="link" to="/user/atttractions">
            Destinations
          </NavLink>
        </p> */}

        <p>
          <NavLink className="link" to="/user/profile">
            Profile
          </NavLink>
        </p>

        <p onClick={logout}>Logout</p>
      </div>
    </div>
  );
};

export default UserSidebar;
