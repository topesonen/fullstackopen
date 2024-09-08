const CountryData = ({ country }) => {
  console.log(country)
  if (!country) return <p>No country data available</p>


  return (
    <div className='country'>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img 
        src={country.flags.svg} 
        alt={country.flags.alt || `Flag of ${country.name.common}`} 
        style={{ maxWidth: '200px', border: '1px solid #ddd' }}
        />
    </div>
  )
}

export default CountryData