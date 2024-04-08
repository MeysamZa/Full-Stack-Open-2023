import { useState } from 'react'
import blogService from '../services/blogs'
import { useShowNotification } from '../reducers/NotificationContext'

const BlogForm=({ handleCreateBlog }) => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')
  const showNotification=useShowNotification()

  const handleCreate=async(event) => {
    event.preventDefault()
    try{
      const blog={ title,author,url }
      const createdBlog=await blogService.create(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
      showNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`,'Info', 5000)
      handleCreateBlog(createdBlog)
    }
    catch(exception){
      showNotification(exception.response.data.error , 'Error' ,5000)
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