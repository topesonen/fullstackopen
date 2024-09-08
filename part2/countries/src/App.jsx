import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryData from './components/CountryData'
import Weather from './components/Weather'

import countryService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  // get all countries
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    setSelectedCountry(null)
    setWeather(null)
  }

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.common.localeCompare(b.name.common))

  console.log(countriesToShow.length)  


  const handleShowCountry = (countryName) => {
    countryService
      .getCountry(countryName.toLowerCase())
      .then(countryData => {
        setSelectedCountry(countryData)     
      }).catch(error => {
        console.error("Error fetching country data:", error)
        setSelectedCountry(null)
        setWeather(null)
      })
  }
  // get country if filtered down to one
  useEffect(() => {
    if (countriesToShow.length === 1 && !selectedCountry) {
      handleShowCountry(countriesToShow[0].name.common)
    }
  }, [countriesToShow, selectedCountry])

  const renderCountries = () => {
    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (countriesToShow.length === 1 || selectedCountry) {
      return null // render the single selected country outside this function
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

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      
      {renderCountries()}
      {selectedCountry && (
        <>
          <CountryData country={selectedCountry} />
          {console.log("Weather for ", selectedCountry.capital[0])}
          <Weather capital={selectedCountry.capital[0]} />
        </>
      )}
    </div>
  )
}

export default App
