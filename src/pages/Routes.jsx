import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

import Layout from '../layout';
import ProductList from './ProductList';
import NewProduct from './NewProduct';

const API_URL = 'http://localhost:3001/api/product'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'produtos',
        element: <ProductList />,
        loader: async () => {
          try {
            const response = await axios.get(API_URL);
            console.log(response.data);
            return (response.data).map(product => ({
              ...product,
              code: product.id,
            }));
          } catch (error) {
            console.log(error);
            return [];
          }
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          try {
            return await axios.post(API_URL, {
              name: formData.get('name'),
              description: formData.get('description'),
              price: formData.get('price'),
              category: formData.get('category'),
              pictureUrl: formData.get('picture-url'),
            });
          } catch (error) {
            console.log(error);
            alert(error);
          }
        }
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