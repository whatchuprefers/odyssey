import axios from '../../utils/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HostSidebar from '../../components/Sidebar/Sidebar';
import { getRole } from '../../utils/localFunctions';
import './EditGetaway.css';

const EditGetaway = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/accommodation/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`/accommodation/${id}`, property);
      alert('Property updated successfully!');
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        await axios.delete(`/accommodation/${id}`);
        alert('Property deleted successfully!');
        // Redirect or perform further actions
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    } else {
      setConfirmDelete(true);
    }
  };

  if (loading) {
    return <p>Loading property details...</p>;
  }

  return (
    <div className="editgetawaypage">
      <HostSidebar className="hostsidebar" />
      <div className="subb">
        <h2>Revamp Getaway Profile</h2>
        {property ? (
          <div className="rows">
            <img src={property.image} className="property-image" />
            <label>Name</label>
            <input
              type="text"
              value={property.name}
              onChange={e => setProperty({ ...property, name: e.target.value })}
              placeholder="Property Name"
            />
            <label>Address</label>

            <input
              type="text"
              value={property.address}
              onChange={e =>
                setProperty({ ...property, address: e.target.value })
              }
              placeholder="Property Address"
            />
            <label>Amenities</label>

            <input
              type="text"
              value={property.amenities}
              onChange={e =>
                setProperty({ ...property, amenities: e.target.value })
              }
              placeholder="Amenities"
            />
            <label>Price</label>

            <input
              type="number"
              value={property.price}
              onChange={e =>
                setProperty({ ...property, price: e.target.value })
              }
              placeholder="Price"
            />
            <div className="btnn">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleDelete}>
                {confirmDelete ? 'Confirm Delete' : 'Delete'}
              </button>
            </div>
          </div>
        ) : (
          <p>No property details found.</p>
        )}
      </div>
    </div>
  );
};

export default EditGetaway;
