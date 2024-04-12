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
import { Routes , Route } from 'react-router-dom'
import Users from './components/Users'
import {initializeUsers} from './reducers/usersReducer'

const App = () => {
  const dispatch=useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)
  const users=useSelector(state => state.users)


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
    dispatch(initializeUsers())
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

  const home=(
    <>
      <Toggable buttonLable="new blog" ref={blogFormToggableRef}>
        <BlogForm handleCreateBlog={handleCreateBlog}/>
      </Toggable>
      <Blogs/>
    </>
  )

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
          <Routes>
            <Route path='/' element={home}/>
            <Route path='/users' element={<Users users={users}/>} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App