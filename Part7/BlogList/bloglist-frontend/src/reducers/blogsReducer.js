import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice=createSlice({
  name:'blogs',
  initialState:[],
  reducers:{
    setBlogs(state,action){
      const blogs=action.payload
      blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
      return blogs
    },
    createBlog(state,action){
      const newBlog=action.payload
      state.push(newBlog)
    },
    updateBlog(state,action){
      const updatedBlog=action.payload
      const blogs= state.map(blog => blog.id===updatedBlog.id ? updatedBlog : blog)
      blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
      return blogs
    },
    removeBlog(state,action){
      const removedBlog=action.payload
      return state.filter(blog => blog.id===removedBlog.id ? false : true)
    },
    emptyBlogs(state,action){
      return []
    }
  }
})

export const initializeBlogs=() => {
  return async (dispatch) => {
    const blogs=await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const addBlog=(newblog) => {
  return async (dispatch) => {
    const createdBlog=await blogsService.create(newblog)
    dispatch(createBlog(createdBlog))
  }
}
export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog=await blogsService.likeBlog(blog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog= (blog) => {
  return async (dispatch) => {
    await blogsService.remove(blog)
    dispatch(removeBlog(blog))
  }
}

export const addBlogComment = (blogId,comment) => {
  return async (dispatch) => {
    const updatedBlog=await blogsService.addComment(blogId,comment)
    dispatch(updateBlog(updatedBlog))
  }
}

const { setBlogs,createBlog , updateBlog ,removeBlog } = blogsSlice.actions
export const { emptyBlogs } = blogsSlice.actions
export default blogsSlice.reducer