import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';
import UserSidebar from '../../components/UserSide/UserSide';
import './UserProfile.css';

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userID = localStorage.getItem('ID'); // Retrieve host ID from local storage

      try {
        const response = await axios.get(`/user/${userID}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching  data:', error);
        setError('Failed to fetch  data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    const userID = localStorage.getItem('ID'); // Get the host ID again here

    try {
      await axios.put(`/user/${userID}`, userData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  if (loading) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="userprofilepage">
      <UserSidebar className="usersidebar" />
      <div className="sb">
        <h2>Edit Your Profile</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-container">
          <label className="lb">First Name</label>
          <input
            className="inp"
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            placeholder="First name"
          />
          <label className="lb">Last Name</label>
          <input
            className="inp"
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            placeholder="Last name"
          />
          <label className="lb">Email</label>
          <input
            className="inp"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <button className="but" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
