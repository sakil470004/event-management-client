import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from '@mui/system';
import InviteFriendModule from './InviteFriendModul';
import EditEvent from './EditEvent';

function EventCard({ title, img, description, date, id, email, isChange, setIsChange }) {
    const [open, setOpen] = useState(false);
    const [openU, setOpenU] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleOpenU = () => setOpenU(true);
    const handleInvite = () => {
        handleOpen()
    }
    const handleEdit = () => {
        handleOpenU()
    }
    return (
        <div>
            <InviteFriendModule
                open={open}
                setOpen={setOpen}
                email={email}
                title={title}
            />
            <EditEvent
                open={openU}
                setOpen={setOpenU}
                email={email}
                title={title}
                img={img}
                date={date}
                id={id}
                setIsChange={setIsChange}
                isChange={isChange}
                description={description}
            />

            <Accordion style={{ boxShadow: "none" }} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <div style={{ background: '#2E3B55', borderRadius: '19px', width: '100%' }}>
                        <div style={{ height: '350px', backgroundImage: `url(${img})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'cover', borderRadius: '15px' }}>

                        </div>
                        <h2 style={{ color: 'white', fontWeight: '300', paddingBottom: '13px' }}>{title}</h2>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ margin: '0 25px', display: 'flex', justifyContent: 'space-between', height: '40px', color: 'red' }}>
                        <Typography>
                            <GroupAddIcon
                                onClick={handleInvite}
                                sx={{ cursor: 'pointer' }} />
                        </Typography>
                        <Typography>
                            <EditIcon
                                onClick={handleEdit}
                                sx={{ cursor: 'pointer' }} />
                        </Typography>
                    </Box>
                    <div>
                        Date : {date}
                    </div>
                    <div>
                        {description}
                    </div>

                </AccordionDetails>
            </Accordion>
        </div>

    )
}

export default EventCard