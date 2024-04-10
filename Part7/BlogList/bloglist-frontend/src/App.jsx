import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

const App = () => {
  const [user, setUser] = useState(null)

  const blogFormToggableRef = useRef()

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson !== null) {
      afterUserLoggedIn(JSON.parse(loggedUserJson))
    }
  }, [])

  
  const afterUserLoggedIn = (loggedUser) => {
    setUser(loggedUser)
    blogService.setToken(loggedUser.token)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setBlogs([])
    blogService.setToken(null)
  }

  const handleCreateBlog = (createdBlog) => {
    //the user extra info was contained in createdBlog via populate function in backend
    blogFormToggableRef.current.toggleVisible()
  }


  return (
    <div>
      <Notification/>
      {user === null ? (
        <Login
          loginCallBack={afterUserLoggedIn}
        />
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{' '}
            <button id="logout-button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <Toggable buttonLable="new blog" ref={blogFormToggableRef}>
            <BlogForm handleCreateBlog={handleCreateBlog}/>
          </Toggable>
          <Blogs loggedInUser={user}/>
        </>
      )}
    </div>
  )
}

export default App
