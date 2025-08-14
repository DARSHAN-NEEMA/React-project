import React from 'react'
import Header from '../other/Header'
import TaskNumber from '../Other/TaskNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
  return (
    <div className='p-20 bg-[#1c1c1c] h-screen'>
    <Header changeUser={props.changeUser}  data={props.data}/>
    <TaskNumber data={props.data}/>
    <TaskList data={props.data}/>
    </div>
  )
}

export default EmployeeDashboard
