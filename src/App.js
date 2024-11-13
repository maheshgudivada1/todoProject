import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TodoApp from './components/TodoApp'
import Auth from './components/Login'
import UserProfile from './components/UserProfile' // Import Auth component
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} /> {/* Authentication route */}
        <Route path="/" element={<TodoApp />} /> {/* Todo app route */}
        <Route path="/profile" element={<UserProfile />} />
        {}
      </Routes>
    </BrowserRouter>
  )
}

export default App
