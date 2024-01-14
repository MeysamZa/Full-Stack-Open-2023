import axios from "axios"

const baseUrl="https://api.openweathermap.org/data/2.5/weather"

const apiKey =import.meta.env.VITE_Api_Key

const getCityWeather=(cityName)=>{
    return axios
    .get(`${baseUrl}?q=${cityName}&appid=${apiKey}`)
    .then(responce=>responce.data)

}

const weatherIconUrl=(iconName)=>{
    return `https://openweathermap.org/img/wn/${iconName}@2x.png`
}

export default {getCityWeather,weatherIconUrl}