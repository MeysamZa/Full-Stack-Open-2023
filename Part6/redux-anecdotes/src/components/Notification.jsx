import { useSelector,useDispatch } from 'react-redux'
import {removeNotification} from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch=useDispatch()

  if (notification.trim()==='' || notification=== null || notification===undefined){
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  setTimeout(() => dispatch(removeNotification())
  ,5000)
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification