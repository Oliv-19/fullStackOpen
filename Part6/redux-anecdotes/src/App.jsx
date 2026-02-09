import { useEffect } from 'react'
import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { Filter } from './components/Filter'
import anecdotesService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    anecdotesService.getAll().then((a) => dispatch(setAnecdotes(a)))
  }, [dispatch])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter></Filter>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App
