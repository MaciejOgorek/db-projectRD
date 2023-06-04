import React  from 'react';
import './App.css';
import Dropdown from "./Dropdown";
import {BrowserRouter as Router} from 'react-router-dom'
import Createuser from './component/create';

function handleSelectChange(event) {

  var selectElement = event.target;

  var value = selectElement.value;
  
}
 function App() {

  const options=[
      {value:"GET", label:"GET"},
      {value:"POST", label:"POST"},
      {value:"PUT", label:"PUT"},
      {value:"DELETE",label:"DELETE"}
      
  ]
  const options1=[
    {value:"Payment", label:"Payment"},
    {value:"User", label:"User"},
    {value:"Equipment", label:"Equipment"},
    {value:"Service",label:"Service"},
    {value:"Operation", label:"Operation"}
    
]
  return (

    <Router>
    <div className="App">
      <div>
        <h1>Wypożyczalnia Nart</h1>

      </div>
      <div>
        <Dropdown placeHolder = "Select operation"options={options}/>
      </div>
      <div>
        <Dropdown placeHolder={"SelectTable"}options={options1}/>
      </div>
      <div>
        {/* <select onchange="handleSelectChange(event)">
          <option value="1">one</option>
          <option value="2">two</option>
        </select> */}
      </div>
      <div>
        <Createuser />
      </div>
    </div>
    </Router>
  );
}

export default App;
