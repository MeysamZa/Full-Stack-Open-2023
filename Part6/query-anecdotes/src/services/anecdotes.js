import axios from 'axios'

const baseUrl='http://localhost:3001/anecdotes'

export const getAnecdotes=async() => {
     const response=await axios.get(baseUrl)
     return response.data
}

export const addNewAnecdote=async(anecdote) => {
    const response=await axios.post(baseUrl,anecdote)
    return response.data
}

export const voteAnecdote=async(anecdote) => {
    const id=anecdote.id
    const updatedAnecdote={...anecdote,votes:anecdote.votes+1}
    const response=await axios.put(`${baseUrl}/${id}`,updatedAnecdote)
    return response.data

}