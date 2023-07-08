import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';

export default function ReadService() {
  const [APIData, setAPIData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [ClientID, setClientID] = useState('');
  const [EmployeeID, setEmployeeID] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/service')
      .then((response) => {
        console.log(response.data);
        setAPIData(response.data);
      });
  }, []);

  const getData = () => {
    axios.get('http://127.0.0.1:8000/service')
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  const onDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/service/${id}`)
      .then(() => {
        getData();
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

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/service/${selectedItem.ServiceID}`, selectedItem)
      .then((response) => {
        console.log('Item updated successfully:', response.data);
        setSelectedItem(null);
        getData();
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchEmployees();
  }, []);

  const fetchUsers = () => {
    axios.get('http://127.0.0.1:8000/user')
      .then((response) => {
        const filteredUsers = response.data.filter((user) => user.UserType === 'Client');
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const fetchEmployees = () => {
    axios.get('http://127.0.0.1:8000/user')
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
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ServiceID</Table.HeaderCell>
            <Table.HeaderCell>ClientID</Table.HeaderCell>
            <Table.HeaderCell>EmployeeID</Table.HeaderCell>
            <Table.HeaderCell>TransactionID</Table.HeaderCell>
            <Table.HeaderCell>ServiceType</Table.HeaderCell>
            <Table.HeaderCell>Available actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => (
            <Table.Row key={data.ServiceID}>
              <Table.Cell>{data.ServiceID}</Table.Cell>
              <Table.Cell>{data.ClientID}</Table.Cell>
              <Table.Cell>{data.EmployeeID}</Table.Cell>
              <Table.Cell>{data.TransactionID}</Table.Cell>
              <Table.Cell>{data.ServiceType}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => onDelete(data.ServiceID)}>Delete</Button>
                <Button onClick={() => onEdit(data)}>Edit</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {selectedItem && (
        <Form>
          <Form.Field>
            <label>ServiceID</label>
            <input
              name="ServiceID"
              value={selectedItem.ServiceID}
              disabled
            />
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
            <input
              type="text"
              name="TransactionID"
              value={selectedItem.TransactionID}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>ServiceType</label>
            <input
              type="text"
              name="ServiceType"
              value={selectedItem.ServiceType}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Button onClick={handleUpdate} primary>
            Update
          </Button>
        </Form>
      )}
    </div>
  );
}