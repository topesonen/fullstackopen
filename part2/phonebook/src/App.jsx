import { useState } from 'react'
import Form from './components/Form'
import Persons from './components/Persons'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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