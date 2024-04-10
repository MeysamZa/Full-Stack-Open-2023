import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { useLoggedInUserValue , useRetrieveLoggedInUser ,useLogOutUser } from './reducers/loggedInUserContext'
import { useQueryClient } from '@tanstack/react-query'


const App = () => {
  const  loggedInUser= useLoggedInUserValue()

  const blogFormToggableRef = useRef()
  const retrieveLoggedInUser = useRetrieveLoggedInUser()
  const logOutUser=useLogOutUser()

  const queryClient=useQueryClient()


  useEffect(() => {
    const user = retrieveLoggedInUser()
    if (user !== null) {
      afterUserLoggedIn(user)    }
  }, [])

  const afterUserLoggedIn = (loggedUser) => {
    blogService.setToken(loggedUser.token)
  }

  const handleLogout = () => {
    logOutUser()
    queryClient.removeQueries(['blogs'])
    blogService.setToken(null)
  }

  const handleCreateBlog = (createdBlog) => {
    //the user extra info was contained in createdBlog via populate function in backend
    blogFormToggableRef.current.toggleVisible()
  }


  return (
    <div>
      <Notification/>
      {loggedInUser === null ? (
        <Login
          loginCallBack={afterUserLoggedIn}
        />
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {loggedInUser.name} logged in{' '}
            <button id="logout-button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <Toggable buttonLable="new blog" ref={blogFormToggableRef}>
            <BlogForm handleCreateBlog={handleCreateBlog}/>
          </Toggable>
          <Blogs/>
        </>
      )}
    </div>
  )
}

export default App
