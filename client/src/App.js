import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Display from './Components/Display/Display';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="test">
          <NavBar />
        </div>
        <Display />
      </Router>
    </div>
  );
}

export default App;
