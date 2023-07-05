import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function Createequipment() {
    const[EquipmentID,setequipmentID] = useState('');
    const [EquipmentType, setequipmenttype] = useState('');
    const [EquipmentDESC, setequipmentdesc] = useState('');

    const postData = () => {
        axios.post(`http://127.0.0.1:8000/equipment`, {
            EquipmentID,
            EquipmentType,
            EquipmentDESC
        })
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>EquipmentID</label>
                    <input placeholder='EquipmentID' onChange={(e)=>setequipmentID(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>EquipmentType</label>
                    <input placeholder='EquipmentType' onChange={(e) => setequipmenttype(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>EquipmentDESC</label>
                    <input placeholder='EquipmentDESC' onChange={(e) => setequipmentdesc(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}