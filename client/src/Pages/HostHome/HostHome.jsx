import axios from '../../utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HostSidebar from '../../components/Sidebar/Sidebar';
import { getRole } from '../../utils/localFunctions';
import './HostHome.css';

const HostHome = () => {
  console.log(getRole());
  const navigate = useNavigate(); // Initialize useNavigate

  const [host, setHost] = useState('');
  const getHostProfile = async () => {
    const hostID = localStorage.getItem('ID');
    const response = await axios.get(`/host/${hostID}`);
    console.log(response);
    setHost(response.data);
  };

  useEffect(() => {
    getHostProfile();
  }, []);

  const handleCheckout = () => {
    navigate('/host/getaways'); // Redirect to the HostGetaways page
  };
  const handleNewlisting = () => {
    navigate('/host/getaways/add'); // Redirect to the HostGetaways page
  };

  return (
    <>
      <div className="homepage">
        <HostSidebar className="hostsidebar" />
        <div className="right">
          <div className="one"></div>
          <div className="two">
            <h3>Unlock the Doors to Your Cozy Retreats</h3>
            <button className="b" onClick={handleCheckout}>
              check out
            </button>
          </div>
          <div className="three">
            <h3>Launch Your Perfect Getaway</h3>
            <button className="b" onClick={handleNewlisting}>
              New Listing
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostHome;
