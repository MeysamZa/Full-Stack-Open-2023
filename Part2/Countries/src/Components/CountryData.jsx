const CountryData=({countryData})=>{
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
        </>
    )

}


export default CountryData