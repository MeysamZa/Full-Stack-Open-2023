import { useState } from 'react'
import loginService from '../services/login'


const Login=({loginCallBack,doNotification})=>{
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')

    const handleLogin=async (event)=>{
        event.preventDefault()
        try{
          const user=await loginService.login({userName,password})
          window.localStorage.setItem('loggedUser',JSON.stringify(user))
          loginCallBack(user)
          setUserName('')
          setPassword('')
        }
        catch(exception){
          doNotification({message:exception.response.data.error , preDefinedStyle:'Error'})
        }
      }

      return (<>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="userName">username: </label>
        <input id="userName" type='text' value={userName} onChange={({target})=>setUserName(target.value)}/>
        <br/>
        <label htmlFor="password">password: </label>
        <input id="password" type='password' value={password} onChange={({target})=>setPassword(target.value)}/>
        <br/>
        <button type="submit">login</button>
      </form>
    </>
      )

}

export default Login