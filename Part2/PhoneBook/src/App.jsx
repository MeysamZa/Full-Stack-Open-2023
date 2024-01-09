import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const newNameHandler=(event)=>{
    setNewName(event.target.value)
  }

  const addPerson=(event)=>{
    event.preventDefault()
    const newPerson={name:newName}
    const newPersonIndex=persons.findIndex(person=>person.name.toLowerCase()===newPerson.name.toLowerCase())
    if(newPersonIndex!==-1){
      window.alert(`${newPerson.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={newNameHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=>
      <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

export default App