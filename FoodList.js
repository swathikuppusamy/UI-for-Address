import React from 'react';
import FoodItem from './FoodItem';

const FoodList = ({ foods, fetchFoods, setCurrentFood }) => {
  return (
    <div>
      {foods.map((food) => (
        <FoodItem key={food._id} food={food} fetchFoods={fetchFoods} setCurrentFood={setCurrentFood} />
      ))}
    </div>
  );
};

export default FoodList;
