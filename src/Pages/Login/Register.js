import { Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { addToDb } from '../fakedb/fakedb';

function Register() {
  const [loginData, setLoginData] = useState({})
  const navigation = useNavigate();
  const handleOnBlur = e => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData)
  }

  const handleLoginSubmit = (e) => {
    fetch('http://localhost:5000/adduser', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(loginData)

    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          // alert('Registration Success')
          addToDb(loginData.email)
          navigation('/myEvents')
        } else {
          alert(data.message)
        }
      })
    e.preventDefault();
  }
  return (
    <Container>
      <div style={{ marginTop: '150px' }}>
        <div >

          <h1>Register</h1>

          <form onSubmit={handleLoginSubmit}>
            <TextField
              required

              type='email'
              sx={{ width: '75%', maxWidth: '450px', m: 1 }}
              label="Your Email"
              variant="standard"
              name='email'
              onBlur={handleOnBlur}
            />
            <br />
            <TextField
              required
              sx={{ width: '75%', maxWidth: '450px', m: 1 }}
              type='password'
              label="Your Password"
              variant="standard"
              name='password'
              onBlur={handleOnBlur}
            />
            <br />
            <Button
              sx={{ width: '75%', maxWidth: '450px', m: 1, color: 'white', background: '#2E3B55', borderRadius: '10px' }}
              variant='contained'
              type='submit'
            >Register</Button>

          </form>
          <br />
          <br />
          Already have an account? <NavLink to='/login'> Go to login</NavLink>

        </div>
      </div>
    </Container>

  )
}

export default Register