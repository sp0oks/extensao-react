// src/contexts/ProductContext.jsx
import React, { createContext, useState, useContext } from 'react';
import initialData from '../data.json'; // Seus dados iniciais

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(initialData);

  const addProduct = (newProduct) => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const productWithId = { ...newProduct, id: newId };
    setProducts(prevProducts => [...prevProducts, productWithId]);
  };

  const value = {
    products,
    addProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};