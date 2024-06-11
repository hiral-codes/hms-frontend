import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Import the AuthContext
import { Link } from 'react-router-dom';

function profile() {
  const { user,logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (userDataFromLocalStorage) {
      setUserData(userDataFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUserData(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Welcome to the profile</h2>
      <div>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <Link to={"/profile"}>Profile</Link>
        {/* Add more user details here */}
      </div>
    </div>
  );
}

export default profile;
