import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function Createpayment() {
    const[PaymentID,setpaymentID] = useState('');
    const [ClientID, setclientID] = useState('');
    const [EmployeeID, setemployeeID] = useState('');
    const [Amount, setamount] = useState('');
    const [PaymentType, setpaymenttype] = useState('');

    const postData = () => {
        axios.post(`http://127.0.0.1:8000/payment`, {
            PaymentID,
            ClientID,
            EmployeeID,
            Amount,
            PaymentType
        })
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>PaymentID</label>
                    <input placeholder='PaymentID' onChange={(e)=>setpaymentID(e.target.value)} disabled/>
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
                    <label>Amount</label>
                    <input placeholder='Amount' onChange={(e)=>setamount(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>PaymentType</label>
                    <select
                     placeholder='PaymentType' 
                     onChange={(e)=>setpaymenttype(e.target.value)}
                     >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    </select>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}