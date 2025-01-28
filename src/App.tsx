import React from 'react';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "tabulator-tables/dist/css/tabulator_materialize.min.css";
// import './styles/tabulator_style.css';
import './styles/global.css';
import { router } from './Router';
import { AuthProvider } from './auth/AuthProvider';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
