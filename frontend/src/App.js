/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/home/home.component';
import NavBar from './routes/nav-bar/nav-bar.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        {/* <Route path="checkout" element={<Checkout />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>

  );
}

export default App;
