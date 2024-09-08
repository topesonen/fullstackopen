const Country = ({ country, toggleShow }) => {
    const label = country.show
      ? 'show' : 'hide'
  
    return (
      <ul className='country'>
        {country.common} 
        <button onClick={toggleShow}>{label}</button>
      </ul>
    )
  }

export default Country