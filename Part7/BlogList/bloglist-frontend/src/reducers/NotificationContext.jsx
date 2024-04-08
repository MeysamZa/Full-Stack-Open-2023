import { createContext , useReducer, useContext } from 'react'

const notificationReducer= (state,action) => {
  switch (action.type) {
  case 'setNotification':
    return action.payload
  case 'removeNotification':
    return null
  default:
    return state
  }
}

const NotificationContext=createContext()

export const NotificationContextProvider=(props) => {
  const [notification , notificationDispatch] = useReducer(notificationReducer,null)
  return(
    <NotificationContext.Provider value={[notification,notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue=() => {
  const [notification , notificationDispatch]=useContext(NotificationContext)
  return notification
}

const useNotificationDispatch=() => {
  const [notification , notificationDispatch]=useContext(NotificationContext)
  return notificationDispatch
}

export const useShowNotification=() => {
  const  notificationDispatch=useNotificationDispatch()
  return (message,preDefinedStyle,displayTime) => {
    notificationDispatch({ type:'setNotification' , payload:{ message,preDefinedStyle } })
    setTimeout(() => {
      notificationDispatch({ type:'removeNotification' })
    }, displayTime)
  }
}

export default NotificationContext