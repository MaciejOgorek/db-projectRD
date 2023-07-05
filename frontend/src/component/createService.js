import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function CreateService() {
    const[ServiceID,setserviceID] = useState('');
    const [ClientID, setclientID] = useState('');
    const [EmployeeID, setemployeeID] = useState('');
    const [TransactionID, settransactionID] = useState('');
    const [ServiceType, setservicetype] = useState('');

    const postData = () => {
        axios.post(`http://127.0.0.1:8000/service`, {
            ServiceID,
            ClientID,
            EmployeeID,
            TransactionID,
            ServiceType
        })
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>ServiceID</label>
                    <input placeholder='ServiceID' onChange={(e)=>setserviceID(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>ClientID</label>
                    <input placeholder='ClientID' onChange={(e) => setclientID(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>EmployeeID</label>
                    <input placeholder='EmployeeID' onChange={(e) => setemployeeID(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>TransactionID</label>
                    <input placeholder='TransactionID' onChange={(e)=>settransactionID(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>ServiceType</label>
                    <input placeholder='ServiceType' onChange={(e)=>setservicetype(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}