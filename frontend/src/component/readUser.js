import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';

export default function ReadUser() {
    const [APIData, setAPIData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/user`)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/user`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/user/${id}`)
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
          .put(`http://127.0.0.1:8000/user/${selectedItem.UserID}`, selectedItem)
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

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>UserID</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>UserType</Table.HeaderCell>
                        <Table.HeaderCell>Available actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.UserID}</Table.Cell>
                                <Table.Cell>{data.FirstName}</Table.Cell>
                                <Table.Cell>{data.Surname}</Table.Cell>
                                <Table.Cell>{data.UserType}</Table.Cell>
                                <Button onClick={() => onDelete(data.UserID)}>Delete</Button>
                                <Button onClick={() => onEdit(data)}>Edit</Button>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            {selectedItem && (
        <Form>
          <Form.Field>
            <label>ID</label>
            <input
              name="UserID"
              value={selectedItem.UserID}
              disabled
            />
          </Form.Field>
          <Form.Field>
            <label>Name</label>
            <input
              type="text"
              name="FirstName"
              value={selectedItem.FirstName}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Surname</label>
            <input
              type="text"
              name="Surname"
              value={selectedItem.Surname}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>UserType</label>
            <select
              type="text"
              name="UserType"
              value={selectedItem.UserType}
              onChange={handleInputChange}
            >
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
              <option value="Client">Client</option>
            </select>
          </Form.Field>
          <Button onClick={handleUpdate} primary>
            Update
          </Button>
        </Form>
      )}
            
        </div>
    )
    
}