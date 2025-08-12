import React from 'react'
import Header from '../other/Header'
import TaskNumber from '../Other/TaskNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = () => {
  return (
    <div className='p-20 bg-[#1c1c1c] h-screen'>
    <Header/>
    <TaskNumber/>
    <TaskList/>
    </div>
  )
}

export default EmployeeDashboard
