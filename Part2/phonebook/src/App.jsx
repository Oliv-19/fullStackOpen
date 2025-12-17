import { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({msg:null, isError: false})

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
    .then(newPerson => {
      setPersons(prevData =>prevData.concat(newPerson))
      setMessage(prevData => {return {...prevData, msg: `Added ${newName}`}})
    })
    .catch(error => {
      setMessage({isError: true, msg: `${error.response.data.error}`})
      console.log(error.response.data.error)
    })
  }
  const deletePerson= (obj)=>{
    window.confirm(`delete ${obj.name} ?`)
    personsService
      .deletePerson(obj.id)
      .then(() => setPersons(prevData => prevData.filter(p=> p.id != obj.id)))
  }

  const changePhoneNumber = (obj)=>{
    const newObj= {...obj, number: newNumber}
    window.confirm(`${obj.name} is already added to phonebook, replace the old number with a new one?`)
    personsService
    .update(newObj)
    .then(response => {
      setPersons(prevData => prevData.map(p=> p.id == obj.id ? response: p))
      setMessage(prevData => {return {...prevData, msg: `Updated ${obj.name}`}})
    }).catch((error) =>{
      setMessage({msg:error.response.data.error, isError:true} )

    })
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    const personObj= persons.find(obj=> obj.name === newName)
    personObj? changePhoneNumber(personObj) : savePerson()
    setNewName('')
    setNewNumber('')
    setFilter([])
    setTimeout(()=> setMessage({msg:null, isError: false}) , 2000)
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
      <Notification message={message}/>
      <Filter filterPersons={filterPersons}/>
      <PersonForm handleNumberInput={handleNumberInput} handleSubmit={handleSubmit} handleNameInput={handleNameInput} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
