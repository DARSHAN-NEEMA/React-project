import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FaildTask from './FaildTask'


const TaskList = ({data}) => {
   
  return (
    <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrapw-full py-5 mt-10 '>

        {data.tasks.map((elem,idx)=>{
            if(elem.active){
                return <AcceptTask key={idx} data={elem}/>
            }
            if(elem.newTask){
                return <NewTask key={idx} data={elem}/>
            }
            if(elem.completed){
                return <CompleteTask key={idx} data={elem}/>

            }
            if(elem.failed){
                return <FaildTask key={idx} data={elem}
                />
            }
        })}

        
        {/* <AcceptTask/>
        <NewTask/>
        <CompleteTask/>
        <FaildTask/> */}
      
    </div>
  )
}

export default TaskList
