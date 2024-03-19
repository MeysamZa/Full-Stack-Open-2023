import { useContext,createContext,useReducer } from "react"

const NotificationContext=createContext()

const notificationReducer = (state,action) => {
    switch (action.type) {
        case 'setNotification':
            return action.payload
        case 'removeNotification':
            return ''
        default:
            return state
    }
}

export const NotificationContextProvider = (props) => {
    const [notification,dispatch]=useReducer(notificationReducer,'')
    return(
        <NotificationContext.Provider value={[notification,dispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificaionValue=()=>{
    const reducerAndDispatch=useContext(NotificationContext)
    return reducerAndDispatch[0]
}

export const useNotificaionDispatch=()=>{
    const reducerAndDispatch=useContext(NotificationContext)
    return reducerAndDispatch[1]
}


export default NotificationContext