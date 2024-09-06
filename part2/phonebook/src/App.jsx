import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Persons from './components/Persons'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, 
      id: persons.length + 1,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      console.log("already in phonebook", {newName})
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log(persons)
    }

  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => setSearchTerm(event.target.value)

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
        <Persons namesToShow={namesToShow} />
      </div>
    )
  }

export default App