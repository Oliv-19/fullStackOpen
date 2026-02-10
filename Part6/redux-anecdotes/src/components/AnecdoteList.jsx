import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification, removeNotification } from "../reducers/notificationReducer"
import Notification from "./Notification"

export const AnecdoteList = () => {
    const dispatch = useDispatch()
    const [anecdotes, notifications] = useSelector(({filter, anecdotes, notifications}) => {
        let anecdotesFiltered =[...anecdotes]
        if(filter !== 'ALL'){
            anecdotesFiltered = anecdotes
              .filter(a => a.content.includes(filter) )
        }
        
        return [anecdotesFiltered.sort((a, b) => b.votes- a.votes ), notifications]
    })

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote))
        dispatch(changeNotification({message: `You voted '${anecdote.content}'`}))
        setTimeout(()=> {
            dispatch(removeNotification())
        }, 5000)
    }
    
    return (
        <>
        {notifications.message&& <Notification notification={notifications}/>}
        {anecdotes.map(anecdote => (
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        ))}
      </>
    )
}