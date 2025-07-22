import { useState, useEffect } from 'react';
import './styles/App.css';
import ProductFilter from './ProductFilter';
import ProductDeck from './ProductDeck';
import data from './data.json'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(data);
      return;
    }

    // const lowercasedSearchTerm = searchTerm.toLowerCase();
    const searchID = parseInt(searchTerm, 10);
    
    if (isNaN(searchID)) {
      setFilteredProducts([]);
    } else {
      const results = data.filter(product => {
      //  const matchesName = product.name.toLowerCase().includes(lowercasedSearchTerm);
      //  const matchesCategory = product.category && product.category.toLowerCase().includes(lowercasedSearchTerm);
      //  return matchesName || matchesCategory;
        return product.id === searchID;
      });
      setFilteredProducts(results);
    }
  }, [searchTerm]);

  const handleFilterChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return <>
    <div className="app-wrapper">
      <h1>Catálogo de Produtos</h1>
      <ProductFilter onFilter={handleFilterChange} />
      <ProductDeck products={filteredProducts} />
    </div>
  </>
}
