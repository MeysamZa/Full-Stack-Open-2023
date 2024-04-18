import { useState } from 'react'
import { likeBlog , deleteBlog , addBlogComment } from '..//reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { Button,Form } from 'react-bootstrap'

const Blog = ({ blog }) => {

  const [visible,setVisible]=useState(false)
  const dispatch=useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  if(!blog){
    return null
  }

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

  const handleAddComment=async(event) => {
    event.preventDefault()
    try{
      const comment=event.target.comment.value
      await dispatch(addBlogComment(blog.id,comment))
      dispatch(showNotification(`a new comment added : ${comment}`,'Info',5000))
      event.target.comment.value=''
    }
    catch(exception){
      dispatch(showNotification(exception.response.data.error , 'Error' ,5000))
    }
  }

  // return  (
  //   <div style={blogStyle} className='blog'>
  //     <span>{blog.title} {blog.author} </span><button id='toggle-visible-button' onClick={toggleVisible}>{visible?'hide':'view'}</button>
  //     <div style={extraInfoDisplayStyle} className='extraBlogInfo'>
  //       <p>{blog.url}</p>
  //       <p>likes {blog.likes} <button id='like-button' onClick={likeHandle}>like</button></p>
  //       <p>{blog.user.name}</p>
  //       <div style={{ display:blog.user.userName===loggedInUser.userName?'':'none' }}>
  //         <button id='remove-button' onClick={handleRemove}>remove</button>
  //       </div>
  //     </div>
  //   </div>
  // )
  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url} target='_blank' rel="noreferrer">{blog.url}</a>
      <p>likes {blog.likes} <Button id='like-button'  variant='primary' onClick={likeHandle}>like</Button></p>
      <p>added by {blog.author}</p>
      <div style={{ display:blog.user.userName===loggedInUser.userName?'':'none' }}>
        <Button id='remove-button'  variant='primary' onClick={handleRemove}>remove</Button>
      </div>
      <div>
        <h3>comments</h3>
        <Form onSubmit={handleAddComment}>
          <Form.Control id='comment' type='text'/>
          <Button variant='primary' type='submit'>add comment</Button>
        </Form>
        <ul className="list-group">
          {blog.comments.map((comment,index) => (
            <li className="list-group-item" key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Blog