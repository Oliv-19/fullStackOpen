import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    persons.find(obj=> obj.name === newName)? alert(`${newName} is already added to phonebook`)
    : setPersons([...persons, {name: newName}])
    setNewName('')
  }
  const handleInput = (e)=>{
    setNewName(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(obj=> <p key={obj.name}>{obj.name}</p>)}
      </div>
    </div>
  )
}

export default App
