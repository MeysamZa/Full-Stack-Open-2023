import axios from 'axios'

const baseUrl='https://studies.cs.helsinki.fi/restcountries'

const getAllCountriesName=()=>{
    return axios
    .get(`${baseUrl}/api/all`)
    .then(responce=>responce.data.map(country=>country.name.common))
}

const getCountryData=(countryName)=>{
    return axios
    .get(`${baseUrl}/api/name/${countryName}`)
    .then(responce=>{
        return responce.data
    })
}

export default {getAllCountriesName,getCountryData}