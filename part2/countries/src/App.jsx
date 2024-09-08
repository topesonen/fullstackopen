import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryData from './components/CountryData'
import Weather from './components/Weather'
import countryService from './services/countries'

function App() {
  // 1. State Initialization
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  // 2. Effect for Fetching All Countries (runs once on mount)
  useEffect(() => {
    countryService.getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error => console.error('Error fetching countries:', error))
  }, [])

  // 3. Handle Search Input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    setSelectedCountry(null)
  }

  // 4. Filter Countries Based on Search Term
  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.common.localeCompare(b.name.common))

  // 5. Handle Showing Detailed Country Data
  const handleShowCountry = (countryName) => {
    countryService.getCountry(countryName.toLowerCase())
      .then(countryData => {
        setSelectedCountry(countryData)
      })
      .catch(error => console.error('Error fetching country data:', error))
  }

  // 6. Effect for Automatically Selecting a Country When Filter Narrows to One
  useEffect(() => {
    if (countriesToShow.length === 1 && !selectedCountry) {
      handleShowCountry(countriesToShow[0].name.common)
    }
  }, [countriesToShow, selectedCountry])

  // 7. Render Countries or Country Data
  const renderCountries = () => {
    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (countriesToShow.length === 1 || selectedCountry) {
      return null // We'll render the selected country outside this function
    } else {
      return (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {countriesToShow.map(country => 
            <li key={country.name.common}>
              {country.name.common}
              <button 
                onClick={() => handleShowCountry(country.name.common)}
                style={{ marginLeft: '10px' }}
              >
                show
              </button>
            </li>
          )}
        </ul> 
      )
    }
  }

  // 8. Main Render
  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      {renderCountries()}
      {selectedCountry && (
        <>
          <CountryData country={selectedCountry} />
          <Weather capital={selectedCountry.capital[0]} />
        </>
      )}
    </div>
  )
}

export default App