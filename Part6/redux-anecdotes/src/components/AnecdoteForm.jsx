import { useDispatch } from "react-redux"
import { addNew } from "../reducers/anecdoteReducer"
import { changeNotification, removeNotification } from "../reducers/notificationReducer"

export const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createNew = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        dispatch(addNew(content))
        dispatch(changeNotification({message: `You created '${content}'`}))
        setTimeout(()=> {
            dispatch(removeNotification())
        }, 5000)
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