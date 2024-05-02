import { useState } from "react"
import {useDispatch} from 'react-redux'
import {showNotification} from '../reducers/notificationReducer'
import {useMutation} from '@apollo/client'
import {EDIT_AUTHOR} from '../queris'

const Authors = (props) => {
  const [name,setName]=useState('')
  const [born,setBorn]=useState('')
  const dispatch=useDispatch()
  const [editAuthor]=useMutation(EDIT_AUTHOR,{
    onError:(error)=>{
      const message=error.graphQLErrors.map(err=>err.message).join('\n')
      throw new Error(message)
    }
  })

  if (!props.show) {
    return null
  }
  const authors = props.authors

  const updateAuthor=async(event)=>{
    event.preventDefault()
    try{
      const result=await editAuthor({variables:{name:name,setBornTo:Number(born)}})
      if(result.data.editAuthor===null){
        throw new Error('Author not found')
      }
      dispatch(showNotification(`bornyear of ${name} updated to ${born}`,'Info',5000))
      setName('')
      setBorn('')
    }
    catch(error){
      dispatch(showNotification(error.message,'Error',5000))
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={updateAuthor}>
        <label style={{display:"block"}}>name : 
          <input type='text' value={name} onChange={({target})=>setName(target.value)} />
        </label>
        <label style={{display:"block"}}>born : 
          <input type='number' value={born} onChange={({target})=>setBorn(target.value)} />
        </label>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
