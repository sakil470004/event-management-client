import { Accordion, AccordionDetails, AccordionSummary, Container } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function EventCard({ title, img, description, date }) {
    return (
        
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
                    <div>
                        Date : {date}
                    </div>
                    <div>
                        {description}
                    </div>
                </AccordionDetails>
            </Accordion>
        

    )
}

export default EventCard