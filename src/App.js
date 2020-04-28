import React from 'react';
import './App.css';
import Nav from './Components/Nav'
import routes from './routes'

function App() {
  return (
    <div>
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
