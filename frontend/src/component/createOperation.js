import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function Createoperation() {
    const [OperationID,setOperationID] = useState('');
    const [EmployeeID, setEmployeeID] = useState('');
    const [ClientID, setClientID] = useState('');
    const [EquipmentID, setEquipmentID] = useState('');
    const [OperationStart, setOperationStart] = useState('');
    const [OperationEnd, setOperationEnd] = useState('');
    const [TransactionID, setTransactionID] = useState('');

    const postData = () => {
        axios.post(`http://127.0.0.1:8000/operation`, {
            OperationID,
            EmployeeID,
            ClientID,
            EquipmentID,
            OperationStart,
            OperationEnd,
            TransactionID
        })
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>OperationID</label>
                    <input placeholder='OperationID' onChange={(e)=>setOperationID(e.target.value)} disabled/>
                </Form.Field>
                <Form.Field>
                    <label>EmployeeID</label>
                    <input placeholder='EmployeeID' onChange={(e) => setEmployeeID(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>ClientID</label>
                    <input placeholder='ClientID' onChange={(e) => setClientID(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>EquipmentID</label>
                    <input placeholder='EquipmentID' onChange={(e) => setEquipmentID(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>OperationStart</label>
                    <input placeholder='OperationStart' onChange={(e) => setOperationStart(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>OperationEnd</label>
                    <input placeholder='OperationEnd' onChange={(e) => setOperationEnd(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>TransactionID</label>
                    <input placeholder='TransactionID' onChange={(e) => setTransactionID(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}