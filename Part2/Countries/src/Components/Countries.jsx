const Country=({country,onClickHandler})=>{
    return(
        <>
            <p>{country}
            <button onClick={onClickHandler}>Show</button>
            </p>

        </>
    )
}

const Countries=({countries,onClickHandler})=>{
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
        <Country key={country} country={country} onClickHandler={()=>onClickHandler(country)}/>)
        }
        </>
    )
}

export default Countries
