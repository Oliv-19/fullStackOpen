require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Persons = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('reqBody', (req,res)=> JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))


app.get('/api/persons', (request, response) => {
  Persons.find({}).then(result=>{
    response.json(result)
        
    
  })
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Persons.findById(id).then(result=>{
      response.json(result) 
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Persons.findByIdAndDelete(id)
    .then(result=>{
      response.status(204).end()  
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name or number missing' 
        })
    }
    const person = new Persons({
      name: body.name,
      number: body.number
    })
    person.save().then(savedPerson=>{
      response.json(savedPerson)

    })
})

app.get('/info', (request, response) => {
    const date = new Date()
    return Persons.find({}).then(result=> response.send(`<div>Phonebook has info for ${result.length} people </br> ${date}</div>`))
})

const PORT = process.env.PORT ||3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})