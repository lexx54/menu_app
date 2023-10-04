import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from './router';
import Layout from './pages/Layout';

// makes sure to convert the element into a FC component
const router = createBrowserRouter(
  routes.map(route => ({ ...route, element: (<Layout children={<route.element />} />) }))
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

