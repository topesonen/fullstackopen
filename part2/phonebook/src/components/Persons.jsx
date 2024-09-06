const Person = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button 
        onClick={() => removePerson(person.id)}
        style={{ marginLeft: '10px' }}
      >
        delete
      </button>
    </div>
  )
}

const Persons = ({ namesToShow, removePerson }) => (
  <div>
    {namesToShow.map(person => (
      <Person 
        key={person.id} 
        person={person} 
        removePerson={removePerson} 
      />
    ))}
  </div>
)

export default Persons