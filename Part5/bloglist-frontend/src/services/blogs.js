import axios from 'axios'
const baseUrl = '/api/blogs'

let token=''
const setToken=(newToken)=>{
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

const create=async(blog)=>{
  const response=await axios.post(baseUrl,blog)
  return response.data
}

const update=async(blog)=>{
  const newBlog={
    title:blog.title,
    author:blog.author,
    url:blog.url,
    likes:blog.likes,
    user:blog.user.id
  }
  const response=await axios.put(`${baseUrl}/${blog.id}`,newBlog)
  return response.data
}

const likeBlog=async(blog)=>{
  blog.likes+=1
  return await update(blog)
}

export default { getAll, create ,setToken,update,likeBlog}