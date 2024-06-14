import React, { useState, useEffect } from 'react';
import { getStates, addState, updateState, deleteState, getCountries } from '../api';

const State = () => {
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [newStateName, setNewStateName] = useState('');
  const [newStateCountryId, setNewStateCountryId] = useState('');
  const [editStateId, setEditStateId] = useState(null);
  const [editStateName, setEditStateName] = useState('');
  const [editStateCountryId, setEditStateCountryId] = useState('');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await getStates();
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchStates();
    fetchCountries();
  }, []);

  const handleAddState = async (e) => {
    e.preventDefault();
    try {
      const newState = await addState(newStateName, newStateCountryId);
      setStates([...states, newState]);
      setNewStateName('');
      setNewStateCountryId('');
    } catch (error) {
      console.error('Error adding state:', error);
    }
  };

  const handleUpdateState = async (id) => {
    try {
      const updatedState = await updateState(id, editStateName, editStateCountryId);
      setStates(states.map(state => (state._id === id ? updatedState : state)));
      setEditStateId(null);
      setEditStateName('');
      setEditStateCountryId('');
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  const handleDeleteState = async (id) => {
    try {
      await deleteState(id);
      setStates(states.filter(state => state._id !== id));
    } catch (error) {
      console.error('Error deleting state:', error);
    }
  };

  const getCountryName = (countryId) => {
    const country = countries.find(country => country._id === countryId);
    return country ? country.name : '';
  };

  return (
    <div className="container">
      <style jsx>{`
        .container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
          font-family: 'Arial', sans-serif;
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
          font-family: 'Arial', sans-serif;
        }

        form button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-family: 'Arial', sans-serif;
        }

        form button:hover {
          background-color: #0056b3;
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
          font-family: 'Arial', sans-serif;
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
          font-family: 'Arial', sans-serif;
        }

        .edit-button {
          background-color: #28a745;
          color: white;
        }

        .edit-button:hover {
          background-color: #218838;
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

      <h2>States</h2>
      <form onSubmit={handleAddState}>
        <input
          type="text"
          value={newStateName}
          onChange={(e) => setNewStateName(e.target.value)}
          placeholder="Add new state"
          required
        />
        <select value={newStateCountryId} onChange={(e) => setNewStateCountryId(e.target.value)} required>
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country._id} value={country._id}>{country.name}</option>
          ))}
        </select>
        <button type="submit">Add State</button>
      </form>
      <ul>
        {states.map(state => (
          <li key={state._id}>
            {editStateId === state._id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editStateName}
                  onChange={(e) => setEditStateName(e.target.value)}
                />
                <select
                  value={editStateCountryId}
                  onChange={(e) => setEditStateCountryId(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country._id} value={country._id}>{country.name}</option>
                  ))}
                </select>
                <button className="edit-button" onClick={() => handleUpdateState(state._id)}>Save</button>
                <button className="delete-button" onClick={() => setEditStateId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                {state.name} - {getCountryName(state.countryId)}
                <div>
                  <button className="edit-button" onClick={() => {
                    setEditStateId(state._id);
                    setEditStateName(state.name);
                    setEditStateCountryId(state.countryId);
                  }}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteState(state._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default State;
