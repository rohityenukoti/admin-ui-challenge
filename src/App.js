import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import UserGrid from './components/UserGrid';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import FilterSidebar from './components/FilterSidebar';
import { fetchUsers } from './api/userApi';
import './styles/App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('table');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const usersPerPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
    };
    loadUsers();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = users.filter(user =>
      Object.values(user).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  // console.log('Filtered users:', filteredUsers);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewModeChange = () => {
    setViewMode(prevMode => prevMode === 'table' ? 'grid' : 'table');
  };

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers(prevSelected => 
      prevSelected.includes(userId)
        ? prevSelected.filter(id => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(user => !selectedUsers.includes(user.id));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedUsers([]);
  };

  // console.log('Selected users:', selectedUsers);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className={`app ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <FilterSidebar isOpen={sidebarOpen} onSearch={handleSearch} onClose={toggleSidebar} />
      <div className="main-content">
        <div className="top-controls">
          <button onClick={toggleSidebar} className="sidebar-toggle">
            {sidebarOpen ? 'Close Filters' : 'Open Filters'}
          </button>
          <SearchBar onSearch={handleSearch} />
        </div>
        <button onClick={handleViewModeChange} className="view-mode-toggle">
          Switch to {viewMode === 'table' ? 'Grid' : 'Table'} View
        </button>
        {viewMode === 'table' ? (
          <UserTable 
            users={currentUsers} 
            onEdit={() => {}} // Implement edit functionality
            onDelete={() => {}} // Implement delete functionality
            selectedUsers={selectedUsers}
            onSelectUser={handleUserSelection}
          />
        ) : (
          <UserGrid 
            users={currentUsers} 
            onEdit={() => {}} // Implement edit functionality
            onDelete={() => {}} // Implement delete functionality
            selectedUsers={selectedUsers}
            onSelectUser={handleUserSelection}
          />
        )}
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
          onPageChange={handlePageChange}
        />
        <button onClick={handleDeleteSelected} className="delete-selected">
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default App;