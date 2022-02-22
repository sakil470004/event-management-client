import { Button, Container, Grid } from '@mui/material';
import { borderRadius } from '@mui/system';
import React, { useEffect, useState } from 'react'
import EventCard from './EventCard';

function MyEvents({ user }) {
  const [events, setEvents] = useState([]);
  const [action, setAction] = useState('')
  useEffect(() => {
    if (action) {

      fetch(`http://localhost:5000/eventsWithAction?email=${user}&&action=${action}`)
        .then(res => res.json())
        .then(data => {
          setEvents(data)
        })
    } else {


      fetch(`http://localhost:5000/myevent?email=${user}`)
        .then(res => res.json())
        .then(data => {
          setEvents(data)
        })
    }
  }, [action])
  return (
    <Container>
      <h1>My Events</h1>

      <div>
        <button style={{ color: 'white', background: '#2E3B55', border: 'none', borderRadius: '5px', fontSize: '20px', fontWeight: '300px', padding: '4px 10px', margin: '4px 10px',curso }} >Sort</button>
        <button style={{ color: 'white', background: '#2E3B55', border: 'none', borderRadius: '5px', fontSize: '20px', fontWeight: '300px', padding: '4px 10px', margin: '4px 10px' }} >Sort</button>
      </div>
      <Grid container spacing={0} style={{ marginBottom: '5px', marginTop: '10px' }}>
        {
          events.map(ev =>
            <Grid sx={{ borderRadius: 15 }} item xs={12} sm={6} md={4}
              key={ev._id}
            >
              <EventCard
                title={ev.title}
                description={ev.description}
                img={ev.img}
                date={ev.date}


              />
            </Grid>
          )
        }
      </Grid>

    </Container>
  )
}

export default MyEvents