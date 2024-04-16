import axios from 'axios'
const baseUrl = '/api/blogs'

let token=''
const setToken=(newToken) => {
  token=newToken
  if(newToken){
    axios.defaults.headers.common['Authorization']=`Bearer ${token}`
  }
  else{
    axios.defaults.headers.common['Authorization']=null
  }
}

const getAll =async () => {
  const response =await axios.get(baseUrl)
  return response.data
}

const create=async(blog) => {
  const response=await axios.post(baseUrl,blog)
  return response.data
}

const update=async(blog) => {
  const newBlog={ ...blog }
  const response=await axios.put(`${baseUrl}/${blog.id}`,newBlog)
  return response.data
}

const likeBlog=async(blog) => {
  const updateBlog={ ...blog,likes:blog.likes+1 }
  return await update(updateBlog)
}

const remove=async(blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`)
}

export default { getAll, create ,setToken,update,likeBlog,remove }