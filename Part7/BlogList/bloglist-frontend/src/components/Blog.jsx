import { useState } from 'react'
import blogService from '../services/blogs'
import { useShowNotification } from '../reducers/NotificationContext'
import { useMutation , useQueryClient } from '@tanstack/react-query'
import { useLoggedInUserValue } from '../reducers/loggedInUserContext'

const Blog = ({ blog }) => {
  const [visible,setVisible]=useState(false)
  const loggedInUser=useLoggedInUserValue()
  const showNotification=useShowNotification()
  const queryClient=useQueryClient()
  const voteBlogMutation=useMutation({
    mutationFn:blogService.likeBlog,
    onSuccess:(updatedBlog) => {
      const blogs=queryClient.getQueryData(['blogs'])
      const newBlogs=blogs.map(blogItem => blogItem.id===updatedBlog.id?updatedBlog:blogItem)
      newBlogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
      queryClient.setQueryData(['blogs'],newBlogs)
      return updatedBlog
    },
    onError:(exception) => {
      throw new Error(exception.response.data.error)
    }
  })

  const removeBlogMutation=useMutation({
    mutationFn:async(blog) => {
      await blogService.remove(blog)
      return blog
    },
    onSuccess:(removedlog) => {
      const blogs=queryClient.getQueryData(['blogs'])
      const newBlogs=blogs.filter(blogItem => blogItem.id===removedlog.id?false:true)
      queryClient.setQueryData(['blogs'],newBlogs)
    },
    onError:(exception) => {
      throw new Error(exception.response.data.error)
    }
  })

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
      const updatedBlog=await voteBlogMutation.mutateAsync(blog)
      showNotification(`blog ${updatedBlog.title} by ${updatedBlog.author} voted.`,'Info', 5000)
    }
    catch(error){
      showNotification(error.message , 'Error' ,5000)
    }
  }

  const handleRemove=async() => {
    try{
      if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
        await removeBlogMutation.mutateAsync(blog)
        showNotification(`blog ${blog.title} by ${blog.author} removed.`,'Info', 5000)
      }
    }
    catch(error){
      showNotification(error.message , 'Error' ,5000)
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