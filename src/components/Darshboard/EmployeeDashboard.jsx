import React from 'react'
import Header from '../other/Header'
import TaskNumber from '../Other/TaskNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = ({data}) => {
  return (
    <div className='p-20 bg-[#1c1c1c] h-screen'>
    <Header data={data}/>
    <TaskNumber data={data}/>
    <TaskList data={data}/>
    </div>
  )
}

export default EmployeeDashboard
