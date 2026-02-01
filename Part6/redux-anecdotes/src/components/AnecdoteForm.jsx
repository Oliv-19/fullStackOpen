import { useDispatch } from "react-redux"
import { addNew } from "../reducers/anecdoteReducer"

export const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createNew = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(addNew(content))
    }
    return (
        <form onSubmit={createNew}>
            <h2>create new</h2>
            <div>
            <input name='anecdote'/>
            </div>
            <button type='submit'>create</button>
      </form>
    )
}