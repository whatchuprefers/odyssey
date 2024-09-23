import axios from '../../utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HostSidebar from '../../components/Sidebar/Sidebar';
import { FaUserCircle, FaSearch, FaPlus } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { getRole } from '../../utils/localFunctions';
import './HostGetaways.css';

const HostGetaways = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  console.log(getRole());
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    // Filter properties based on the search input
    setFilteredProperties(
      properties.filter(
        property =>
          property.name.toLowerCase().includes(search.toLowerCase()) ||
          property.address.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, properties]);
  console.log(filteredProperties);

  const fetchProperties = async () => {
    try {
      const hostID = localStorage.getItem('ID');
      const response = await axios.get(`/host/${hostID}/accommodation`); // Replace with your actual endpoint
      console.log('Fetched properties:', response.data); // Debugging line
      setProperties(response.data);
      setFilteredProperties(response.data); // Initialize filtered properties
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleEditClick = propertyId => {
    navigate(`/host/getaways/${propertyId}`); // Navigate to the edit page
  };

  const handleAddNewClick = () => {
    navigate('/host/getaways/add'); // Navigate to the add getaway page
  };

  return (
    <>
      <div className="getawaypage">
        <HostSidebar className="hostsidebar" />
        <div className="sub">
          <h2>Our Featured Stays</h2>
          <div className="header-search">
            <IoMdSearch className="searchIcon" color="black" size={20} />
            <input
              className="input"
              type="search"
              placeholder="Search Accomodations"
              onChange={handleSearchChange}
              value={search}
            ></input>
            <button className="btn" onClick={handleAddNewClick}>
              <FaPlus className="plusIcon" /> Add New
            </button>
          </div>
          {console.log(properties)};
          <div className="card-container">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <div className="card" key={index}>
                  <img
                    src={`/uploads/${property.image.split('\\').pop()}`}
                    className="card-image"
                  />
                  <div className="card-content">
                    <h2 className="property-name">{property.name}</h2>
                    <p className="location">{property.address}</p>
                    <div className="button-container">
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(property._id)}
                      >
                        Edit
                      </button>
                      <button className="review-button">Reviews</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No properties found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HostGetaways;
