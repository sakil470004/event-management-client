import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


function UserDetails({ user }) {
    const [userDetails, setUserDetails] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newUD = { ...userDetails };
        newUD[field] = value;
        setUserDetails(newUD)

    }
    const handleUpdate = (e) => {
        // send data to the server


        fetch('https://event-managementt.herokuapp.com/changePassword', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {
                    alert('Password Updated')

                } else {
                    alert('something wrong')
                    console.log(data)
                }
                // empty input field
                // for name field need must and here name is email  

            })


        e.preventDefault()
    }

    useEffect(() => {
        fetch(`https://event-managementt.herokuapp.com/userDetails?email=${user}`)
            .then(res => res.json())
            .then(data => {
                setUserDetails(data)
            })
    }, [])
    return (
        <div>
            <h3>Email : {userDetails.email}</h3>
            <h3>Id : {userDetails._id}</h3>
            <Accordion style={{ maxWidth: '300px', margin: 'auto' }} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <h3 style={{ textAlign: 'center' }}>Change Password</h3>
                </AccordionSummary>
                <AccordionDetails>


                    <form onSubmit={handleUpdate}>
                        <TextField
                            required

                            type='password'
                            sx={{ width: '100%', maxWidth: '450px', m: 1 }}
                            label="Current Password"
                            variant="standard"
                            name='password'
                            onBlur={handleOnBlur}
                        />
                        <br />
                        <TextField
                            required
                            sx={{ width: '100%', maxWidth: '450px', m: 1 }}
                            type='password'
                            label="New Password"
                            variant="standard"
                            name='npassword'
                            onBlur={handleOnBlur}
                        />
                        <br />
                        <Button
                            sx={{ width: '100%', maxWidth: '450px', m: 1, color: 'white', background: '#2E3B55', borderRadius: '10px' }}
                            variant='contained'
                            type='submit'
                        >Change Password</Button>

                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default UserDetails