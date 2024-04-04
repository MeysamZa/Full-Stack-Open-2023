import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice=createSlice({
  name:'blogs',
  initialState:[],
  reducers:{
    setBlogs(state,action){
      return action.payload
    },
    createBlog(state,action){
      const newBlog=action.payload
      state.push(newBlog)
    }
  }
})

export const initializeBlogs=() => {
  return async (dispatch) => {
    const blogs=await blogsService.getAll()
    blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
    dispatch(setBlogs(blogs))
  }
}
export const addBlog=(newblog) => {
  return async (dispatch) => {
    const createdBlog=await blogsService.create(newblog)
    dispatch(createBlog(createdBlog))
  }
}

const { setBlogs,createBlog } = blogsSlice.actions
export default blogsSlice.reducer