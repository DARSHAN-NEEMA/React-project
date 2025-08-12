import React from 'react'

const TaskList = () => {
  return (
    <div id='tasklist' className='h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrapw-full py-5 mt-10 '>
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-300 rounded-xl'>
            <div className='flex justify-between items-center '>
                <h3 className='bg-red-400 text-sm px-3 py-1 rounded'>High</h3>
                <h4 className='text-sm'>20 feb 2024</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>
                make a resume 
            </h2>
            <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam omnis nobis illo velit laborum iure?</p>
        </div>
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-300 rounded-xl'>
            <div className='flex justify-between items-center '>
                <h3 className='bg-red-400 text-sm px-3 py-1 rounded'>High</h3>
                <h4 className='text-sm'>20 feb 2024</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>
                make a resume 
            </h2>
            <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam omnis nobis illo velit laborum iure?</p>
        </div>
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-green-300 rounded-xl'>
            <div className='flex justify-between items-center '>
                <h3 className='bg-red-400 text-sm px-3 py-1 rounded'>High</h3>
                <h4 className='text-sm'>20 feb 2024</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>
                make a resume 
            </h2>
            <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam omnis nobis illo velit laborum iure?</p>
        </div>
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-yellow-300 rounded-xl'>
            <div className='flex justify-between items-center '>
                <h3 className='bg-red-400 text-sm px-3 py-1 rounded'>High</h3>
                <h4 className='text-sm'>20 feb 2024</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>
                make a resume 
            </h2>
            <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam omnis nobis illo velit laborum iure?</p>
        </div>
       
      
    </div>
  )
}

export default TaskList
