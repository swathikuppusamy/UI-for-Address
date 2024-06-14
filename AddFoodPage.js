// frontend/src/components/AddFoodPage.js

import React from 'react';
import FoodForm from './FoodForm'; // Assuming FoodForm is located in the same directory

const AddFoodPage = ({ fetchFoods }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <FoodForm fetchFoods={fetchFoods} />
    </div>
  );
};

export default AddFoodPage;

