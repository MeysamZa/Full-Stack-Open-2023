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

export default { getAll, create ,setToken}