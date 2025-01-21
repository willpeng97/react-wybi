// App.tsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/dashboard.css';
import './styles/sidebar.css';
import { router } from './Router';

const App: React.FC = () => {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;