import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser]=useState(null)

useEffect(()=>{
  const loggedUserJson=window.localStorage.getItem('loggedUser')
  if(loggedUserJson!==null){
    afterUserLoggedIn(JSON.parse(loggedUserJson))
  }
}
  ,[])

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
  }

  return (
    <div>
      {user===null
      ?<Login loginCallBack={afterUserLoggedIn} />
      :<>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <BlogForm handleCreateBlog={handleCreateBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
      }
    </div>
  )
}

export default App