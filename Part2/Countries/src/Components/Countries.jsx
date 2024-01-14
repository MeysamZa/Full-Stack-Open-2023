const Country=({country})=>{
    return(
        <>
            <p>{country}</p>
        </>
    )
}

const Countries=({countries})=>{
    if(countries===null || countries===undefined || countries.length===0){
        return (
        <>
        <p>No match</p>
        </>
        )
    }
    else if (countries.length>10){
        return(
            <>
            <p>Too many matches, specify another filter</p>
            </>
        )
    }
    else if (countries.length===1){
        return null
    }
    return(
        <>
        {countries.map(country=>
        <Country key={country} country={country}/>)
        }
        </>
    )
}

export default Countries
