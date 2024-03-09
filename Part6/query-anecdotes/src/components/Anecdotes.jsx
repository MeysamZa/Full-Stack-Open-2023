import {useQueryClient,useMutation} from '@tanstack/react-query' 
import {voteAnecdote} from '../services/anecdotes'
import {useNotificationDispatch} from '../NotificationContext'

const Anecdotes = ({anecdotes}) => {
  const queryClient=useQueryClient()
  const voteAnecdoteMutation=useMutation({
    mutationFn:voteAnecdote,
    onSuccess:(updatedAnecdote) => {
      const anecdotes=queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes=anecdotes.map(anecdote => anecdote.id!==updatedAnecdote.id ? anecdote : updatedAnecdote)
      queryClient.setQueryData(['anecdotes'],updatedAnecdotes)
    }
  })
  const notificationDispatch=useNotificationDispatch()
  const handleVote = (anecdote) => {
    console.log('vote')
    voteAnecdoteMutation.mutate(anecdote)
    notificationDispatch({
      type:'setNotification',
      payload:`you voted '${anecdote.content}'`
    })
    setTimeout(() => {
      notificationDispatch({type:'removeNotification'})      
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Anecdotes
