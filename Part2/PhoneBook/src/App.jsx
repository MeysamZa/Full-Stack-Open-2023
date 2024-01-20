import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter,setNameFilter]=useState('')
  const [notification,setNotification]=useState(null)

  useEffect(()=>{
    personService
    .getAll()
    .then(returnedPersons=>setPersons(returnedPersons))
  }
    ,[])

  const newNameHandler=(event)=>{
    setNewName(event.target.value)
  }

  const newNumberHandler=(event)=>{
    setNewNumber(event.target.value)
  }

  const doNotification=(notification)=>{
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)      
    }, 5000);
  }

  const addPerson=(event)=>{
    event.preventDefault()
    const newPerson={name:newName,number:newNumber}
    const newPersonIndex=persons.findIndex(person=>person.name.toLowerCase()===newPerson.name.toLowerCase())
    if(newPersonIndex!==-1){
      const existedPerson=persons[newPersonIndex]
      const updatedPerson={...existedPerson,number:newNumber}
      if(!window.confirm(`${existedPerson.name} is already added to phonebook, replace number ${existedPerson.number} with ${updatedPerson.number}?`)){
        return
      }
      personService.update(updatedPerson)
      .then(returnedPerson=>{
        setPersons(persons.map(person=>person.id!==returnedPerson.id?person:returnedPerson))
        setNewName('')
        setNewNumber('')
        doNotification({message : `${existedPerson.name}'s number changed from ${existedPerson.number} to ${updatedPerson.number}`
                        ,preDefinedStyle : "Info"})
      })
      .catch(error=>{
        doNotification({message:error.message,preDefinedStyle : "Error"})
      })
    }
    else{
      personService
      .addNew(newPerson)
      .then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')      
        doNotification({message : `Added ${newPerson.name}`
                      ,preDefinedStyle : "Info"})

      })
      .catch(error=>{
        doNotification({message:error.message,preDefinedStyle : "Error"})
      })
    }
    
  }

  const nameFilterHandler=(event)=>{
    setNameFilter(event.target.value)
  }

  const personsToShow=persons.filter(person=>person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const deletePerson=(id)=>{
    const person=persons.find(person=>person.id===id)
    if(!window.confirm(`Delete ${person.name} ?`)){
      return
    }
    personService.deleteById(id)
    .then(()=>{
      setPersons(persons.filter(person=>person.id!==id))
      doNotification({message : `${person.name} removed from the server.`
                ,preDefinedStyle:"Info"})
    })
    .catch(error=>{
      setPersons(persons.filter(person=>person.id!==id))
      doNotification({message : `Information of ${person.name} has already been removed from the server.`
      ,preDefinedStyle : "Error"})
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter nameFilter={nameFilter} nameFilterHandler={nameFilterHandler}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNameHandler={newNameHandler} newNumber={newNumber} newNumberHandler={newNumberHandler}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deleteHandler={deletePerson} />
    </div>
  )
}

export default App