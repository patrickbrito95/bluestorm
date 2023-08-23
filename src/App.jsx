import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MedicationList from './pages/CreateMedication';
import CreateMedication from './pages/MedicationList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/medication-list" element={<MedicationList />} />
        <Route path="/create-medication" element={<CreateMedication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
