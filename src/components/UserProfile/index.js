import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const UserProfile = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('jwt_token')
    if (!token) {
      navigate('/login') 
    } else {
      const storedUsername = localStorage.getItem('username')
      const storedPassword = localStorage.getItem('password')
      setUser({username: storedUsername, password: storedPassword})
    }
  }, [navigate])

  const handleChange = e => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }

  const handleUpdateProfile = () => {
    try {
      localStorage.setItem('username', user.username)
      localStorage.setItem('password', user.password)
      setIsEditing(false)
    } catch (error) {
      setError('Failed to update profile')
    }
  }

  const handleDeleteProfile = () => {
    try {
      localStorage.removeItem('username')
      localStorage.removeItem('password')
      localStorage.removeItem('jwt_token') 
      navigate('/login') 
    } catch (error) {
      setError('Failed to delete profile')
    }
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {isEditing ? (
        <div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleUpdateProfile}>Update Profile</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Password:</strong> {user.password}
          </div>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            <button onClick={handleDeleteProfile}>Delete Account</button>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default UserProfile
