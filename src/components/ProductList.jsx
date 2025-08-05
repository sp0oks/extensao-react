import { useState, useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import ProductFilter from './ProductFilter';
import ProductDeck from './ProductDeck';

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
    <>
      <Link to="/produtos/novo">
        <button className="button new-product-button">Novo produto</button>
      </Link>
      <ProductFilter onFilter={handleFilterChange} />
      <ProductDeck products={filteredProducts} />
    </>
  );
}