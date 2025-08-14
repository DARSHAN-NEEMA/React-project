import React from 'react'

const NewTask = ({data}) => {
    console.log(data)
  return (
  <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-300 rounded-xl'>
            <div className='flex justify-between items-center '>
                <h3 className='bg-red-400 text-sm px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>
                {data.title}
               {data.TaskTitle}
            </h2>
            <p className='text-sm mt-2'> {data.description}</p>
            <div className='flex flex-col justify-between mt-4'>
                <button className='bg-green-500 py-1 px-2 text-sm rounded-xl w-full mb-1' >Mark as Complete</button>
                <button   className='bg-red-500 py-1 px-2 text-sm rounded-xl w-full' >Mark as Failed</button>
            </div>
           
        </div>
  )
}

export default NewTask
