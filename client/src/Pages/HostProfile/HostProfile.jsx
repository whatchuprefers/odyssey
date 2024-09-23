import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';
import HostSidebar from '../../components/Sidebar/Sidebar';
import './HostProfile.css';

const HostProfile = () => {
  const { id } = useParams();
  const [hostData, setHostData] = useState({
    username: '',
    email: '',
    contactNumber: '', // Use contactNumber here
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHostData = async () => {
      const hostID = localStorage.getItem('ID'); // Retrieve host ID from local storage

      try {
        const response = await axios.get(`/host/${hostID}`);
        setHostData(response.data);
      } catch (error) {
        console.error('Error fetching host data:', error);
        setError('Failed to fetch host data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHostData();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setHostData({ ...hostData, [name]: value });
  };

  const handleSave = async () => {
    const hostID = localStorage.getItem('ID'); // Get the host ID again here

    try {
      await axios.put(`/host/${hostID}`, hostData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  if (loading) {
    return <p>Loading host details...</p>;
  }

  return (
    <div className="hostprofilepage">
      <HostSidebar className="hostsidebar" />
      <div className="sb">
        <h2>Edit Host Profile</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-container">
          <label className="lb">Username</label>
          <input
            className="inp"
            type="text"
            name="username"
            value={hostData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <label className="lb">Email</label>
          <input
            className="inp"
            type="email"
            name="email"
            value={hostData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <label className="lb">Contact Number</label>
          <input
            className="inp"
            type="tel"
            name="contactNumber" // Match the state variable name
            value={hostData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
          />
          <button className="but" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
