import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateQR from './components/CreateQR';
import Dashboard from './components/Dashboard';
import QRDetails from './components/QRDetails';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/create" element={<CreateQR />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/qr/:id" element={<QRDetails />} />
        <Route path="/" element={<Navigate to="/homepage" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
