import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    persons.find(obj=> obj.name === newName)? alert(`${newName} is already added to phonebook`)
    : setPersons([...persons, {name: newName, number: newNumber, id: persons.length+1}])
    setNewName('')
    setNewNumber('')
    setFilter([])
  }
  const handleNameInput = (e)=>{
    setNewName(e.target.value)
  }
  const handleNumberInput = (e)=>{
    setNewNumber(e.target.value)
  }
  const filterPersons = (e)=>{
    setFilter(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPersons={filterPersons}/>
      <PersonForm handleNumberInput={handleNumberInput} handleSubmit={handleSubmit} handleNameInput={handleNameInput} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
