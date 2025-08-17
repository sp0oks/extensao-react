import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '../layout';
import ProductList from './ProductList';
import NewProduct from './NewProduct';

import initialData from '../data.json';

/*
const addProductAction = async ({ request }) => {
  const formData = await request.formData();
  const newProduct = Object.fromEntries(formData);
  
  const newId = Math.max(...productsInMemory.map(p => p.id)) + 1;
  const productWithId = { ...newProduct, id: newId, price: parseFloat(newProduct.price) };
  
  productsInMemory.push(productWithId);
  
  return redirect('/');
};
*/

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'produtos',
        element: <ProductList />,
        loader: async () => {
          return initialData.map(mockProduct => ({
            ...mockProduct,
            code: mockProduct.id,
            photo: mockProduct.pictureUrl,
          }));
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          const code = formData.get('code');
        },
      },
      {
        path: 'produtos/novo',
        element: <NewProduct />,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}