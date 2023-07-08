import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';

export default function ReadOperation() {
    const [APIData, setAPIData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [EmployeeID, setEmployeeID] = useState('');
    const [ClientID, setClientID] = useState('');
    const [EquipmentID, setEquipmentID] = useState('');
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/operation`)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/operation`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/operation/${id}`)
        .then(() => {
            getData();
        })
    }
    const onEdit = (data) => {
        setSelectedItem(data);
      };
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedItem((prevItem) => ({
          ...prevItem,
          [name]: value,
        }));
      };
    
      const handleUpdate = () => {
        axios
          .put(`http://127.0.0.1:8000/operation/${selectedItem.OperationID}`, selectedItem)
          .then((response) => {
            console.log('Item updated successfully:', response.data);
            // Perform any necessary actions after successful update
            setSelectedItem(null); // Clear the selectedItem state
            getData();
          })
          .catch((error) => {
            console.error('Error updating item:', error);
            // Handle any errors that occurred during the update
          });
      };
      useEffect(() => {
        fetchUsers();
        fetchEmployees();
        fetchEquipment();
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
    
      const fetchEquipment = () => {
        axios
          .get('http://127.0.0.1:8000/equipment')
          .then((response) => {
            setEquipment(response.data);
          })
          .catch((error) => {
            console.error('Error fetching equipment:', error);
          });
      };

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>OperationID</Table.HeaderCell>
                        <Table.HeaderCell>EmployeeID</Table.HeaderCell>
                        <Table.HeaderCell>ClientID</Table.HeaderCell>
                        <Table.HeaderCell>EquipmentID</Table.HeaderCell>
                        <Table.HeaderCell>OperationStart</Table.HeaderCell>
                        <Table.HeaderCell>OperationEnd</Table.HeaderCell>
                        <Table.HeaderCell>TransactionID</Table.HeaderCell>
                        <Table.HeaderCell>Available actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.OperationID}</Table.Cell>
                                <Table.Cell>{data.EmployeeID}</Table.Cell>
                                <Table.Cell>{data.ClientID}</Table.Cell>
                                <Table.Cell>{data.EquipmentID}</Table.Cell>
                                <Table.Cell>{data.OperationStart}</Table.Cell>
                                <Table.Cell>{data.OperationEnd}</Table.Cell>
                                <Table.Cell>{data.TransactionID}</Table.Cell>
                                <Button onClick={() => onDelete(data.OperationID)}>Delete</Button>
                                <Button onClick={() => onEdit(data)}>Edit</Button>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            {selectedItem && (
        <Form>
          <Form.Field>
            <label>OperationID</label>
            <input
              name="OperationID"
              value={selectedItem.OperationID}
              disabled
            />
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
          <label>EquipmentID</label>
          <select value={EquipmentID} onChange={(e) => setEquipmentID(e.target.value)}>
            <option value="">Select</option>
            {equipment.map((equipment) => (
              <option key={equipment.EquipmentID} value={equipment.EquipmentID}>
                {equipment.EquipmentType} {JSON.stringify(equipment.EquipmentDESC)}
              </option>
            ))}
          </select>
        </Form.Field>
          <Form.Field>
            <label>OperationStart</label>
            <input
              type="text"
              name="OperationStart"
              value={selectedItem.OperationStart}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>OperationEnd</label>
            <input
              type="text"
              name="OperationEnd"
              value={selectedItem.OperationEnd}
              onChange={handleInputChange}
            />
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
          <Button onClick={handleUpdate} primary>
            Update
          </Button>
        </Form>
      )}
            
        </div>
    )
    
}