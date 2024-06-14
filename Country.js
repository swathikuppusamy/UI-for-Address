import React, { useState, useEffect } from 'react';
import { getCountries, addCountry, updateCountry, deleteCountry } from '../api';

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [newCountryName, setNewCountryName] = useState('');
  const [editCountryId, setEditCountryId] = useState(null);
  const [editCountryName, setEditCountryName] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleAddCountry = async (e) => {
    e.preventDefault();
    try {
      const newCountry = await addCountry(newCountryName);
      setCountries([...countries, newCountry]);
      setNewCountryName('');
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  const handleUpdateCountry = async (id) => {
    try {
      const updatedCountry = await updateCountry(id, editCountryName);
      setCountries(countries.map(country => (country._id === id ? updatedCountry : country)));
      setEditCountryId(null);
      setEditCountryName('');
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const handleDeleteCountry = async (id) => {
    try {
      await deleteCountry(id);
      setCountries(countries.filter(country => country._id !== id));
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  return (
    <div>
      <style>{`
        .country-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background-color: #f9f9f9;
        }

        .country-container h2 {
          text-align: center;
          color: #333;
        }

        .country-form {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .country-form input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 10px;
          width: 70%;
        }

        .country-form button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          background-color: #28a745;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .country-form button:hover {
          background-color: #218838;
        }

        .country-list {
          list-style: none;
          padding: 0;
        }

        .country-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }

        .country-list li:nth-child(even) {
          background-color: #f1f1f1;
        }

        .country-list li input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 10px;
        }

        .country-list li button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .country-list li button:hover {
          background-color: #0056b3;
        }

        .country-list li button:nth-child(3) {
          background-color: #dc3545;
        }

        .country-list li button:nth-child(3):hover {
          background-color: #c82333;
        }
      `}</style>

      <div className="country-container">
        <h2>Countries</h2>
        <form className="country-form" onSubmit={handleAddCountry}>
          <input
            type="text"
            value={newCountryName}
            onChange={(e) => setNewCountryName(e.target.value)}
            placeholder="Add new country"
            required
          />
          <button type="submit">Add Country</button>
        </form>
        <ul className="country-list">
          {countries.map(country => (
            <li key={country._id}>
              {editCountryId === country._id ? (
                <>
                  <input
                    type="text"
                    value={editCountryName}
                    onChange={(e) => setEditCountryName(e.target.value)}
                  />
                  <button onClick={() => handleUpdateCountry(country._id)}>Save</button>
                  <button onClick={() => setEditCountryId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {country.name}
                  <button
                    onClick={() => {
                      setEditCountryId(country._id);
                      setEditCountryName(country.name);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCountry(country._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Country;
