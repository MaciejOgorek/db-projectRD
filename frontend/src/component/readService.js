import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';

export default function ReadService() {
    const [APIData, setAPIData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/service`)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/service`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/service/${id}`)
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
          .put(`http://127.0.0.1:8000/service/${selectedItem.ServiceID}`, selectedItem)
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
                        <Table.HeaderCell>ServiceID</Table.HeaderCell>
                        <Table.HeaderCell>ClientID</Table.HeaderCell>
                        <Table.HeaderCell>EmployeeID</Table.HeaderCell>
                        <Table.HeaderCell>TransactionID</Table.HeaderCell>
                        <Table.HeaderCell>ServiceType</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.ServiceID}</Table.Cell>
                                <Table.Cell>{data.ClientID}</Table.Cell>
                                <Table.Cell>{data.EmployeeID}</Table.Cell>
                                <Table.Cell>{data.TransactionID}</Table.Cell>
                                <Table.Cell>{data.ServiceType}</Table.Cell>
                                <button onClick={() => onDelete(data.UserID)}>Delete</button>
                                <button onClick={() => onEdit(data)}>Edit</button>
                            </Table.Row>
                        )
                    })}
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
            <label>ClientID</label>
            <input
              type="text"
              name="ClientID"
              value={selectedItem.ClientID}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>EmployeeID</label>
            <input
              type="text"
              name="EmployeeID"
              value={selectedItem.EmployeeID}
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
    )
    
}