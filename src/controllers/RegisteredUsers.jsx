import React from "react";

const RegisteredUsers = ({ registeredUsers }) => {
  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {registeredUsers.map((user) => (
          <li key={user._id}>
            {user.name} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegisteredUsers;
