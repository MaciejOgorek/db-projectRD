import React  from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Menu from './component/menu';

 function App() {

  return (

    <Router>
    <div className="App">
      <div>
        <h1>Wypożyczalnia Nart</h1>
      </div>
      <div>
      <Menu />
      </div>
    </div>
    </Router>
  );
}

export default App;
