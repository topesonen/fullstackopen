import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import countryService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  //console.log(countries)
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  console.log(countries)
  
  const handleSearch = (event) => setSearchTerm(event.target.value)

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.common.localeCompare(b.name.common))

  console.log(countriesToShow.length)  

  if (countriesToShow.length > 10) {
    console.log("Too many matches, specify another filter")
  } 

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {countriesToShow.map(country => 
            <li key={country.name.common}>
              {country.name.common}
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default App
