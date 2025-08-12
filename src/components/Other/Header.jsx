import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between ' >
        <h1 className='text-2xl font-semibold'>hello <br/> 
        <span className='text-3xl font-semibold'>Darshan ✌️</span></h1>
        <button className='bg-red-400 h-15 text-white w-40 py-5 px-3 rounded-sm text-xl font-medium'>Log Out</button>
      
    </div>
  )
}

export default Header
