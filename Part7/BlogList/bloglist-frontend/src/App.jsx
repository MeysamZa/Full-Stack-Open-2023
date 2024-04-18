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
import { Routes , Route , useMatch, Link, Navigate, useLocation } from 'react-router-dom'
import Users from './components/Users'
import { initializeUsers,emptyUsers } from './reducers/usersReducer'
import User from './components/User'
import Blog from './components/Blog'
import { Button,Navbar,Nav } from 'react-bootstrap'

const App = () => {
  const dispatch=useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)
  const users=useSelector(state => state.users)
  const blogs=useSelector(state => state.blogs)
  const location=useLocation()

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
    dispatch(emptyUsers())
  }

  const handleCreateBlog = () => {
    //the user extra info was contained in createdBlog via populate function in backend
    blogFormToggableRef.current.toggleVisible()
  }

  const userMatch=useMatch('/users/:id')
  const user=userMatch
    ? users.find(item => item.id===userMatch.params.id)
    : null

  const blogMatch=useMatch('/blogs/:id')
  const blog=blogMatch
    ? blogs.find(item => item.id===blogMatch.params.id)
    : null

  const LoginNeeded=(props) => {
    if(loggedInUser){
      return props.children
    }
    return (<Navigate replace to={`/login?redirect=${location.pathname}`} />)
  }

  const home=(
    <>
      <Toggable buttonLable="new blog" ref={blogFormToggableRef}>
        <BlogForm handleCreateBlog={handleCreateBlog}/>
      </Toggable>
      <Blogs blogs={blogs}/>
    </>
  )

  const navStyle={ marginLeft:5, }

  return (
    <div className='container'>
      <Notification/>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">

              <Link style={navStyle} to='/'>blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">

              <Link style={navStyle} to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <span style={navStyle}>
                {loggedInUser
                  ? (<>{loggedInUser.name} loggedin<Button style={navStyle} id="logout-button"  variant='primary' onClick={handleLogout}>logout</Button></>)
                  :<Link to='/login'>login</Link>
                }
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h2>blogs</h2>
      <Routes>
        <Route path='/' element={<LoginNeeded>{home}</LoginNeeded>}/>
        <Route path='/users' element={<LoginNeeded><Users users={users}/></LoginNeeded>} />
        <Route path='/users/:id' element={<LoginNeeded><User user={user}/></LoginNeeded>} />
        <Route path='/blogs/:id' element={<LoginNeeded><Blog blog={blog}/></LoginNeeded>} />
        <Route path='/login' element={<Login loginCallBack={afterUserLoggedIn} />} />
      </Routes>
    </div>
  )
}

export default App