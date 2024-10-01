// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store/store';
import App from './App.jsx';
import MainMenu from './components/Pages/MainMenu/MainMenu.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/Hobo-Traders">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/*" element={<MainMenu />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
