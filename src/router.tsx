import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Products } from './pages/Products';
import { NewProduct } from './pages/NewProduct';
import { newProductAction } from './pages/formActions';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />
      },
      {
        path: 'products/add',
        element: <NewProduct />,
        action: newProductAction
      }
    ]
  }
])