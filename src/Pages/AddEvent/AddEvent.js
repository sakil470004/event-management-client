import { Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { getStoredCart } from '../fakedb/fakedb';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function AddEvent() {
    const user = getStoredCart().user;
    const [eventData, setEventData] = useState({})
    const [date, setDate] = useState(new Date());
    
    const handleDateChange = (newValue) => {
        setDate(newValue);
    };
    
    const navigation = useNavigate();
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newData = { ...eventData };
        newData[field] = value;
        setEventData(newData)
    }


    const handleLoginSubmit = (e) => {
        const newData = { ...eventData, date: date.toLocaleDateString(), email: user }
        fetch('http://localhost:5000/addevent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Event Added')
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

                    <h1>Add Event</h1>

                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            required

                            type='text'
                            sx={{ width: '75%', maxWidth: '450px', m: 1 }}
                            label="Event Title"
                            variant="standard"
                            name='title'
                            onBlur={handleOnBlur}
                        />
                        <br />
                        <TextField
                            required
                            sx={{ width: '75%', maxWidth: '450px', m: 1 }}
                            type='text'
                            label="Event Description"
                            variant="standard"
                            name='description'
                            onBlur={handleOnBlur}
                        />
                        <br />
                        <TextField
                            required
                            sx={{ width: '75%', maxWidth: '450px', m: 1 }}
                            type='text'
                            label="Event Image Link"
                            variant="standard"
                            name='img'
                            onBlur={handleOnBlur}
                        />
                        <br />

                        <LocalizationProvider

                            dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker

                                label="Date"
                                inputFormat="MM/dd/yyyy"
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField
                                    sx={{ width: '75%', maxWidth: '450px' }}
                                    {...params} />}
                            />
                        </LocalizationProvider>

                        <br />
                        <Button
                            sx={{ width: '75%', maxWidth: '450px', m: 1, color: 'white', background: '#2E3B55', borderRadius: '10px' }}
                            variant='contained'
                            type='submit'
                        >Add Event</Button>

                    </form>

                </div>
            </div>
        </Container>

    )
}

export default AddEvent