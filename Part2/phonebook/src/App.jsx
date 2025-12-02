import { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    personsService
      .getAll()
      .then(initialValues=> setPersons(initialValues))
    
    
  }, []) 

  const savePerson= ()=>{
    const newObj= {
      name: newName, 
      number: newNumber
    }
    personsService
    .create(newObj)
    .then(newPerson => setPersons(persons.concat(newPerson)))
  }
  const deletePerson= (obj)=>{
    window.confirm(`delete ${obj.name} ?`)
    personsService
      .deletePerson(obj.id)
      .then(() => setPersons(persons.filter(p=> p.id != obj.id)))
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    persons.find(obj=> obj.name === newName)? alert(`${newName} is already added to phonebook`)
    : savePerson()
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
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
