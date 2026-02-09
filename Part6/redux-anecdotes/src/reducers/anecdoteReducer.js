import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const anecdoteSlice = createSlice({
  name : 'anecdotes',
  initialState: [],
  reducers : {
    addNew (state, action) {
      return [...state, asObject(action.payload)]
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
