import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';

import Layout from '../layout';
import ProductList from './ProductList';
import NewProduct from './NewProduct';
import apiClient from '../api/apiClient';

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
            const response = await apiClient.get(`${process.env.REACT_APP_API_URL}/produtos`);
            console.log(response.data);
            const products = (response.data).map(product => ({
              ...product,
              code: product.id,
            }));

            products.sort((a,b) => a.code - b.code);
            return products;
          } catch (error) {
            console.log(error);
            return [];
          }
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          try {
            await apiClient.post(`${process.env.REACT_APP_API_URL}/produtos`, {
              name: formData.get('name'),
              description: formData.get('description'),
              price: formData.get('price'),
              category: formData.get('category'),
              pictureUrl: formData.get('pictureUrl'),
            });
            return redirect('/produtos')
          } catch (error) {
            console.log(error);
            alert(error);
            return { error: "Falha ao criar produto" }
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