import React from 'react';
import '../styles/UserTable.css';

const UserTable = ({ users, onEdit, onDelete, selectedUsers, onSelectUser }) => {
  // console.log('Rendering UserTable with users:', users);

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      onSelectUser(users.map(user => user.id));
    } else {
      onSelectUser([]);
    }
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedUsers.length === users.length && users.length > 0}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className={selectedUsers.includes(user.id) ? 'selected' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => onSelectUser(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => onEdit(user.id)} className="edit">Edit</button>
                <button onClick={() => onDelete(user.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;