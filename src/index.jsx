import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import ProductList from './components/ProductList';
import NewProduct from './components/NewProduct';
import initialData from './data.json';

let productsInMemory = [...initialData];

const productsLoader = () => {
  return productsInMemory;
};

const addProductAction = async ({ request }) => {
  const formData = await request.formData();
  const newProduct = Object.fromEntries(formData);
  
  const newId = Math.max(...productsInMemory.map(p => p.id)) + 1;
  const productWithId = { ...newProduct, id: newId, price: parseFloat(newProduct.price) };
  
  productsInMemory.push(productWithId);
  
  return redirect('/');
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductList />,
        loader: productsLoader,
      },
      {
        path: 'produtos/novo',
        element: <NewProduct />,
        action: addProductAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);