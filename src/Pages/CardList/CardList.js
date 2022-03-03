import { Container, Grid } from '@mui/material'
import React from 'react'
import Card from '../Card/Card'

function CardList({ events }) {

    return (
        <Container style={{ marginTop: '-13vh' }}>
            <Grid container spacing={3} style={{ marginBottom: '5px', marginTop: '10px' }}>
                {
                    events.map(ev =>
                        <Grid sx={{ borderRadius: 15 }} item xs={12} sm={6} lg={4}
                            key={ev._id}
                        >
                            <Card
                                title={ev.title}
                                description={ev.description}
                                img={ev.img}

                            />
                        </Grid>

                    )
                }
            </Grid>

        </Container>
    )
}

export default CardList 