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

export default function InviteFriendModule({ open, setOpen, email, title, date }) {
    const handleClose = () => setOpen(false);
    const [inviteDetails, setInviteDetails] = React.useState({})
    const form = React.useRef(null)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInviteDetails = { ...inviteDetails };
        newInviteDetails[field] = value;
        setInviteDetails(newInviteDetails)

    }
    const handleInvite = (e) => {
        // send data to the server
        setIsLoading(true)
        const newData = { ...inviteDetails, title: title, email: email, date: date }

        fetch('https://event-management-api-one.vercel.app/invite', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Invite Sent')
                    // setIsChanged(!isChanged)
                    // form.current.reset();

                }
                setIsLoading(false)
            })
        // console.log(newData)
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

                    <h2>Invite Friend</h2>
                    {isLoading ?
                        <div style={{ height: '40vh' }}>
                            <LinearProgress />
                        </div>
                        :
                        <form
                            ref={form}
                            onSubmit={handleInvite}>

                            <TextField
                                disabled
                                value={title}
                                sx={{ width: '90%', m: 2 }}

                                variant="standard"
                                name='title'
                            />

                            <TextField
                                disabled
                                value={email}
                                sx={{ width: '90%', m: 2 }}

                                variant="standard"
                                name='email'
                            />
                            <TextField
                                required
                                sx={{ width: '90%', m: 2 }}
                                label="Friend Email"
                                variant="standard"
                                name='femail'
                                type='email'

                                onBlur={handleOnBlur} />


                            <Button
                                sx={{ width: '90%', maxWidth: '450px', m: 1, color: 'white', background: '#2E3B55', borderRadius: '10px' }}
                                variant='contained'
                                type='submit'
                            >Invite</Button>

                        </form>
                    }
                </Box>
            </Modal>
        </div>
    );
}