const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

morgan.token('reqBody', (req,res)=> JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id == id)
    person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end() 
})

app.post('/api/persons', (request, response) => {
    const maxId = Math.floor(Math.random() * (persons.length * 12)) 
    
    const person = request.body

    if (!person.name || !person.number) {
        return response.status(400).json({ 
            error: 'name or number missing' 
        })
    }else if(persons.find(p => p.name == person.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    person.id = String(maxId +1)
    persons = persons.concat(person)
    response.json(person)
})

app.get('/info', (request, response) => {
    let date = new Date()
  response.send(`<div>Phonebook has info for ${persons.length} people </br> ${date}</div>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})