import React from 'react'

function Card({children}) {
  return (
    <div className='bg-white p-3 rounded'>{children}</div>
  )
}

export default Card