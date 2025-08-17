import { useState } from 'react';

import ProductAction from './ProductAction';

import '../../styles/ProductFilter.css';


export default function ProductFilter({ onFilter }) {
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');

  const handlePendingSearchChange = (event) => {
    setPendingSearchTerm(event.target.value);
  };

  const handleFilterClick = () => {
    onFilter(pendingSearchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFilterClick();
    }
  }

  return <div className="filter-controls">
      <input
        placeholder="Filtrar por código..."
        value={pendingSearchTerm}
        onChange={handlePendingSearchChange}
        onKeyDown={handleKeyPress}
        className="search-input"
      />
      <ProductAction type="filter-button" action={handleFilterClick} text='Filtrar' />
  </div>
}