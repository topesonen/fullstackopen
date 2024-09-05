const Person = ({person}) => {
    return (
      <div>{person.name} {person.number}</div>
    )
  }
  

const Persons = ({ namesToShow }) => (
    <>
      {namesToShow.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </>
  )

export default Persons