import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MockInterview from './pages/MockInterview';
import ModeSelect from './pages/ModeSelect';
import Editor from './pages/Editor';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashboard';
import Collab from './pages/Collab';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mode" element={<ModeSelect />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/mock" element={<MockInterview />} /> 
        <Route path="/dashboard" element={<Dashboard />} />     
        <Route path="/collab" element={<Collab />} />
      </Routes>
    </Router>
  );
}

export default App;