import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

export const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createNew = async(e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        dispatch(createAnecdote(content))
        dispatch(setNotification({message: `You created '${content}'`}, 5000))
        e.target.anecdote.value = ''
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