import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Darshboard/EmployeeDashboard'
import AdminDeshboard from './components/Darshboard/AdminDeshboard'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  const [user , setUser]=useState(null)
  
  const authData= useContext(AuthProvider)
  useEffect(()=>{
    const logInUser = localStorage.getItem("logInUser")
    if(logInUser){
      setUser(logInUser.role)
    }
  },[authData])

  
  const handleLogin =(email,password)=>{
    if(email=="admin@me.com"&& password =='123'){
      setUser('admin')
      localStorage.setItem('logInUser',JSON.stringify({role:'admin'}))
    }else if(authData && authData.employees.find((e)=>email ==e.email && e.password == password)){
      setUser('employee')
      localStorage.setItem('logInUser',JSON.stringify({role:'employee'}))
    }
    else{
            alert("Invalid credentials")

    }

  }
  

  // handleLogin("admin@me.com",123);
  return (
   <>
   {!user?<Login handleLogin ={handleLogin}/>:''}
   {user=='admin'?<AdminDeshboard/>:<EmployeeDashboard/>}
   {/* <EmployeeDashboard/> */}
   {/* <AdminDeshboard/> */}
   </>
  )
}

export default App
