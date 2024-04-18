import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label htmlFor="title">title: </Form.Label>
          <Form.Control id="title" type='text' value={title} onChange={({ target }) => setTitle(target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author">author: </Form.Label>
          <Form.Control id="author" type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="url">url: </Form.Label>
          <Form.Control id="url" type='text' value={url} onChange={({ target }) => setUrl(target.value)}/>
        </Form.Group>        <Button id='create-button' variant='primary' type="submit">create</Button>
      </Form>
    </>
  )
}

export default BlogForm