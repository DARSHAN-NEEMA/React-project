import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../utils/localStorage'

export const AuthProvider = createContext()
const AuthContext = ({children}) => {
    const [userData,setUserData]= useState(null)
    useEffect(()=>{
        const {employees,admin} = getLocalStorage()
        setUserData({employees,admin})
    },[])
    
  return (
    <div>
        <AuthProvider.Provider value={userData}>
      {children}
        </AuthProvider.Provider>
    </div>
  )
}

export default AuthContext
