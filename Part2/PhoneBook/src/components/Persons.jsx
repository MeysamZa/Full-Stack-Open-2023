const Person=({person,deleteHandler})=>{
    return(
      <p>{person.name} {person.number}
      <button onClick={deleteHandler}>delete</button>
      </p>
    )
  }
  
  const Persons=({persons,deleteHandler})=>{
    return(
      <>
        {persons.map(person=>
        <Person key={person.id} person={person} deleteHandler={()=>deleteHandler(person.id)}/>
        )}  
      </>
    )
  }

  
  export default Persons