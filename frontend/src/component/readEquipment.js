import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';

export default function ReadEquipment() {
    const [APIData, setAPIData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/equipment`)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/equipment`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/equipment/${id}`)
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
          .put(`http://127.0.0.1:8000/equipment/${selectedItem.EquipmentID}`, selectedItem)
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
                        <Table.HeaderCell>EquipmentID</Table.HeaderCell>
                        <Table.HeaderCell>EquipmentType</Table.HeaderCell>
                        <Table.HeaderCell>EquipmentDESC</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.EquipmentID}</Table.Cell>
                                <Table.Cell>{data.EquipmentType}</Table.Cell>
                                <Table.Cell>{JSON.stringify(data.EquipmentDESC)}</Table.Cell>
                                <button onClick={() => onDelete(data.EquipmentID)}>Delete</button>
                                <button onClick={() => onEdit(data)}>Edit</button>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            {selectedItem && (
        <Form>
          <Form.Field>
            <label>EquipmentID</label>
            <input
              name="EquipmentID"
              value={selectedItem.EquipmentID}
              disabled
            />
          </Form.Field>
          <Form.Field>
            <label>EquipmentType</label>
            <input
              type="text"
              name="EquipmentType"
              value={selectedItem.EquipmentType}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>EquipmentDESC</label>
            <input
              type="text"
              name="EquipmentDESC"
              value={selectedItem.EquipmentDESC}
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
