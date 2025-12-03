import { useEffect, useState } from 'react'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState(null)

  useEffect(()=>{
    fetch(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => response.json())
      .then(response => setCountries(response))
    
  }, [])

  const searchCountry = (e)=>{
    setSearchValue(e.target.value)

  }
  
  return (
    <>
      <label >
        find countries 
        <input type="text" onChange={searchCountry}/>
      </label>
      <Countries key={searchValue} countries={countries} filter={searchValue} />
    </>
  )
}

export default App
