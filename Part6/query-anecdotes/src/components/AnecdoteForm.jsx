import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "./notificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const {notification, messageDispatch} = useContext(NotificationContext)
  const newAnecdoteMutation =useMutation({
    mutationFn: createAnecdote,
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    messageDispatch({type: 'CREATED', payload: {anecdote: content, isError: false}})
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes : 0})
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
