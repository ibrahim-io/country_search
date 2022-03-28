import {useState, useEffect} from 'react'
import axios from 'axios'

const Display = ({countries, search, showCountry}) => {
  let id = 1
  if(countries.length === 1) {
    const country = countries[0]
    return (
      <>
        <h1>{country.name.common}</h1>
        <h5>Capital: {country.capital[0]}</h5>
        <h5>Area: {country.area}</h5>
        <img src={country.flags.png} alt="country flag"/>
      </>
    )
  } else if (countries.length <= 10) {
    return (
      <ul>
        {countries.map(country => {
          console.log(id)
          return (
            <div key={id++}>
              <li >{country.name.common}</li> <button onClick={() => showCountry([country])}>show</button>
            </div>
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
    setFindCountry(event.target.value)
    setCountries(countries.filter(country => {
      return country.name.common.toLowerCase().includes(findCountry)
    }))
  }

  return (
    <>
      <h1>Country Search</h1>
      <form>
        Find Country: <input value={findCountry} onChange={changeFindCountry} />
      </form>
      <Display countries={countries} search={findCountry} showCountry={setCountries}/>
    </>
  );
}

export default App;
