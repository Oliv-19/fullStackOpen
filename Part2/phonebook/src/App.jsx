import { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then((response)=>{
      setPersons(response.data)
    })

  }, [])
  
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
