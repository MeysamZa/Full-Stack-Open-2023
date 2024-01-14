import { useEffect, useState } from 'react'
import Countries from './Components/Countries'
import CountryData from './Components/CountryData'
import countriesService from './Services/CountriesService'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [countries,setCountries]=useState([])
  const [countryData,setCountryData]=useState(null)


  useEffect(()=>{
    countriesService.getAllCountriesName()
    .then(countries=>{setCountries(countries)})
  }
    ,[])


  const onSearchValueChange=(event)=>{
    setSearchValue(event.target.value)
  }

  const showCountryData=(countryName)=>{
    if(countryName===null || countryName===undefined || countryName.trim()===''){
      setCountryData(null)
    }
    else if(countryData===null){
      countriesService.getCountryData(countryName)
      .then(country=>{setCountryData(country)})
    }
    else if(countryData.name.common!=countryName){
      countriesService.getCountryData(countryName)
      .then(country=>{setCountryData(country)})
    }
  }

  const filteredCountries=countries.filter(c=>c.toLowerCase().includes(searchValue.toLowerCase()))
  if(filteredCountries.length===1){
    showCountryData(filteredCountries[0])
  }
  else if(countryData!==null){
    showCountryData(null)
  }

  return (
    <>
    <div>
      find countries : 
      <input value={searchValue} onChange={onSearchValueChange}/>
    </div>
    <Countries countries={filteredCountries}/>
    <CountryData countryData={countryData}/>
    </>
  )
}

export default App
