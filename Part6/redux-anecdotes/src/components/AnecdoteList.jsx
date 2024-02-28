import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'

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
  
    const vote = (id) => {
      console.log('vote', id)
      dispatch(voteAnecdote(id))
    }

      return(
        <>
        {sortedAnecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} voteHandle={() => vote(anecdote.id)}/>        
      )}
        </>
      )
}

export default AnecdoteList