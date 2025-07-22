import { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/Button.css';
import ProductDeck from './ProductDeck';
import data from './data.json'

export default function App() {
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(data);
      return;
    }

    // const lowercasedSearchTerm = searchTerm.toLowerCase();
    const searchID = Number(searchTerm);

    const results = data.filter(product => {
    //  const matchesName = product.name.toLowerCase().includes(lowercasedSearchTerm);
    //  const matchesCategory = product.category && product.category.toLowerCase().includes(lowercasedSearchTerm);
    //  return matchesName || matchesCategory;
      return product.id === searchID;
    });

    setFilteredProducts(results);
  }, [searchTerm]);

  const handlePendingSearchChange = (event) => {
    setPendingSearchTerm(event.target.value);
  };

  const handleFilterClick = () => {
    setSearchTerm(pendingSearchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFilterClick();
    }
  };

  return <>
    <div className="app-wrapper">
      <h1>Catálogo de Produtos</h1>
      <div className="filter-controls">
        <input
          placeholder="Filtrar por código..."
          value={pendingSearchTerm}
          onChange={handlePendingSearchChange}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button onClick={handleFilterClick} className="button filter-button">
          Filtrar
        </button>
      </div>
      <ProductDeck products={filteredProducts} />
    </div>
  </>
}
