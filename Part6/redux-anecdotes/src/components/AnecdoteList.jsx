import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const Anecdote=({anecdote,voteHandle}) => {
    return(
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={voteHandle}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList=() => {
    const anecdotes = useSelector(({anecdotes,filter}) => 
                                  anecdotes.filter(item => item.content.toLowerCase().includes(filter.toLowerCase())))
    const sortedAnecdotes=anecdotes.toSorted((itemA,itemB) => itemB.votes-itemA.votes)
    const dispatch = useDispatch()
  
    const vote = async(anecdote) => {
      const id=anecdote.id
      console.log('vote', id)
      await dispatch(voteAnecdote(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`,10))
    }

      return(
        <>
        {sortedAnecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} voteHandle={() => vote(anecdote)}/>        
      )}
        </>
      )
}

export default AnecdoteList