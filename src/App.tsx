// App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/dashboard.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;