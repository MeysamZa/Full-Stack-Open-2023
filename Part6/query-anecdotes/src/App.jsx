import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery,useQueryClient,useMutation} from '@tanstack/react-query' 
import {getAnecdotes,voteAnecdote} from './services/anecdotes'

const App = () => {
  const queryClient=useQueryClient()
  const voteAnecdoteMutation=useMutation({
    mutationFn:voteAnecdote,
    onSuccess:(updatedAnecdote) => {
      const anecdotes=queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes=anecdotes.map(anecdote => anecdote.id!==updatedAnecdote.id ? anecdote : updatedAnecdote)
      queryClient.setQueryData(['anecdotes'],updatedAnecdotes)
    }
  })
  const handleVote = (anecdote) => {
    console.log('vote')
    voteAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )
  if(!result.isSuccess){
    return (<div>anecdote service not available due to problems in server</div>)
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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
    </div>
  )
}

export default App
