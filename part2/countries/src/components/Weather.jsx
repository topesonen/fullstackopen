import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        if (capital) {
          setLoading(true);
          setError(null);
          console.log("Weather api call for ", capital)

          weatherService.getWeather(capital)
            .then(weatherData => {
                console.log("Weather data:", weatherData)
                setWeather(weatherData);
                setLoading(false);
            })
            .catch(error => {
              setError("Failed to fetch weather data: " + error.message);
              setLoading(false);
            });
        }
      }, [capital])
    console.log(weather)

    if (loading) return <p>Loading weather data...</p>;
    if (error) return <p>{error}</p>;
    if (!weather) return null;

    return (
        <div>
          <h3>Weather in {capital}:</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      );
    }

    export default Weather