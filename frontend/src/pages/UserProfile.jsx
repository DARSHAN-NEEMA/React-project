import React, { useContext } from 'react'
import { AuthProvider } from '../context/AuthContext'

const UserProfile = () => {

  const data = useContext(AuthProvider)
  console.log(data)
  return (
    <div>
     data
    </div>
  )
}

export default UserProfile
