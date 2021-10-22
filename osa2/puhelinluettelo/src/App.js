import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState()
  const [showFiltered, setShowFiltered] = useState('')
  const [ message, setMessage ] = useState('')

  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
  }, [])

  const notificationType = (message, type='successful') => {
    setMessage({message, type})
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }  

  const addPerson = (event) => {
    event.preventDefault()
  
  const personObject = {
    name: newName,
    id: persons.length +1,
    number: newNumber
  }

  const personExists = persons.find(person => person.name === personObject.name)
  if(personExists !== undefined){
    const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    if(confirmed) {
      const updatedPerson = {...personExists, number: personObject.number}
      personService
        .update(personExists.id, updatedPerson)
        .then (updated => {
          notificationType(`Changed the number of ${updatedPerson.name} to a new one`)
          setPersons(persons.map(person => person.number !== personExists.number ? person : updated))
          setNewName('')
          setNewNumber('') 
          return
        })
        .catch(error => {
          notificationType(`${updatedPerson.name} has already been removed from the server`, 'error')
        })
        
        setNewName('')
        setNewNumber('')
        return
    }
    setNewName('')
    setNewNumber('')
    return
  }

  personService
    .create(personObject)
    .then(returnedPersons => {
      notificationType(`Added ${returnedPersons.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      setPersons(persons.concat(returnedPersons))
      setNewName('')
      setNewNumber('')   
    })
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleRemove = (event, id) => {
    event.preventDefault()
    const removed = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${removed.name}?`))
    personService
      .remove(id)
      .then(joku => {
        const remainder = persons.filter(person => person.id !== id)
        notificationType(`Deleted ${removed.name}`)
        setPersons(remainder)
      })   
      return     
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={showFiltered} change={event => setShowFiltered(event.target.value)}/>

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange}/>    

      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.toString().toLowerCase().includes(showFiltered) || showFiltered === '')
        .map(person =>
        <Person key={person} person={person} removal={(event) => handleRemove(event, person.id)}/>)}       
      </ul>
    </div>
  )
}

export default App

