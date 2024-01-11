import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter,setNameFilter]=useState('')

  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(responce=>setPersons(responce.data))
  }
    ,[])

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
    axios
    .post('http://localhost:3001/persons',newPerson)
    .then(responce=>{
      setPersons(persons.concat(responce.data))
      setNewName('')
      setNewNumber('')  
    })
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