import { createSlice } from '@reduxjs/toolkit'

const notificationSlice=createSlice({
    name:'notification',
    initialState:'',
    reducers:{
        setNotificationText(state,action){
            return action.payload
        },
        removeNotification(state,action){
            return ''            
        },
    },
})

export const setNotification=(notificationText,displayTime) => {
    return async(dispatch) => {
        dispatch(setNotificationText(notificationText))
        setTimeout(() => dispatch(removeNotification())
        ,displayTime*1000)
    }
}

const {setNotificationText,removeNotification}=notificationSlice.actions
export default notificationSlice.reducer