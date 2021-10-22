import React, {useState, useEffect} from 'react';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

function App() {

  const [ countries, setCountries ] = useState([])
  const [ search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const showCountry = (country) => {
    setSearch(country)
  }

  return (
    <div>
      <form>
      find countires <input value={search}
        onChange={event => setSearch(event.target.value)}/>
      </form>

      <GetInfo countries={countries.filter(country =>
      country.name.toString().toLowerCase().includes(search) || search === '')} handleCLick={showCountry}/>  
    </div>
  )
}

const Country = ({country}) => {
  return(
    <div>
      <h1>{country.name}</h1>
      <p><strong>Capital:</strong>{country.capital}</p>
      <p><strong>Population:</strong>{country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => 
        <li key={language.name}>
          {language.name}
        </li>)} 
      </ul>

          <img src={country.flag} alt='the flag' style={{width: '150px', height: '100px'}}/>

          <Weather country={country}/>
    </div>
  )
}

const LessThan10 = ({countries, handleClick}) => {
  return (
    <div>
      {countries.map(country =>
      <p key={country.name}>
        {country.name} <button onClick={() => handleClick(country.name.toLowerCase())}>show</button>
      </p>)}
    </div>
  )
}

const GetInfo = ({countries, handleClick}) => {
  if (countries.length === 1) return <Country country={countries[0]}/>

  if (countries.length <= 10) return <LessThan10 countries={countries} handleClick={handleClick}/>

  return(
    <div>
      Too many matches, specify another filter
    </div>
  )
}

const Weather = ({ country }) => {
  const [ weather, setWeather ] = useState({})
  useEffect(() => {
    axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name.toLowerCase()}&units=m`)
        .then(response => {
          setWeather(response.data.current)
        })
  }, [country])

  if(!weather) return <div>Try again later</div> 

  return (
    <div>
      <p><strong>temperature:</strong> {weather.temperature} </p>
      <img src={weather.weather_icons} alt='Saakuva' style={{width: '50px', height: '50px' }}/>
      <p><strong>wind:</strong> {weather.wind_speed} mph <strong>direction:</strong> {weather.wind_dir}</p>
    </div>
  )
}

export default App
