const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :info"))

morgan.token('info', (request) => {
    return JSON.stringify(request.body)
})

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },

    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5352367"
    },

    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-123456"
    },

    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-123456"
    }
]

const generateRndId = () => {
    return Math.floor(Math.random() * 1000)
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info',(req, res) => {
    const amount = persons.length
    res.send(`<p>Phonebook has info for ${amount} people <br>
             <br>
             ${new Date()}           
             </p>`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(persons => persons.id === id)
    response.json(person)

    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persons => persons.id !== id)
  
    response.status(204).end()
  })

  /* const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  */
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    const found = persons.find(person => person.name === body.name)

    if (found !== undefined) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
 
    const person = {
      id: generateRndId(),
      name: body.name,
      number: body.number,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })