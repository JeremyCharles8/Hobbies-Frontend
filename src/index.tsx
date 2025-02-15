import react from 'react';
import reactDom from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Root from './components/elements/MainLayout';
import Home from './components/pages/Home';
import Signup from './components/pages/Registration';
import './components/styles/index.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />
      <Route path='signup' element={<Signup />} />
    </Route>
));

const queryClient = new QueryClient();

const root = reactDom.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <react.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router= {router} />
    </QueryClientProvider>
  </react.StrictMode>
);
