import {useMutation,useQueryClient} from '@tanstack/react-query'
import {addNewAnecdote} from '../services/anecdotes'
import {useNotificationDispatch} from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient=useQueryClient()
  const newAnecdoteMutation=useMutation({
    mutationFn:addNewAnecdote,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    },
    onError:(error)=>{
      notificationDispatch({
        type:'setNotification',
        payload:error.response.data.error
      })
      setTimeout(() => {
        notificationDispatch({type:'removeNotification'})      
      }, 5000)      
    }
  })
  const notificationDispatch=useNotificationDispatch()
  const onCreate =(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({
      content:content,
      votes:0
    })
    notificationDispatch({
      type:'setNotification',
      payload:`you added '${content}'`
    })
    setTimeout(() => {
      notificationDispatch({type:'removeNotification'})      
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
