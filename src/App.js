import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MockInterview from './pages/MockInterview';
import ModeSelect from './pages/ModeSelect';
import Editor from './pages/Editor';
import Feedback from './pages/Feedback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mode" element={<ModeSelect />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/mock" element={<MockInterview />} />      
      </Routes>
    </Router>
  );
}

export default App;