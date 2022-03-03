import { Container, Grid, LinearProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EventCard from './EventCard';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function MyEvents({ user }) {
  const [events, setEvents] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [action, setAction] = useState('')
  const [date, setDate] = useState(new Date());


  const handleDateChange = (newValue) => {
    setDate(newValue);
    fetchAllDataForCurrentDate(newValue)
  };

  const handleSort = (actionName) => {
    setAction(actionName)
    setIsChange(!isChange)
  }
  const fetchAllDataOfCurrentUser = () => {
    setIsLoading(true)
    fetch(`https://event-managementt.herokuapp.com/myevent?email=${user}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data)
        setIsLoading(false)
      })
  }
  const fetchAllDataForCurrentDate = (date) => {
    setIsLoading(true)
    fetch(`https://event-managementt.herokuapp.com/myevent?email=${user}`)
      .then(res => res.json())
      .then(data => {
        const result = data.filter(ev =>
          ev.date === date.toLocaleDateString()
        )
        setEvents(result)
        setIsLoading(false)
      })
  }
  useEffect(() => {
    setIsLoading(true)
    if (action) {
      fetch(`https://event-managementt.herokuapp.com/eventsWithAction?email=${user}&&action=${action}`)

        .then(res => res.json())
        .then(data => {
          setEvents(data)
          setIsLoading(false)
        })
    } else {
      fetchAllDataOfCurrentUser()

    }
  }, [isChange])
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
      {isLoading ?

        <div style={{ height: '40vh' }}>
          <LinearProgress />
        </div>
        :
        <Grid container spacing={0} style={{ marginBottom: '5px', marginTop: '10px' }}>
          {
            events.map(ev =>
              <Grid sx={{ borderRadius: 15 }} item xs={12} sm={6} lg={4}
                key={ev._id}
              >

                <EventCard
                  setIsChange={setIsChange}
                  isChange={isChange}
                  title={ev.title}
                  description={ev.description}
                  img={ev.img}
                  date={ev.date}
                  id={ev._id}
                  email={ev.email}


                />
              </Grid>
            )
          }
        </Grid>
      }

    </Container>
  )
}

export default MyEvents