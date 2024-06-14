import React from 'react';
import { deleteFood } from '../api';

const FoodItem = ({ food, fetchFoods, setCurrentFood }) => {
  const handleDelete = async () => {
    await deleteFood(food._id);
    fetchFoods();
  };

  const handleEdit = () => {
    setCurrentFood(food);
  };

  return (
    <div>
      <h2>{food.name}</h2>
      <p>Calories: {food.calories}</p>
      <p>Protein: {food.protein}g</p>
      <p>Fat: {food.fat}g</p>
      <p>Carbs: {food.carbs}g</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default FoodItem;
