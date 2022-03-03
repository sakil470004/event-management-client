import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { LinearProgress, TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '50px',
    boxShadow: 24,
    p: 4,


};

export default function EditEvent({ open, setOpen, email, title, description, img, id, date, isChange, setIsChange }) {

    const handleClose = () => setOpen(false);
    const [eventDetails, setEventDetails] = React.useState({ title, description, img, _id: id, date, email })
    const form = React.useRef(null)
    const [isLoading, setIsLoading] = React.useState(false)


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInviteDetails = { ...eventDetails };
        newInviteDetails[field] = value;
        setEventDetails(newInviteDetails)

    }
    const handleInvite = (e) => {
        // send data to the server
        setIsLoading(true)
        fetch('https://event-managementt.herokuapp.com/editEvent', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventDetails)
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount) {
                    alert('Event Updated')
                    setIsChange(!isChange)
                } else {
                    alert('something wrong')
                    console.log(data)
                }
                // empty input field
                // for name field need must and here name is email  
                setIsLoading(false)
            })


        setOpen(false)

        e.preventDefault()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <h2>Edit Event Details</h2>
                    {isLoading ?
                        <div style={{ height: '40vh' }}>
                            <LinearProgress />
                        </div>
                        :
                        <form
                            ref={form}
                            onSubmit={handleInvite}>

                            <TextField
                                required
                                onBlur={handleOnBlur}
                                label="Event Title"
                                sx={{ width: '90%', m: 2 }}
                                variant="standard"
                                name='title'
                                defaultValue={eventDetails.title}
                            />
                            <TextField
                                required
                                onBlur={handleOnBlur}
                                label="Event Description"
                                sx={{ width: '90%', m: 2 }}
                                variant="standard"
                                name='description'
                                defaultValue={eventDetails.description}
                            />
                            <TextField
                                required
                                onBlur={handleOnBlur}
                                label="Image URL"
                                sx={{ width: '90%', m: 2 }}
                                variant="standard"
                                name='img'
                                defaultValue={eventDetails.img}
                            />
                            <TextField
                                disabled
                                sx={{ width: '90%', m: 2 }}
                                variant="standard"
                                name='description'
                                type='email'
                                value={eventDetails.email}
                            />

                            <TextField
                                disabled
                                value={date}
                                sx={{ width: '90%', m: 2 }}
                                variant="standard"
                                name='email'
                            />



                            <Button
                                sx={{ width: '90%', maxWidth: '450px', m: 1, color: 'white', background: '#2E3B55', borderRadius: '10px' }}
                                variant='contained'
                                type='submit'
                            >Update</Button>

                        </form>
                    }
                </Box>
            </Modal>
        </div>
    );
}