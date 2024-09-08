import axios from 'axios'

const geoBaseUrl = 'http://api.openweathermap.org/geo/1.0/direct'
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const getWeather = (city) => {
    // first get the coordinates
    console.log("Getting coordinates")
    return axios.get(`${geoBaseUrl}?q=${city}&limit=1&appid=${apiKey}`)
      .then(response => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0]
          console.log("coordinates", {lat},{lon})
          // then, get the weather using the coordinates
          return axios.get(`${weatherBaseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        } else {
            console.log("Error...")
             throw new Error('City not found')
        }
      })
      .then(response => {
        console.log("Weather data:", response.data)
        return response.data
      })
      .catch(error => {
        console.error("Error:", error)
        throw error
      })
  }
  
  export default { getWeather }