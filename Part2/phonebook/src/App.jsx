import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '000-000-0000'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    persons.find(obj=> obj.name === newName)? alert(`${newName} is already added to phonebook`)
    : setPersons([...persons, {name: newName, number: newNumber}])
    setNewName('')
    setNewNumber('')
  }
  const handleNameInput = (e)=>{
    setNewName(e.target.value)
  }
  const handleNumberInput = (e)=>{
    setNewNumber(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name='name' value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          number: <input name='number' value={newNumber} onChange={handleNumberInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(obj=> <p key={obj.name}>{obj.name} {obj.number}</p>)}
      </div>
    </div>
  )
}

export default App
