import { useNotificationValue } from '../reducers/NotificationContext'
const Notification=() => {
  const notification=useNotificationValue()
  if(notification===null || notification===undefined){
    return null
  }
  const style={ fontSize: 20
    ,borderStyle: 'solid'
    , borderRadius: 5
    , padding: 10
    , marginBottom: 10
  }

  if(notification.preDefinedStyle==='Info'){
    style.color='green'
  }
  else if(notification.preDefinedStyle==='Error'){
    style.color='red'
  }

  return(
    <>
      <div style={style}>
        {notification.message}
      </div>
    </>
  )
}

export default Notification