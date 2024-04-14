import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import{ useNavigate,useLocation } from 'react-router-dom'


const Login=({ loginCallBack }) => {
  const dispatch=useDispatch()
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const location=useLocation()

  const handleLogin=async (event) => {
    event.preventDefault()
    try{
      const user=await dispatch(loginUser(userName,password))
      loginCallBack(user)
      setUserName('')
      setPassword('')
      const redirectPattern=/^\?.*redirect=([^&]+)&?.*/i
      const redirectPath=redirectPattern.exec(location.search)
      redirectPath ? navigate(redirectPath[1]) :navigate('/')
    }
    catch(exception){
      dispatch(showNotification(exception.response.data.error ,'Error',5000))
    }
  }

  return (<>
    <h2>Login to application</h2>
    <form onSubmit={handleLogin}>
      <label htmlFor="userName">username: </label>
      <input id="userName" type='text' value={userName} onChange={({ target }) => setUserName(target.value)}/>
      <br/>
      <label htmlFor="password">password: </label>
      <input id="password" type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
      <br/>
      <button id='login' type="submit">login</button>
    </form>
  </>
  )

}

export default Login