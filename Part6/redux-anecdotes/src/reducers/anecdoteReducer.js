import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name : 'anecdotes',
  initialState: [],
  reducers : {
    addNew (state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action){
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

export const { addNew, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
