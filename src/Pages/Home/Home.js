import React, { useEffect, useState } from 'react'
import CardList from '../CardList/CardList'
import './Home.css'

function Home() {
    const [events, setEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [searchField, setSearchField] = useState('')
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const size = 9;
    const handleSearch = (e) => {
        setSearchField(e.target.value)
    }
    const filteredEvent = allEvents.filter(fd => {
        return fd.title.toLowerCase().includes(searchField.toLowerCase())
    })
    useEffect(() => {
        fetch('http://localhost:5000/events')
            .then(res => res.json())
            .then(data => {
                setAllEvents(data.events)

            })
    }, [])
    useEffect(() => {
        fetch(`http://localhost:5000/events?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
                setEvents(data.events);
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

            <CardList
                events={searchField ? filteredEvent : events}
            />
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