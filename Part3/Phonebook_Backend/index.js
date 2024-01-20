require('dotenv').config()

const express=require('express')
const morgan=require('morgan')
const cors=require('cors')
const Person=require('./model/Person')

const app=express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res)=>{ return req.method==='POST' ? JSON.stringify(req.body) : null})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(request,responce)=>{
    Person.find({})
    .then(returndPersons=>{
        responce.json(returndPersons)
    })
    .catch(error=>{
        console.log(error.message);
        responce.status(500).end()
    })
})

app.get('/info',(request,responce)=>{
    const now=new Date();
    responce.send(`<p>Phonebook as info for ${persons.length} people</p>
    <p>${now.toLocaleString()}</p>`)
})

app.get('/api/persons/:id',(request,responce)=>{
    const id=Number(request.params.id)
    const person=persons.find(p=>p.id===id)
    if(person){
        responce.json(person)
    }
    else{
        responce.status(400).end()
    }
})

app.delete('/api/persons/:id',(request,responce,next)=>{
    const id=request.params.id
    Person.findByIdAndDelete(id)
    .then(result=>responce.status(204).end())
    .catch(error=>next(error))
})

// const generateNewID=()=>{
//     const low=1000
//     const high=100000000
//     return Math.floor( Math.random()*(high-low))+low
// }

app.post('/api/persons',(request,responce)=>{
    const body=request.body
    if(!body.name || !body.number){
        return responce.status(400).json({
            error:"all the fields (name,number) are required."})
    }
    // else if(persons.findIndex(p=>p.name.toLowerCase()===body.name.toLowerCase())>-1){
    //     return responce.status(400).json({
    //         error:"name must be unique."})
    // }
    const person=new Person({
        name:body.name,
        number:body.number
    })
    person.save()
    .then(savedPerson=>{
        responce.json(savedPerson)
    })
    .catch(error=>{
        console.log(error.message);
        responce.status(500).end()
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
