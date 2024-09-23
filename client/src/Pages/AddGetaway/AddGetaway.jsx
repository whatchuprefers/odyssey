import axios from '../../utils/axios';
import { useState } from 'react';
import HostSidebar from '../../components/Sidebar/Sidebar';
import './AddGetaway.css';

const AddGetaway = () => {
  const [property, setProperty] = useState({
    name: '',
    address: '',
    amenities: '',
    price: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = e => {
    setProperty({ ...property, image: e.target.files[0] });
  };

  console.log('Submitting property:', property);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('User not authenticated.');
      return;
    }

    const hostId = localStorage.getItem('ID'); // Ensure this key matches your storage
    console.log('Retrieved hostId:', hostId); // Log the hostId for debugging
    if (!hostId) {
      setErrorMessage('Host ID is required.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    for (const key in property) {
      formData.append(key, property[key]);
    }

    // Append the correct key for hostId
    formData.append('host', hostId); // Ensure this matches your backend's expected key

    try {
      const response = await axios.post('/accommodation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Property added successfully!');
      // Reset form or redirect as needed
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Unknown error';
      setErrorMessage('Error adding property: ' + message);
      console.error('Error adding property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addgetawaypage">
      <HostSidebar className="hostsidebar" />
      <div className="new">
        <h2>Add New Getaway</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="rowss">
          <label className="lab">Name</label>
          <input
            className="in"
            type="text"
            name="name"
            value={property.name}
            onChange={handleInputChange}
            placeholder="Property Name"
          />
          <label className="lab">Address</label>
          <input
            className="in"
            type="text"
            name="address"
            value={property.address}
            onChange={handleInputChange}
            placeholder="Property Address"
          />
          <label className="lab">Amenities</label>
          <input
            className="in"
            type="text"
            name="amenities"
            value={property.amenities}
            onChange={handleInputChange}
            placeholder="Amenities"
          />
          <label className="lab">Price</label>
          <input
            className="in"
            type="number"
            name="price"
            value={property.price}
            onChange={handleInputChange}
            placeholder="Price"
          />
          <label className="lab">Image</label>
          <input
            type="file"
            className="file-input"
            onChange={handleImageChange}
            accept="image/*"
          />
          <div className="btnnn">
            <button className="bt" onClick={handleSave} disabled={loading}>
              {loading ? 'Adding...' : 'Add Property'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGetaway;
