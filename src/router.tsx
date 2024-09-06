import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Products } from './pages/Products';
import { NewProduct } from './pages/NewProduct';
import { editProductAction, newProductAction } from './pages/formActions';
import { EditProduct } from './pages/EditProduct';
import { editDataLoader, productsLoader } from './pages/formLoaders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader
      },
      {
        path: 'products/add',
        element: <NewProduct />,
        action: newProductAction
      },
      {
        path: 'products/:id/edit',
        element: <EditProduct />,
        loader: editDataLoader,
        action: editProductAction
      }
    ]
  }
])