import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'
import {useQuery} from '@tanstack/react-query' 
import {getAnecdotes} from './services/anecdotes'

const App = () => {
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
      <Anecdotes anecdotes={anecdotes}/>
    </div>
  )
}

export default App
