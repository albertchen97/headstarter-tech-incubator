import './App.css';
import React from 'react';
import Authentication from './components/Authentication';
import {Profile} from './components/Profile';


function App() {
  return (
    <div>
      <Authentication />
      <br/><br/>
      <Profile />
    </div>
  );
}

export default App;
