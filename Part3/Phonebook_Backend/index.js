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

// let persons=[
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons',(request,responce,next)=>{
    Person.find({})
    .then(returndPersons=>{
        responce.json(returndPersons)
    })
    .catch(error=>next(error))
})

app.get('/info',(request,responce,next)=>{
    Person.countDocuments({})
    .then(count=>{
        const now=new Date();
        responce.send(`<p>Phonebook has info for ${count} people</p>
        <p>${now.toLocaleString()}</p>`)
    })
    .catch(error=>next(error))    
})

app.get('/api/persons/:id',(request,responce,next)=>{
    const id=request.params.id
    Person.findById(id)
    .then(returndPerson=>{
        if(returndPerson){
            responce.json(returndPerson)
        }
        else{
            responce.status(404).end()
        }
    })
    .catch(error=>next(error))
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

app.post('/api/persons',(request,responce,next)=>{
    const body=request.body
    // if(!body.name || !body.number){
    //     return responce.status(400).json({
    //         error:"all the fields (name,number) are required."})
    // }
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
    .catch(error=>next(error))
})

app.put('/api/persons/:id',(request,responce,next)=>{
    const id=request.params.id
    const person={
        name:request.body.name,
        number:request.body.number
    }
    Person.findByIdAndUpdate(id,person,{new: true, runValidators: true, context: 'query'})
    .then(updatedPerson=>responce.json(updatedPerson))
    .catch(error=>next(error))
})

const unknownEndpoint=(request,responce)=>{
    responce.status(404).send({error:"Unknown endpoint"})
}
app.use(unknownEndpoint)

const errorHandler=(error,request,responce,next)=>{
    console.log(error.message);
    if(error.name==='CastError'){
        responce.status(400).send({error:'Incorrect ID format'})
    }
    else if(error.name==='ValidationError'){
        responce.status(400).send({error:error.message})
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
