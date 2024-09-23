import axios from '../../utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const HostSidebar = () => {
  const navigate = useNavigate();
  const [host, setHost] = useState({});

  const getHostProfile = async () => {
    const hostID = localStorage.getItem('ID');
    try {
      const response = await axios.get(`/host/${hostID}`);
      console.log(response);
      setHost(response.data);
    } catch (error) {
      console.error('Error fetching host profile', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    navigate('/login');
  };

  useEffect(() => {
    getHostProfile();
  }, []);

  return (
    // <div className="sidebar">
    //   <div className="doctor-profile">
    //     <img src={doctor.image} className="doctor-image" />

    //     <h2>{doctor.firstname}</h2>
    //     <h2> {doctor.lastname}</h2>
    //     <div className="menu">
    //       <p>
    //         <NavLink className="link" to="/doctor/home">
    //           Dashboard
    //         </NavLink>
    //       </p>
    //       <p>
    //         <NavLink className="link" to="/doctor/bookings">
    //           My Bookings
    //         </NavLink>
    //       </p>
    //       <p>Slots</p>
    //       <p onclick={logout}>Logout</p>
    //     </div>
    //   </div>
    // </div>

    <div className="sidebar">
      <div className="host-profile">
        <div className="details">
          <img src="/images/logo.png" alt="Logo" className="logo-image" />
          <p></p>
          <div className="sub">
            <h3>{host.username}</h3>
            <h5>{host.email}</h5>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="menu">
        <p>
          <NavLink className="link" to="/host/home">
            Dashboard
          </NavLink>
        </p>

        <p>
          <NavLink className="link" to="/host/getaways">
            Getaways
          </NavLink>
        </p>
        <p>
          <NavLink className="link" to="/host/profile">
            Profile
          </NavLink>
        </p>

        <p onClick={logout}>Logout</p>
      </div>
    </div>
  );
};

export default HostSidebar;
