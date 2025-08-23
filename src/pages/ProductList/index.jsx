import { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';

import { useDebounce } from '../../hooks/useDebounce';

import ProductFilter from './ProductFilter';
import ProductDeck from './ProductDeck';
import EmptyDeck from './EmptyDeck';

import '../../styles/ProductList.css';

export default function ProductList() {
  const initialProducts = useLoaderData();
  const [products, setProducts] = useState(initialProducts); 
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm) {
      return products;
    }
    
    return products.filter(product => product.code.toString().startsWith(debouncedSearchTerm));
  }, [products, debouncedSearchTerm]);

  const handleProductUpdate = (updatedProduct) => {
    const newProducts = products.map(p =>
        p.code === updatedProduct.code ? updatedProduct : p
    );
    setProducts(newProducts);
  };

  const handleProductDelete = (productId) => {
    const newProducts = products.filter(p => p.code !== productId);
    setProducts(newProducts);
  };


  if (initialProducts.length === 0) return (
    <div className="main-content-wrapper">
      <ProductFilter onFilter={setSearchTerm} />
      <EmptyDeck />
    </div>
  );

  return (
    <div className="main-content-wrapper">
      <ProductFilter onFilter={setSearchTerm} />  
      <ProductDeck products={filteredProducts}
        onSave={handleProductUpdate}
        onDelete={handleProductDelete}
      />
    </div>
  );
}