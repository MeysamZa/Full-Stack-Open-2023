import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification=() => {
  const notification=useSelector(state => state.notification)
  if(notification===null || notification===undefined){
    return null
  }

  return(
    <>
      <div className='container'>
        <Alert variant={notification.preDefinedStyle==='Error' ? 'danger' : 'success'}>{notification.message}</Alert>
      </div>
    </>
  )
}

export default Notification