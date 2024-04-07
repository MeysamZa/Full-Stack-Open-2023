import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice=createSlice({
  name:'name',
  initialState:null,
  reducers:{
    setUser(_state,action){
      return action.payload
    }
  }
})

export const loginUser= ( userName,password ) => {
  return async  (dispatch) => {
    const user=await loginService.login({ userName,password })
    window.localStorage.setItem('loggedUser',JSON.stringify(user))
    dispatch(setUser(user))
    return user
  }
}

export const logoutUser= () => {
  return  (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }
}

export const retrieveLoggedInUser= () => {
  return  (dispatch) => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson !== null) {
      const user=JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      return user
    }
    return null
  }
}

const { setUser }=userSlice.actions
export default userSlice.reducer