import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser]=useState(null)

  const fetchBlogs=async() => {
    const blogs=await blogService.getAll()
    setBlogs( blogs )
    }

  const loginCallBack=(loggedUser)=>{
    setUser(loggedUser)
    fetchBlogs()
  }

  return (
    <div>
      {user===null
      ?<Login loginCallBack={loginCallBack} />
      :<>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
      }
    </div>
  )
}

export default App