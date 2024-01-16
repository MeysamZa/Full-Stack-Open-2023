const express=require('express')
const app=express()

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

const PORT=3001
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})