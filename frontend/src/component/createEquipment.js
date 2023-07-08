import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default function CreateEquipment() {
  const [EquipmentID, setEquipmentID] = useState('');
  const [EquipmentType, setEquipmentType] = useState('');
  const [EquipmentDESC, setEquipmentDESC] = useState('');

  const handleCreate = () => {
    const newEquipment = {
      EquipmentID: EquipmentID,
      EquipmentType: EquipmentType,
      EquipmentDESC: JSON.parse(EquipmentDESC),
    };

    axios.post('http://127.0.0.1:8000/equipment', newEquipment)
      .then((response) => {
        console.log('Equipment created successfully:', response.data);
        setEquipmentID('');
        setEquipmentType('');
        setEquipmentDESC('');
      })
      .catch((error) => {
        console.error('Error creating equipment:', error);
      });
  };

  return (
    <div>
      <Form>
        <Form.Field>
          <label>EquipmentID</label>
          <input
            placeholder="EquipmentID"
            value={EquipmentID}
            onChange={(e) => setEquipmentID(e.target.value) }
            disabled
          />
        </Form.Field>
        <Form.Field>
          <label>EquipmentType</label>
          <input
            placeholder="EquipmentType"
            value={EquipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>EquipmentDESC</label>
          <textarea
            placeholder="EquipmentDESC"
            value={EquipmentDESC}
            onChange={(e) => setEquipmentDESC(e.target.value)}
          />
        </Form.Field>
        <Button onClick={handleCreate} primary>
          Submit
        </Button>
      </Form>
    </div>
  );
}