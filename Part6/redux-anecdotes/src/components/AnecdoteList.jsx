import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

export const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        let anecdotesFiltered =anecdotes
        
        if(filter !== 'ALL'){
            anecdotesFiltered = anecdotes
              .filter(a => a.content.includes(filter) )
        }
        return anecdotesFiltered.sort((a, b) => b.votes- a.votes )
    }, shallowEqual)

    const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    }

    return (
        <>
        {anecdotes.map(anecdote => (
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        ))}
      </>
    )
}