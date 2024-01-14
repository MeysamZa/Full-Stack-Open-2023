import weatherService from "../Services/weatherService"

const Weather=({weatherData})=>{

    if(weatherData===null || weatherData===undefined){
        return null
    }

    const cityName=weatherData.name
    const temperatureCelsius=weatherData.main.temp-273.15
    const weatherIconUrl=weatherService.weatherIconUrl(weatherData.weather[0].icon)
    const weatherWind=weatherData.wind.speed


    return(
        <>
        <h2>Weather in {cityName}</h2>
        <div>temperature {Math.round(temperatureCelsius)} Celsius</div>
        <img src={weatherIconUrl}></img>
        <div>wind {weatherWind} m/s</div>
        </>
    )
}

const CountryData=({countryData,weatherData})=>{
    if(countryData===null || countryData===undefined){
        return null
    }
    return(
        <>
        <h1>{countryData.name.common}</h1>
        <div>capital {countryData.capital.join(', ')}</div>
        <div>area {countryData.area}</div>
        <br/>
        <div><b>languages:</b></div>
        <ul>
            {Object.values(countryData.languages).map(lang=>
            <li key={lang}>{lang}</li>
            )}
        </ul>
        <br/>
        <img src={countryData.flags.png} alt={countryData.flags.alt}/>
        <Weather weatherData={weatherData}/>
        </>
    )

}

export default CountryData