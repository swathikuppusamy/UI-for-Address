import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="admin-container">
      <style jsx>{`
        .admin-container {
          width: 100%;
          max-width: 600px;
          margin: 50px auto;
          padding: 40px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          font-family: 'Arial', sans-serif;
        }

        h2 {
          color: #333;
          margin-bottom: 20px;
        }

        p {
          color: #666;
          margin-bottom: 30px;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .button-container a {
          text-decoration: none;
        }

        button {
          padding: 15px 20px;
          width: 100%;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <h2>Admin Page</h2>
      <p>Welcome, Admin! You can add, edit, and delete records here.</p>
      <div className="button-container">
        <Link to="/countries">
          <button>Manage Countries</button>
        </Link>
        <Link to="/states">
          <button>Manage States</button>
        </Link>
        <Link to="/cities">
          <button>Manage Cities</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
