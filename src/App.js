import {useState, useEffect} from 'react'
import axios from 'axios'

const Display = ({countries, search}) => {
  if(countries.length === 1) {
    const country = countries[0]
    return (
      <>
        <h1>{country.name.common}</h1>
        <h5>Capital: {country.capital[0]}</h5>
      </>
    )
  } else if (countries.length <= 10) {
    return (
      <ul>
        {countries.map(country => {
          return (
            <li key={country.name.common}>{country.name.common}</li>
          )
        })}
      </ul>
    )
  } else if (search !== '') {
    return (
      <p>Too many countries found, please be more specific</p>
    )
  } else {
    return (
      <p>Please search for a country to get its information</p>
    )
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [findCountry, setFindCountry] = useState('')

  useEffect(() => axios.get('https://restcountries.com/v3.1/all').then(response => {
    setCountries(response.data)
  }), [])

  const changeFindCountry = (event) => {
    setCountries(countries.filter(country => {
      return country.name.common.toLowerCase().includes(findCountry)
    }))
    setFindCountry(event.target.value)
  }

  return (
    <>
      <h1>Country Search</h1>
      <form>
        Find Country: <input value={findCountry} onChange={changeFindCountry} />
      </form>
      <Display countries={countries} search={findCountry}/>
    </>
  );
}

export default App;
