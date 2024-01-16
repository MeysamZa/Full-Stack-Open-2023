const express=require('express')
const app=express()
app.use(express.json())

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
    responce.json(persons)
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

app.delete('/api/persons/:id',(request,responce)=>{
    const id=Number(request.params.id)
    persons=persons.filter(p=>p.id!==id)
    responce.status(204).end()
})

const generateNewID=()=>{
    const low=1000
    const high=100000000
    return Math.floor( Math.random()*(high-low))+low
}

app.post('/api/persons',(request,responce)=>{
    const body=request.body
    if(!body.name || !body.number){
        return responce.status(400).json({
            error:"all the fields (name,number) are required."})
    }
    else if(persons.findIndex(p=>p.name.toLowerCase()===body.name.toLowerCase())>-1){
        return responce.status(400).json({
            error:"name must be unique."})
    }
    const person={
        id:generateNewID(),
        name:body.name,
        number:body.number        
    }
    persons=persons.concat(person)
    responce.json(person)
})

const PORT=3001
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})