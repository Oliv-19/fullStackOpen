import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './components/notificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const {notification ,messageDispatch} = useContext(NotificationContext)
  const voteAnecdoteMutation =useMutation({
    mutationFn: voteAnecdote,
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
    messageDispatch({type: 'VOTED',payload: {anecdote: anecdote.content, isError: false}})
  }
  const result = useQuery({
    queryKey : ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  if( result.isLoading){
    return <div>Loading data...</div>
  } else if (result.isError){
    return <div>anecdote service not avaible due to problems in server</div>
  }
  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>
      {notification.message && <Notification />}
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
