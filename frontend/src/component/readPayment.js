import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

export default function ReadPayment() {
  const [APIData, setAPIData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [ClientID, setClientID] = useState('');
  const [EmployeeID, setEmployeeID] = useState('');

  useEffect(() => {
    getData();
    fetchUsers();
    fetchEmployees();
  }, []);

  const getData = () => {
    axios
      .get('http://127.0.0.1:8000/payment')
      .then((response) => {
        setAPIData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  };

  const onDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/payment/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error('Error deleting payment:', error);
      });
  };

  const onEdit = (data) => {
    setSelectedItem(data);
    setClientID(data.ClientID);
    setEmployeeID(data.EmployeeID);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

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

  const handleUpdate = () => {
    axios
      .put(`http://127.0.0.1:8000/payment/${selectedItem.PaymentID}`, selectedItem)
      .then((response) => {
        console.log('Item updated successfully:', response.data);
        setSelectedItem(null); // Clear the selectedItem state
        getData();
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>PaymentID</Table.HeaderCell>
            <Table.HeaderCell>ClientID</Table.HeaderCell>
            <Table.HeaderCell>EmployeeID</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>PaymentType</Table.HeaderCell>
            <Table.HeaderCell>Available actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {APIData.map((data) => (
            <Table.Row key={data.PaymentID}>
              <Table.Cell>{data.PaymentID}</Table.Cell>
              <Table.Cell>{data.ClientID}</Table.Cell>
              <Table.Cell>{data.EmployeeID}</Table.Cell>
              <Table.Cell>{data.Amount}</Table.Cell>
              <Table.Cell>{data.PaymentType}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => onDelete(data.PaymentID)}>Delete</Button>
                <Button onClick={() => onEdit(data)}>Edit</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {selectedItem && (
        <Form>
          <Form.Field>
            <label>PaymentID</label>
            <input name="PaymentID" value={selectedItem.PaymentID} disabled />
          </Form.Field>
          <Form.Field>
            <label>Select a Client</label>
            <select value={ClientID} onChange={(e) => setClientID(e.target.value)}>
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
            <select value={EmployeeID} onChange={(e) => setEmployeeID(e.target.value)}>
              <option value="">Select</option>
              {employees.map((employee) => (
                <option key={employee.UserID} value={employee.UserID}>
                  {employee.FirstName} {employee.Surname} {employee.UserType}
                </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Amount</label>
            <input
              type="text"
              name="Amount"
              value={selectedItem.Amount}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>PaymentType</label>
            <select
              type="text"
              name="PaymentType"
              value={selectedItem.PaymentType}
              onChange={handleInputChange}
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
          </Form.Field>
          <Button onClick={handleUpdate} primary>
            Update
          </Button>
        </Form>
      )}
    </div>
  );
}
