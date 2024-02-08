import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser]=useState(null)
  const [notification,setNotification]=useState(null)

useEffect(()=>{
  const loggedUserJson=window.localStorage.getItem('loggedUser')
  if(loggedUserJson!==null){
    afterUserLoggedIn(JSON.parse(loggedUserJson))
  }
}
  ,[])

  const doNotification=(notification)=>{
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)      
    }, 5000);
  }

  const fetchBlogs=async() => {
    const blogs=await blogService.getAll()
    setBlogs( blogs )
    }

  const afterUserLoggedIn=(loggedUser)=>{
    setUser(loggedUser)
    blogService.setToken(loggedUser.token)
    fetchBlogs()
  }

  const handleLogout=()=>{
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setBlogs([])
    blogService.setToken(null)
  }

  const handleCreateBlog=(createdBlog)=>{
    setBlogs(blogs.concat(createdBlog))
    doNotification({message:`a new blog ${createdBlog.title} by ${createdBlog.author} added`
                    ,preDefinedStyle:'Info'})
  }

  return (
    <div>
      <Notification notification={notification}/>
      {user===null
      ?<Login loginCallBack={afterUserLoggedIn} doNotification={doNotification} />
      :<>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <BlogForm handleCreateBlog={handleCreateBlog} doNotification={doNotification}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
      }
    </div>
  )
}

export default App