import { createContext , useReducer, useContext } from 'react'
import loginService from '../services/login'

const loggedInUserReducer= (state,action) => {
  switch (action.type) {
  case 'setLoggedInUser':
    return action.payload
  default:
    return state
  }
}

const LoggedInUserContext=createContext()

export const LoggedInUserContextProvider=(props) => {
  const [loggedInUser , loggedInUserDispatch] = useReducer(loggedInUserReducer,null)
  return(
    <LoggedInUserContext.Provider value={[loggedInUser,loggedInUserDispatch]}>
      {props.children}
    </LoggedInUserContext.Provider>
  )
}

export const useLoggedInUserValue=() => {
  const [loggedInUser , loggedInUserDispatch]=useContext(LoggedInUserContext)
  return loggedInUser
}

const useLoggedInUserDispatch=() => {
  const [loggedInUser , loggedInUserDispatch]=useContext(LoggedInUserContext)
  return loggedInUserDispatch
}

export const useRetrieveLoggedInUser=() => {
  const  loggedInUserDispatch=useLoggedInUserDispatch()
  return ( () => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson !== null) {
      const user=JSON.parse(loggedUserJson)
      loggedInUserDispatch({ type:'setLoggedInUser' , payload:user })
      return user
    }
    return null
  }
  )
}

export const useLoginUser=() => {
  const  loggedInUserDispatch=useLoggedInUserDispatch()
  return ( async(userName,password) => {
    const user=await loginService.login({ userName,password })
    window.localStorage.setItem('loggedUser',JSON.stringify(user))
    loggedInUserDispatch({ type:'setLoggedInUser' , payload:user })
    return user
  }
  )
}

export const useLogOutUser=() => {
  const  loggedInUserDispatch=useLoggedInUserDispatch()
  return ( () => {
    window.localStorage.removeItem('loggedUser')
    loggedInUserDispatch({ type:'setLoggedInUser' , payload:null })
  }
  )
}

export default LoggedInUserContext