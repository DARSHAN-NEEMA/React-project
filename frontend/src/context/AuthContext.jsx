
import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthProvider = createContext()
const AuthContext = ({children}) => {
  // localStorage.clear();
  const [userData,setUserData]= useState(null)
  useEffect(()=>{
       setLocalStorage()
        const {employees,admin} = getLocalStorage()
        setUserData({employees,admin})
    },[])
    
  return (
    <div>
        <AuthProvider.Provider value={[userData,setUserData]}>
      {children}
        </AuthProvider.Provider>
    </div>
  )
}

export default AuthContext
