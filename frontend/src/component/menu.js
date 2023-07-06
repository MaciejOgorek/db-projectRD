import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import '../menu.css';
import Createuser from './createUser';
import ReadUser from './readUser';
import CreateService from './createService';
import Createpayment from './createPayment';
import Createequipment from './createEquipment';
import ReadService from './readService';
import ReadPayment from './readPayment';
import ReadEquipment from './readEquipment';
import ReadOperation from './readOperation';
import Createoperation from './createOperation';

const Menu = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showuseraddForm, setuseraddShowForm] = useState(false);
  const [showserviceaddForm, setserviceaddShowForm] = useState(false);
  const [showpaymentaddForm, setpaymentaddShowForm] = useState(false);
  const [showequipmentaddForm, setequipmentaddShowForm] = useState(false);
  const [showoperationaddForm, setoperationaddShowForm] = useState(false);
  const [showuserreadForm, setuserreadShowForm] = useState(false);
  const [showservicereadForm, setservicereadShowForm] = useState(false);
  const [showpaymentreadForm, setpaymentreadShowForm] = useState(false);
  const [showequipmentreadForm, setequipmentreadShowForm] = useState(false);
  const [showoperationreadForm, setoperationreadShowForm] = useState(false);
  const [chosenOperation, setchosenOperation] = useState(null);
  const handleaddButtonClick = () => {
    setShowButtons(false);
    if (chosenOperation === 'user')
      setuseraddShowForm(true);
    else if(chosenOperation ==='service')
      setserviceaddShowForm(true);
    else if (chosenOperation === 'equipment')
      setequipmentaddShowForm(true);
    else if (chosenOperation === 'payment')
      setpaymentaddShowForm(true);
    else if (chosenOperation === 'operation')
      setoperationaddShowForm(true);
  };
  const handlesearchButtonClick = () => {
    setShowButtons(false);
    if (chosenOperation === 'user')
      setuserreadShowForm(true);
    else if(chosenOperation ==='service')
      setservicereadShowForm(true);
    else if (chosenOperation === 'equipment')
      setequipmentreadShowForm(true);
    else if (chosenOperation === 'payment')
      setpaymentreadShowForm(true);
    else if (chosenOperation === 'operation')
      setoperationreadShowForm(true);
  };
  const handleuserButtonClick = () =>{
    setShowButtons(true);
    setuseraddShowForm(false);
    setuserreadShowForm(false);
    setserviceaddShowForm(false);
    setservicereadShowForm(false);
    setequipmentaddShowForm(false);
    setequipmentreadShowForm(false);
    setpaymentaddShowForm(false);
    setpaymentreadShowForm(false);
    setoperationaddShowForm(false);
    setoperationreadShowForm(false);
    setchosenOperation('user');
  };
  const handleserviceButtonClick = () =>{
    setShowButtons(true);
    setuseraddShowForm(false);
    setuserreadShowForm(false);
    setserviceaddShowForm(false);
    setservicereadShowForm(false);
    setequipmentaddShowForm(false);
    setequipmentreadShowForm(false);
    setpaymentaddShowForm(false);
    setpaymentreadShowForm(false);
    setoperationaddShowForm(false);
    setoperationreadShowForm(false);
    setchosenOperation('service');
  };
  const handleequipmentButtonClick = () =>{
    setShowButtons(true);
    setuseraddShowForm(false);
    setuserreadShowForm(false);
    setserviceaddShowForm(false);
    setservicereadShowForm(false);
    setequipmentaddShowForm(false);
    setequipmentreadShowForm(false);
    setpaymentaddShowForm(false);
    setpaymentreadShowForm(false);
    setoperationaddShowForm(false);
    setoperationreadShowForm(false);
    setchosenOperation('equipment');
  };
  const handleoperationButtonClick = () =>{
    setShowButtons(true);
    setuseraddShowForm(false);
    setuserreadShowForm(false);
    setserviceaddShowForm(false);
    setservicereadShowForm(false);
    setequipmentaddShowForm(false);
    setequipmentreadShowForm(false);
    setpaymentaddShowForm(false);
    setpaymentreadShowForm(false);
    setoperationaddShowForm(false);
    setoperationreadShowForm(false);
    setchosenOperation('operation');
  };
  const handlepaymentButtonClick = () =>{
    setShowButtons(true);
    setuseraddShowForm(false);
    setuserreadShowForm(false);
    setserviceaddShowForm(false);
    setservicereadShowForm(false);
    setequipmentaddShowForm(false);
    setequipmentreadShowForm(false);
    setpaymentaddShowForm(false);
    setpaymentreadShowForm(false);
    setoperationaddShowForm(false);
    setoperationreadShowForm(false);
    setchosenOperation('payment');
  };

  return (
    <div className="menu-container">
      <div className="menu-bar">
        <div className="menu-items">
          <button className="menu-button" onClick={handleuserButtonClick}>
            <Link to="/user" className="menu-link">Użytkownicy</Link>
          </button>
          <button className="menu-button" onClick={handleserviceButtonClick}>
            <Link to="/service" className="menu-link">Usługi</Link>
          </button>
          <button className="menu-button" onClick={handleequipmentButtonClick}>
            <Link to="/equipment" className="menu-link">Sprzęt</Link>
          </button>
          <button className="menu-button" onClick={handleoperationButtonClick}>
            <Link to="/operation" className="menu-link">Wynajem</Link>
          </button>
          <button className="menu-button" onClick={handlepaymentButtonClick}>
            <Link to="/payment" className="menu-link">Płatności</Link>
          </button>
        </div>
      </div>

      {showButtons && (
        <div className="button-container">
          <button className="sub-button" onClick={handleaddButtonClick}>Add</button>
          <button className="sub-button" onClick={handlesearchButtonClick}>Search</button>
        </div>
      )}
      <div className="form-container">  
      {showuseraddForm && <Createuser />}
      {showuserreadForm &&<ReadUser />}
      {showserviceaddForm && <CreateService/>}
      {showpaymentaddForm &&<Createpayment />}
      {showequipmentaddForm && <Createequipment />}
      {showservicereadForm &&<ReadService/>}
      {showpaymentreadForm && <ReadPayment />}
      {showequipmentreadForm && <ReadEquipment />}
      {showoperationreadForm && <ReadOperation/>}
      {showoperationaddForm && <Createoperation />}
      </div>
      
    </div>
  );
};
export default Menu;