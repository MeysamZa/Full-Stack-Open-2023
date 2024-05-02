import { useState } from 'react'
import {ADD_BOOK ,ALL_BOOKS, All_AUTHORS} from '../queris'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import {showNotification} from '../reducers/notificationReducer'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const dispatch=useDispatch()

  const [addBook]=useMutation(ADD_BOOK,{
    refetchQueries:[{query:ALL_BOOKS},{query:All_AUTHORS}]
    ,onError:(error)=>{
      const message=error.graphQLErrors.map(err=>err.message).join('\n')
      throw new Error(message)
    }
  }
  )
  

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    try{
      const book={
        title:title?title:null,
        author:author?author:null,
        published:published?Number(published):null,
        genres
      }
      await addBook({variables:book})
      dispatch(showNotification(`a book added : ${title} by ${author}`,'Info',5000))
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }
    catch(error){
      dispatch(showNotification(error.message,'Error',5000))
    }    
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' | ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook