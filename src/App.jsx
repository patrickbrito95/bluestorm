import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MedicationList from './pages/MedicationList';
import CreateMedication from './pages/CreateMedication';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/medication-list" element={<MedicationList />} />
        <Route path="/create-medication" element={<CreateMedication />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
