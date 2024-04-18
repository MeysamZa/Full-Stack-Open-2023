import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import{ useNavigate,useLocation } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'


const Login=({ loginCallBack }) => {
  const dispatch=useDispatch()
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const location=useLocation()
  const loggedInUser=useSelector(state => state.loggedInUser)
  if(loggedInUser){
    const redirectPattern=/^\?.*redirect=([^&]+)&?.*/i
    const redirectPath=redirectPattern.exec(location.search)
    redirectPath ? navigate(redirectPath[1]) :navigate('/')
    return (<p>you are now logged in.</p>)
  }

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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label htmlFor="userName">username:</Form.Label>
        <Form.Control id="userName" type='text' name='username' value={userName} onChange={({ target }) => setUserName(target.value)}/>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">password:</Form.Label>
        <Form.Control id="password" type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
      </Form.Group>
      {/* <label htmlFor="userName">username: </label>
      <input id="userName" type='text' value={userName} onChange={({ target }) => setUserName(target.value)}/>
      <br/>
      <label htmlFor="password">password: </label>
      <input id="password" type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
      <br/> */}
      <Button id='login' variant='primary' type="submit">login</Button>
    </Form>
  </>
  )

}

export default Login