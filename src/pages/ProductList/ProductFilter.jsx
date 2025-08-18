import { useState } from 'react';

import '../../styles/ProductFilter.css';


export default function ProductFilter({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    setSearchTerm(numericValue);
    onFilter(numericValue);
  };

  return <div className="filter-controls">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Filtrar por código..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
  </div>
}