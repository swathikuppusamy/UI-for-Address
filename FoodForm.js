import React, { useState, useEffect } from 'react';
import { addFood, updateFood } from '../api';

const FoodForm = ({ fetchFoods, currentFood, setCurrentFood }) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');

  useEffect(() => {
    if (currentFood) {
      setName(currentFood.name);
      setCalories(currentFood.calories);
      setProtein(currentFood.protein);
      setFat(currentFood.fat);
      setCarbs(currentFood.carbs);
    }
  }, [currentFood]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentFood) {
      await updateFood(currentFood._id, { name, calories, protein, fat, carbs });
      setCurrentFood(null);
    } else {
      await addFood({ name, calories, protein, fat, carbs });
    }
    fetchFoods();
    setName('');
    setCalories('');
    setProtein('');
    setFat('');
    setCarbs('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} required />
      </div>
      <div>
        <input type="number" placeholder="Protein" value={protein} onChange={(e) => setProtein(e.target.value)} required />
      </div>
      <div>
        <input type="number" placeholder="Fat" value={fat} onChange={(e) => setFat(e.target.value)} required />
      </div>
      <div>
        <input type="number" placeholder="Carbs" value={carbs} onChange={(e) => setCarbs(e.target.value)} required />
      </div>
      <button type="submit">{currentFood ? 'Update Food' : 'Add Food'}</button>
    </form>
  );
};

export default FoodForm;
