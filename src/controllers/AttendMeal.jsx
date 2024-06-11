// components/AttendMeal.js
import React from 'react';
import axios from '../utils/api';

const AttendMeal = () => {
  const handleAttend = async () => {
    try {
      await axios.post('/api/student/attend-meal');
      alert('Attendance marked');
    } catch (err) {
      alert('Error marking attendance');
    }
  };

  return (
    <div>
      <h2>Attend Meal</h2>
      <button onClick={handleAttend}>Attend Meal</button>
    </div>
  );
};

export default AttendMeal;
