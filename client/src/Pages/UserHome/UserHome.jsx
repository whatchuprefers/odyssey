import axios from '../../utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../../components/UserSide/UserSide';
import { getRole } from '../../utils/localFunctions';
import './UserHome.css';

const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  const getUserProfile = async () => {
    const userID = localStorage.getItem('ID');
    const response = await axios.get(`/user/${userID}`);
    console.log(response);
    setUser(response.data);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleGetaway = () => {
    navigate('/user/getaways'); // Redirect to the HostGetaways page
  };

  return (
    <>
      <div className="homepage">
        <UserSidebar className="usersidebar" />
        <div className="right">
          <div className="profile-info">
            <h2>Discover Your Perfect Getaway.</h2>
            <button className="bttn" onClick={handleGetaway}>
              Check Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
