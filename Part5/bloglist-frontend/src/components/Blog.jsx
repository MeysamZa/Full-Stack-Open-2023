import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog,handleLikeBlog,loggedInUser,handleRemoveBlog }) => {
  const [visible,setVisible]=useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const extraInfoDisplayStyle={ display:visible?'':'none' }

  const toggleVisible=() => setVisible(!visible)

  const likeHandle=async() => {
    const updatedBlog=await blogService.likeBlog(blog)
    handleLikeBlog(updatedBlog)
  }

  const handleRemove=async() => {
    try{
      if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
        await blogService.remove(blog)
        handleRemoveBlog(blog)
      }
    }
    catch(exception){
      console.log(exception.response.data)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisible}>{visible?'hide':'view'}</button>
      <div style={extraInfoDisplayStyle}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={likeHandle}>like</button></p>
        <p>{blog.user.name}</p>
        <div style={{ display:blog.user.userName===loggedInUser.userName?'':'none' }}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog