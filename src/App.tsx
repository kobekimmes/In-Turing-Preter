import React from 'react';
import logo from './logo.svg';
import Tape from './Tape';
import './App.css';

function App() {
  return (
    <div className='app'>
      <div className="tape-container">
        
        <Tape tapeAlphabet={["0","1"]} />
        
      </div>
    </div>
  );
}

export default App;
