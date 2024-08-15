import React from 'react';
import '../styles/UserGrid.css';

const UserGrid = ({ users, onEdit, onDelete, selectedUsers, onSelectUser }) => {
  // console.log('Rendering UserGrid with users:', users);

  return (
    <div className="user-grid">
      {users.map(user => (
        <div key={user.id} className={`user-card ${selectedUsers.includes(user.id) ? 'selected' : ''}`}>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user.id)}
            onChange={() => onSelectUser(user.id)}
            className="user-select"
          />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>Role: {user.role}</p>
          <div className="user-actions">
            <button onClick={() => onEdit(user.id)} className="edit">Edit</button>
            <button onClick={() => onDelete(user.id)} className="delete">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserGrid;