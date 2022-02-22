import React from 'react'

function Card({ title, img, description }) {
  return (
    <div style={{ background: '#3f90fc', borderRadius: '19px' }}>
      <div style={{ height: '350px', backgroundImage: `url(${img})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'cover', borderRadius: '15px' }}>

      </div>
      <h2 style={{ color: 'white', fontWeight: '300', paddingBottom: '13px' }}>{title}</h2>
    </div>

  )
}

export default Card