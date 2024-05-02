import { createSlice } from '@reduxjs/toolkit'

const notificationSlice= createSlice({
  name:'notification',
  initialState:null,
  reducers:{
    setNotification(state,action){
      return action.payload
    },
    removeNotification(state,action){
      return null
    }
  }
})

export const showNotification = (message,preDefinedStyle,displayTime) => {
  return async (dispatch) => {
    const notification={ message,preDefinedStyle }
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, displayTime)
  }
}

const { setNotification,removeNotification } = notificationSlice.actions
export default notificationSlice.reducer