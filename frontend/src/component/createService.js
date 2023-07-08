import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function CreateService() {
    const[ServiceID,setserviceID] = useState('');
    const [ClientID, setClientID] = useState('');
    const [EmployeeID, setEmployeeID] = useState('');
    const [TransactionID, settransactionID] = useState('');
    const [ServiceType, setservicetype] = useState('');
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [Amount, setAmount] = useState('');
    const [PaymentType, setPaymentType] = useState('');

    const postData = () => {
        axios.post(`http://127.0.0.1:8000/service`, {
            ServiceID,
            ClientID,
            EmployeeID,
            TransactionID,
            ServiceType
        })
        axios.post(`http://127.0.0.1:8000/payment`, {
            TransactionID,
            ClientID,
            EmployeeID,
            Amount,
            PaymentType
        })
    }
    useEffect(() => {
        fetchUsers();
        fetchEmployees();
      }, []);
    
      const fetchUsers = () => {
        axios
          .get('http://127.0.0.1:8000/user')
          .then((response) => {
            const filteredUsers = response.data.filter((user) => user.UserType === 'Client');
            setUsers(filteredUsers);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      };
    
      const fetchEmployees = () => {
        axios
          .get('http://127.0.0.1:8000/user')
          .then((response) => {
            const filteredEmployees = response.data.filter((employee) => employee.UserType === 'Employee');
            setEmployees(filteredEmployees);
          })
          .catch((error) => {
            console.error('Error fetching employees:', error);
          });
      };
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>ServiceID</label>
                    <input placeholder='ServiceID' onChange={(e)=>setserviceID(e.target.value)} disabled/>
                </Form.Field>
                <Form.Field>
          <label>Select a Client</label>
          <select
            value={ClientID}
            onChange={(e) => setClientID(e.target.value)}
          >
            <option value="">Select</option>
            {users.map((user) => (
              <option key={user.UserID} value={user.UserID}>
                {user.FirstName} {user.Surname} {user.UserType}
              </option>
            ))}
          </select>
        </Form.Field>
        <Form.Field>
          <label>Select an Employee</label>
          <select
            value={EmployeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
          >
            <option value="">Select</option>
            {employees.map((employee) => (
              <option key={employee.UserID} value={employee.UserID}>
                {employee.FirstName} {employee.Surname} {employee.UserType}
              </option>
            ))}
          </select>
        </Form.Field>
                <Form.Field>
                    <label>TransactionID</label>
                    <input placeholder='TransactionID' onChange={(e)=>settransactionID(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>ServiceType</label>
                    <input placeholder='ServiceType' onChange={(e)=>setservicetype(e.target.value)}/>
                </Form.Field>
                <Form.Field>
          <label>Amount</label>
          <input
            placeholder="Amount"
            value={Amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>PaymentType</label>
          <select
            placeholder="PaymentType"
            value={PaymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
          </select>
        </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}