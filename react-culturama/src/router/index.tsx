import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Events from '../pages/Events';
import Categories from '../pages/Categories';
import EventDetail from '../pages/EventDetail';
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'eventos',
        element: <Events />
      },
      {
        path: 'categorias',
        element: <Categories />
      },
      {
        path: 'categorias/:categoryId',
        element: <Categories />
      },
      {
        path: 'eventos/:eventId',
        element: <EventDetail />
      },
      {
        path: 'buscar',
        element: <Search />
      }
    ]
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;