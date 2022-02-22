import React, { useEffect, useState } from 'react'
import CardList from '../CardList/CardList'
import TopBanner from '../TopBanner/TopBanner'
import './Home.css'

function Home() {
    const [events, setEvents] = useState([]);
    const [searchField, setSearchField] = useState('')
    const handleSearch = (e) => {
        setSearchField(e.target.value)
    }
    const filteredEvent = events.filter(fd => {
        return fd.title.toLowerCase().includes(searchField.toLowerCase())
    })
    useEffect(() => {
        fetch('http://localhost:5000/events')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
            })
    }, [])
    return (
        <div>
            <div className='background-cointainer-home' >         <h1>Best Way Lead Life Lot of Fun</h1>
                <div>
                    <input onChange={handleSearch} className='home-search-input' placeholder='Search Events'></input>
                    <button className='home-search-btn' >Search</button>
                </div>

            </div>

            <CardList
                events={filteredEvent}
            />
        </div>
    )
}

export default Home