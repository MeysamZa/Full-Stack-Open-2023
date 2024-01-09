import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter,setNameFilter]=useState('')

  const newNameHandler=(event)=>{
    setNewName(event.target.value)
  }

  const newNumberHandler=(event)=>{
    setNewNumber(event.target.value)
  }

  const addPerson=(event)=>{
    event.preventDefault()
    const newPerson={name:newName,number:newNumber}
    const newPersonIndex=persons.findIndex(person=>person.name.toLowerCase()===newPerson.name.toLowerCase())
    if(newPersonIndex!==-1){
      window.alert(`${newPerson.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const nameFilterHandler=(event)=>{
    setNameFilter(event.target.value)
  }

  const personsToShow=persons.filter(person=>person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} nameFilterHandler={nameFilterHandler}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNameHandler={newNameHandler} newNumber={newNumber} newNumberHandler={newNumberHandler}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App