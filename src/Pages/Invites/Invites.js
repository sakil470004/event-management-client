import { Container, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'

function Invites({ user }) {
    const [invitesData, setInvitesData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://event-managementt.herokuapp.com/invite?email=${user}`)
            .then(res => res.json())
            .then(data => {
                setInvitesData(data);
                setIsLoading(false)
            })
    }, [])
    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="Appointments table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Friend Email</TableCell>

                        </TableRow>
                    </TableHead>
                    {isLoading ?
                        <div style={{ height: '40vh', width: '100%' }}>
                            <LinearProgress />
                        </div>
                        :
                        <TableBody>
                            {invitesData.map((row) => (


                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.date}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.femail}
                                    </TableCell>

                                </TableRow>


                            ))}
                        </TableBody>
                    }
                </Table>
            </TableContainer>

        </Container>
    )
}

export default Invites  