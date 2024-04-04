import { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'


const Login=({ loginCallBack }) => {
  const dispatch=useDispatch()
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')

  const handleLogin=async (event) => {
    event.preventDefault()
    try{
      const user=await loginService.login({ userName,password })
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      loginCallBack(user)
      setUserName('')
      setPassword('')
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