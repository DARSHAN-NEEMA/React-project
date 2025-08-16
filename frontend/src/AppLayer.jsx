import React from 'react'
import App from './App'
import { Routes, Route } from "react-router-dom";

const AppLayer = () => {
  return (
    <div>

        <Routes>
            <Route path='/' element={<App/>} />
            {/* <Route path='/userProfile' element={<UserProfile/>} /> */}
            <Route path='/' element={<App/>} />
        </Routes>

    </div>
  )
}

export default AppLayer
