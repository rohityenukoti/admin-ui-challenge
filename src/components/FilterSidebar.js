import React, { useState } from 'react';
import '../styles/FilterSidebar.css';

const FilterSidebar = ({ isOpen, onSearch, onClose }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // console.log('Rendering FilterSidebar. Is open:', isOpen);

  const handleApplyFilters = () => {
    const combinedFilter = `${nameFilter} ${emailFilter} ${roleFilter}`.trim();
    onSearch(combinedFilter);
  };

  return (
    <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-sidebar" onClick={onClose}>×</button>
      <h2>Filters</h2>
      <div className="filter-group">
        <label htmlFor="name-filter">Name:</label>
        <input
          id="name-filter"
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="Filter by name"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="email-filter">Email:</label>
        <input
          id="email-filter"
          type="text"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          placeholder="Filter by email"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="role-filter">Role:</label>
        <select
          id="role-filter"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
      </div>
      <button onClick={handleApplyFilters} className="apply-filters">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;