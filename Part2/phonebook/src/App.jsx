import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState([])

  const handleSubmit = (e)=>{
    e.preventDefault()
    persons.find(obj=> obj.name === newName)? alert(`${newName} is already added to phonebook`)
    : setPersons([...persons, {name: newName, number: newNumber}])
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
    const filtered= persons.filter(obj => obj.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilter(filtered)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: 
        <input type="text" onChange={filterPersons} />
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Add a new</h2>
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
        {filter.length === 0? (
          <>
            {persons.map(obj=>  <p key={obj.name}>{obj.name} {obj.number}</p>) }
          </>
        ):(
          <>
            {console.log(filter.length)}
            {filter.map(obj=>  <p key={obj.name}>{obj.name} {obj.number}</p>) }
          </>
        )
        }
      </div>
    </div>
  )
}

export default App
