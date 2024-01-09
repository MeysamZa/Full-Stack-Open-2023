const Filter=({nameFilter,nameFilterHandler})=>{
    return(
      <div>
        filter shown with <input value={nameFilter} onChange={nameFilterHandler}></input>
      </div>    
    )
  }

  export default Filter