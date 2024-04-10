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

  const handleLikeBlog = (updatedBlog) => {
    //the user extra info was contained in updatedBlog via populate function in backend
    const newBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    )
    newBlogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
    setBlogs(newBlogs)
  }

  const handleRemoveBlog = (removedBlog) => {
    const newBlogs = blogs.filter((blog) =>
      blog.id !== removedBlog.id ? true : false
    )
    setBlogs(newBlogs)
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
          <Blogs
            handleLikeBlog={handleLikeBlog}
            loggedInUser={user}
            handleRemoveBlog={handleRemoveBlog}
          />
        </>
      )}
    </div>
  )
}

export default App
