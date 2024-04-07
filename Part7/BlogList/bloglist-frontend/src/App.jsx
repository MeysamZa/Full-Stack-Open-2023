import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs,emptyBlogs } from './reducers/blogsReducer'
import { retrieveLoggedInUser,logoutUser } from './reducers/userReducer'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

const App = () => {
  const dispatch=useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  const blogFormToggableRef = useRef()

  useEffect(() => {
    const user=dispatch(retrieveLoggedInUser())
    if(user!==null){
      afterUserLoggedIn(user)
    }
  }, [])

  const afterUserLoggedIn = (loggedUser) => {
    blogService.setToken(loggedUser.token)
    dispatch(initializeBlogs())
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(emptyBlogs())
    blogService.setToken(null)
  }

  const handleCreateBlog = () => {
    //the user extra info was contained in createdBlog via populate function in backend
    blogFormToggableRef.current.toggleVisible()
  }

  return (
    <div>
      <Notification/>
      {loggedInUser === null ? (
        <Login loginCallBack={afterUserLoggedIn} />
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