import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import blogsReducer from './reducers/blogs'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
    reducer: {
      notification: notificationReducer, 
      blogs: blogsReducer,
      user: userReducer,
      users: usersReducer
    }
  })

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
   <Router>
      <App />
    </Router>
</Provider>
)