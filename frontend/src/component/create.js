import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Createuser() {
    const[UserID,setuserID] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [Surname, setSurname] = useState('');
    const [UserType, setUserType] = useState('');

    const postData = () => {
        axios.post(`http://127.0.0.1:8000/user`, {
            UserID,
            FirstName,
            Surname,
            UserType
        })
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>UserID</label>
                    <input placeholder='UserID' onChange={(e)=>setuserID(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' onChange={(e) => setSurname(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Usertype</label>
                    <input placeholder='UserType' onChange={(e)=>setUserType(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}