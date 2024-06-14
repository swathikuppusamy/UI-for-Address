import React, { useState, useEffect } from 'react';
import { getCities, addCity, updateCity, deleteCity, getStates } from '../api';

const City = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [newCityName, setNewCityName] = useState('');
  const [newCityStateId, setNewCityStateId] = useState('');
  const [editCityId, setEditCityId] = useState(null);
  const [editCityName, setEditCityName] = useState('');
  const [editCityStateId, setEditCityStateId] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    const fetchStates = async () => {
      try {
        const data = await getStates();
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchCities();
    fetchStates();
  }, []);

  const handleAddCity = async (e) => {
    e.preventDefault();
    try {
      const newCity = await addCity(newCityName, newCityStateId);
      setCities([...cities, newCity]);
      setNewCityName('');
      setNewCityStateId('');
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };

  const handleUpdateCity = async (id) => {
    try {
      const updatedCity = await updateCity(id, editCityName, editCityStateId);
      setCities(cities.map(city => (city._id === id ? updatedCity : city)));
      setEditCityId(null);
      setEditCityName('');
      setEditCityStateId('');
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };

  const handleDeleteCity = async (id) => {
    try {
      await deleteCity(id);
      setCities(cities.filter(city => city._id !== id));
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const getStateName = (stateId) => {
    const state = states.find(state => state._id === stateId);
    return state ? state.name : '';
  };

  return (
    <div className="container">
      <style jsx>{`
        .container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        form input[type="text"],
        form select {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 10px;
          flex: 1;
        }

        form button {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        form button:hover {
          background-color: #218838;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background-color: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        li:nth-child(even) {
          background-color: #e9ecef;
        }

        button {
          padding: 5px 10px;
          margin-left: 5px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .edit-button {
          background-color: #007bff;
          color: white;
        }

        .edit-button:hover {
          background-color: #0056b3;
        }

        .delete-button {
          background-color: #dc3545;
          color: white;
        }

        .delete-button:hover {
          background-color: #c82333;
        }

        .edit-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .edit-container input,
        .edit-container select {
          margin-right: 10px;
          flex: 1;
        }
      `}</style>

      <h2>Cities</h2>
      <form onSubmit={handleAddCity}>
        <input
          type="text"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
          placeholder="Add new city"
          required
        />
        <select value={newCityStateId} onChange={(e) => setNewCityStateId(e.target.value)} required>
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state._id} value={state._id}>{state.name}</option>
          ))}
        </select>
        <button type="submit">Add City</button>
      </form>
      <ul>
        {cities.map(city => (
          <li key={city._id}>
            {editCityId === city._id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editCityName}
                  onChange={(e) => setEditCityName(e.target.value)}
                />
                <select
                  value={editCityStateId}
                  onChange={(e) => setEditCityStateId(e.target.value)}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state._id} value={state._id}>{state.name}</option>
                  ))}
                </select>
                <button className="edit-button" onClick={() => handleUpdateCity(city._id)}>Save</button>
                <button className="delete-button" onClick={() => setEditCityId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                {city.name} - {getStateName(city.stateId)}
                <div>
                  <button className="edit-button" onClick={() => {
                    setEditCityId(city._id);
                    setEditCityName(city.name);
                    setEditCityStateId(city.stateId);
                  }}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteCity(city._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default City;
