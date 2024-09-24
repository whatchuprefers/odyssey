import axios from '../../utils/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserSidebar from '../../components/UserSide/UserSide';
import { getRole } from '../../utils/localFunctions';
import './GetawayDetails.css';

const GetawayDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading property details...</p>;
  }

  return (
    <div className="getawaypagedetails">
      <UserSidebar className="usersidebar" />
      <div className="subb">
        <h2>Revamp Getaway Profile</h2>
        <div className="details-container">
          {property ? (
            <>
              <img
                src={`/uploads/${property.image.split('\\').pop()}`}
                alt={property.name}
                className="property-image"
              />
              <h2>{property.name}</h2>
              <div className="oth">
                <p>
                  <strong>Address:</strong> {property.address}
                </p>
                <p>
                  <strong>Amenities:</strong> {property.amenities}
                </p>
                <p>
                  <strong>Price:</strong> ${property.price}
                </p>
              </div>
            </>
          ) : (
            <p>No property details found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetawayDetails;
