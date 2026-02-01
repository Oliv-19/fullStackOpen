import { useDispatch, useSelector } from 'react-redux'
import {addNew, voteAnecdote} from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes- a.votes ))

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }
   const createNew = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addNew(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
