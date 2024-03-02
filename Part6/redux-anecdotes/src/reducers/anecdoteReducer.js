import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../service/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice= createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    voteAnecdote(state,action){
      const id=action.payload
      const itemToChangeIndex=state.findIndex(item => item.id===id)
      state[itemToChangeIndex].votes+=1 
    },
    appendAnecdote(state,action){
      const newAnecdote=action.payload
      state.push(newAnecdote)
    },
    setAnecdotes(state,action){
      return action.payload
    },
  },
})

export const initializeAnecdotes=() => {
  return async (dispatch)=>{
    const anecdotes=await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote=(content) => {
  return async(dispatch) => {
    const anecdote=await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const {voteAnecdote,appendAnecdote,setAnecdotes}=anecdotesSlice.actions
export default anecdotesSlice.reducer