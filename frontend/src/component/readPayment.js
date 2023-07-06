import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';

export default function ReadPayment() {
    const [APIData, setAPIData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/payment`)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/payment`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/payment/${id}`)
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
          .put(`http://127.0.0.1:8000/payment/${selectedItem.PaymentID}`, selectedItem)
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
                        <Table.HeaderCell>PaymentID</Table.HeaderCell>
                        <Table.HeaderCell>ClientID</Table.HeaderCell>
                        <Table.HeaderCell>EmployeeID</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>PaymentType</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.PaymentID}</Table.Cell>
                                <Table.Cell>{data.ClientID}</Table.Cell>
                                <Table.Cell>{data.EmployeeID}</Table.Cell>
                                <Table.Cell>{data.Amount}</Table.Cell>
                                <Table.Cell>{data.PaymentType}</Table.Cell>
                                <button onClick={() => onDelete(data.PaymentID)}>Delete</button>
                                <button onClick={() => onEdit(data)}>Edit</button>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            {selectedItem && (
        <Form>
          <Form.Field>
            <label>PaymentID</label>
            <input
              name="PaymentID"
              value={selectedItem.PaymentID}
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
    )
    
}