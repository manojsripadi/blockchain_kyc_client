import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from './Dashboard';
import Login from './login';
import { BrowserRouter } from 'react-router-dom';


const Main = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
};

export default Main;