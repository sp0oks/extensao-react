import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import ProductFilter from './ProductFilter';
import ProductDeck from './ProductDeck';

import '../../styles/ProductList.css';

export default function ProductList() {
  const allProducts = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(allProducts);
      return;
    }
    const searchID = parseInt(searchTerm, 10);
    
    if (isNaN(searchID)) {
      setFilteredProducts([]);
    } else {
      const results = allProducts.filter(product => product.id === searchID);
      setFilteredProducts(results);
    }
  }, [searchTerm, allProducts]);

  const handleFilterChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="main-content-wrapper">
      <ProductFilter onFilter={handleFilterChange} />
      <ProductDeck products={filteredProducts} />
    </div>
  );
}