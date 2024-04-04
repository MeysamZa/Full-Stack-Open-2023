import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'

const BlogForm=({ handleCreateBlog }) => {
  const dispatch=useDispatch()
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const handleCreate=async(event) => {
    event.preventDefault()
    try{
      const blog={ title,author,url }
      await dispatch(addBlog(blog))
      dispatch(showNotification(`a new blog ${blog.title} by ${blog.author} added`,'Info',5000))
      setTitle('')
      setAuthor('')
      setUrl('')
      handleCreateBlog()
    }
    catch(exception){
      dispatch(showNotification(exception.response.data.error , 'Error' ,5000))
    }
  }

  return(
    <>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <label htmlFor="title">title: </label>
        <input id="title" type='text' value={title} onChange={({ target }) => setTitle(target.value)}/>
        <br/>
        <label htmlFor="author">author: </label>
        <input id="author" type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        <br/>
        <label htmlFor="url">url: </label>
        <input id="url" type='text' value={url} onChange={({ target }) => setUrl(target.value)}/>
        <br/>
        <button id='create-button' type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm