import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name : 'anecdotes',
  initialState: [],
  reducers : {
    addNew (state, action) {
      state.push(action.payload)
    },
    vote(state, action){
      const toVote = state.find(a => a.id == action.payload)
      const voted = {
        ...toVote,
        votes: toVote.votes + 1
      }
      return state.map(a => (a.id !== action.payload? a: voted))
    },
    setAnecdotes (state, action){
      return action.payload
    }
  }
})
const {setAnecdotes, addNew, vote} = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
} 
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch(addNew(anecdote))
  }
} 

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const a = await anecdotesService.voteAnecdote(anecdote)
    dispatch(vote(a.id))
  }
} 

export default anecdoteSlice.reducer
