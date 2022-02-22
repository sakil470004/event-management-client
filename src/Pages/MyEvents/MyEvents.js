import { Button, Container, Grid, TextField } from '@mui/material';
import { borderRadius } from '@mui/system';
import React, { useEffect, useState } from 'react'
import EventCard from './EventCard';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function MyEvents({ user }) {
  const [events, setEvents] = useState([]);
  const [dEvents, setDEvents] = useState([]);
  const [action, setAction] = useState('')
  const [date, setDate] = useState(new Date());
  const [first, setFirst] = useState(true)

  const handleDateChange = (newValue) => {
    fetchAllDataOfCurrentUser()
    let newData = [...events];

    const result = newData.filter(ev =>
      ev.date === newValue.toLocaleDateString()
    )
    setDate(newValue);

    setDEvents(result)
  };

  const handleSort = (actionName) => {
    setAction(actionName)
  }
  const fetchAllDataOfCurrentUser = () => {
    fetch(`http://localhost:5000/myevent?email=${user}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data)
      })
  }
  useEffect(() => {
    if (action) {
      fetch(`http://localhost:5000/eventsWithAction?email=${user}&&action=${action}`)
        .then(res => res.json())
        .then(data => {
          setEvents(data)
          setDEvents(data)
        })
    } else {

      fetchAllDataOfCurrentUser()

    }
  }, [action])
  return (
    <Container>
      <h1>My Events</h1>

      <div>
        <button style={{ color: 'white', background: '#2E3B55', border: 'none', borderRadius: '5px', fontSize: '20px', fontWeight: '300px', padding: '4px 10px', margin: '4px 10px', cursor: 'pointer' }}
          onClick={() => handleSort('sortA')}
        >
          Sort By Asc</button>
        <button style={{ color: 'white', background: '#2E3B55', border: 'none', borderRadius: '5px', fontSize: '20px', fontWeight: '300px', padding: '4px 10px', margin: '4px 10px', cursor: 'pointer' }}
          onClick={() => handleSort('sortD')}
        >Sort By Des</button>
        <LocalizationProvider

          dateAdapter={AdapterDateFns}>
          <DesktopDatePicker

            label="Change Date for Filter ON"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField
              sx={{ width: '200px', maxWidth: '350px' }}
              {...params} />}
          />
        </LocalizationProvider>
      </div>
      <Grid container spacing={0} style={{ marginBottom: '5px', marginTop: '10px' }}>
        {
          dEvents.map(ev =>
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