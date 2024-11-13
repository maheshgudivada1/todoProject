import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid' 
import './index.css'
const StatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const TodoApp = () => {
  
  const initialTodos = [
    {id: uuidv4(), text: 'Learn React', status: 'pending'},
    {id: uuidv4(), text: 'Build a Todo App', status: 'pending'},
    {id: uuidv4(), text: 'Explore JavaScript ES6', status: 'pending'},
  ]

  const [todos, setTodos] = useState([initialTodos])
  const [userInput, setUserInput] = useState('')
  const [status, setStatus] = useState(StatusConstants.initial)

  useEffect(() => {
    const loadTodos = () => {
      const storedTodos = localStorage.getItem('todos')
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos)) 
      } else {
        setTodos(initialTodos)
        localStorage.setItem('todos', JSON.stringify(initialTodos)) 
      }
      setStatus(StatusConstants.success)
    }

    loadTodos()
  }, [])

  const handleAddTodo = () => {
    if (userInput.trim() === '') {
      alert('Enter valid text')
      return
    }

    const newTodo = {
      id: uuidv4(),
      text: userInput,
      status: 'pending',
    }

    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos)) 
    setUserInput('')
  }

  const updateTodoStatus = (id, newStatus) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? {...todo, status: newStatus} : todo,
    )
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos)) 
  }

  const handleDeleteTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos)) 
  }

  const navigate = useNavigate() 

  const handleLogout = () => {
    localStorage.removeItem('jwt_token') 
    navigate('/login') 
  }
  const handleUserProfile = () => {
    navigate('/profile')
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button type="button" onClick={handleUserProfile}>
        User Profile
      </button>
      {status === StatusConstants.inProgress && <p>Loading...</p>}
      {status === StatusConstants.failure && (
        <p>Failed to load todos. Please try again.</p>
      )}
      <ul>
        {todos.length === 0 && <li>No todos available.</li>}
        {todos.map(todo => (
          <li key={todo.id} className="todo-item-container">
            <span>{todo.text}</span>
            <select
              value={todo.status}
              onChange={e => {
                updateTodoStatus(todo.id, e.target.value)
                alert(`Status updated to "${e.target.value}"`) // Confirmation message
              }}
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="done">Done</option>
            </select>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  )
}

export default TodoApp
