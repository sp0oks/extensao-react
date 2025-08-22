import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';

import ProductFilter from './ProductFilter';
import ProductDeck from './ProductDeck';

import '../../styles/ProductList.css';

export default function ProductList() {
  const allProducts = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm === '') {
        setFilteredProducts(allProducts);
        return;
      }

      const results = allProducts.filter(product => product.code.toString().startsWith(searchTerm));
      setFilteredProducts(results);
    }, 500);

    return () => clearTimeout(timeoutId);
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