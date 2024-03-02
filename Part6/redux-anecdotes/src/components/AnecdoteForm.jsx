import {useDispatch } from 'react-redux'
import {addNewAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm=() => {

    const dispatch = useDispatch()

    const addNew=async(event) => {
        event.preventDefault()
        const content=event.target.content.value
        event.target.content.value=''        
        await dispatch(addNewAnecdote(content))
        dispatch(setNotification(`you added '${content}'`))
      }
    
    return (
        <>
        <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name="content"/></div>
        <button type='submit'>create</button>
      </form>
        </>
    )

}

export default AnecdoteForm