import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      }).catch(error => {
        console.log('fail at getAll()')
      })
  }, [])
  //console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      number: newNumber//,
      //id: persons.length + 1,
    }
    
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      console.log("already in phonebook", {newName})
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
        console.log("changing number for ", existingPerson.name)
        personService
          .update(existingPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => 
              person.id === existingPerson.id ? updatedPerson : person
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error("Error updating person:", error)
      })
      }
    } else {
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error("Error creating person:", error)
    })
  }
   }
  const removePerson = (id) => {
    const personToRemove = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      console.log("removing person", id)
      personService
        .remove(String(id))  // Convert id to string here
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error removing person:', error.response ? error.response.data : error.message)
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearchTerm(event.target.value)
  console.log("persons", persons)
  const namesToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )


    return (
      <div>
        <h2>Phonebook</h2>
        <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
        <h2>add a new</h2>
        <Form 
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
        <h2>Numbers</h2>
        <Persons namesToShow={namesToShow} removePerson={removePerson}/>
      </div>
    )
  }

export default App