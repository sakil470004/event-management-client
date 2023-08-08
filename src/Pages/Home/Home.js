import { LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CardList from '../CardList/CardList'
import './Home.css'

function Home() {
    const [events, setEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [searchField, setSearchField] = useState('')
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const size = 6;
    const handleSearch = (e) => {
        setSearchField(e.target.value)
    }
    const filteredEvent = allEvents.filter(fd => {
        return fd.title.toLowerCase().includes(searchField.toLowerCase())
    })
    useEffect(() => {
        setIsLoading(true)
        fetch('https://event-management-api-one.vercel.app/events')
            .then(res => res.json())
            .then(data => {
                setAllEvents(data.events)

                setIsLoading(false)
            })

    }, [])
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://event-management-api-one.vercel.app/events?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
                setEvents(data.events);
                setIsLoading(false)
            })
    }, [page])
    return (
        <div>
            <div className='background-cointainer-home' >         <h1>Best Way Lead Life Lot of Fun</h1>
                <div>
                    <input onChange={handleSearch} className='home-search-input' placeholder='Search Events'></input>
                    <button className='home-search-btn' >Search</button>
                </div>

            </div>

            {isLoading ?
                <div style={{ height: '40vh' }}>
                    <LinearProgress />
                </div>
                :
                <CardList
                    events={searchField ? filteredEvent : events}
                />
            }
            <div className="pagination">
                {
                    [...Array(pageCount).keys()]
                        .map(number => <button
                            className={number === page ? 'selected' : ''}
                            key={number}
                            onClick={() => setPage(number)}
                        >{number + 1}</button>)
                }
            </div>
        </div>
    )
}

export default Home