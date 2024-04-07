import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const store=configureStore({
  reducer:{
    notification:notificationReducer,
    blogs:blogsReducer,
    loggedInUser:userReducer,
  }
})

export default store