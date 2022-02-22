import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'

function Invites({ user }) {
    const [invitesData, setInvitesData] = useState([])

    useEffect(() => {
        fetch(`https://event-managementt.herokuapp.com/invite?email=${user}`)
            .then(res => res.json())
            .then(data => {
                setInvitesData(data);
            })
    }, [])
    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="Appointments table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Event Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Friend Email</TableCell>

                        </TableRow>
                    </TableHead>
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
                                    {row.email}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.femail}
                                </TableCell>

                            </TableRow>


                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    )
}

export default Invites  