import React, { useEffect, useState } from 'react';
import { getCountries, getStatesByCountryId, getCitiesByStateId } from '../api';

// Embedded CSS styles
const styles = {
  userPageContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
  },
  selectContainer: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  selectLabel: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '5px',
    display: 'block',
  },
  selectBox: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '15px',
    color: '#333',
    backgroundColor: '#f9f9f9',
    transition: 'border-color 0.3s',
  },
};

const UserPage = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await getCountries();
        setCountries(countries);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const states = await getStatesByCountryId(selectedCountry);
          setStates(states);
          setCities([]);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const cities = await getCitiesByStateId(selectedState);
          setCities(cities);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchCities();
    }
  }, [selectedState]);

  return (
    <div style={styles.userPageContainer}>
      <h1 style={styles.heading}>User Page</h1>
      {error && <div style={styles.errorMessage}>Error: {error}</div>}
      <div style={styles.selectContainer}>
        <label style={styles.selectLabel}>Country: </label>
        <select
          style={styles.selectBox}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country._id} value={country._id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.selectContainer}>
        <label style={styles.selectLabel}>State: </label>
        <select
          style={styles.selectBox}
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state._id} value={state._id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.selectContainer}>
        <label style={styles.selectLabel}>City: </label>
        <select style={styles.selectBox} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city._id} value={city._id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserPage;
