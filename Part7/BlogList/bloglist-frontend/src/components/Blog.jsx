import { useState } from 'react'
import { likeBlog , deleteBlog } from '..//reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const Blog = ({ blog,loggedInUser }) => {
  const [visible,setVisible]=useState(false)
  const dispatch=useDispatch()

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
    try{
      await dispatch(likeBlog(blog))
      dispatch(showNotification(`blog ${blog.title} voted`,'Info',5000))

    }
    catch(exception){
      console.log(exception.name)
    }
  }

  const handleRemove=async() => {
    try{
      if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
        await dispatch(deleteBlog(blog))
        dispatch(showNotification(`blog ${blog.title} was removed`,'Info',5000))      }
    }
    catch(exception){
      console.log(exception.response.data)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <span>{blog.title} {blog.author} </span><button id='toggle-visible-button' onClick={toggleVisible}>{visible?'hide':'view'}</button>
      <div style={extraInfoDisplayStyle} className='extraBlogInfo'>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button id='like-button' onClick={likeHandle}>like</button></p>
        <p>{blog.user.name}</p>
        <div style={{ display:blog.user.userName===loggedInUser.userName?'':'none' }}>
          <button id='remove-button' onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog