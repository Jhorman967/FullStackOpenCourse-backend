const express = require('express');
const { request } = require('http');

const app = express()

app.use(express.json())

let  persons = [ 
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





app.get('/', (request, response)=>{
    response.send('<h1>hello world!</h1>');
})


app.get('/api/persons',(request, response)=>{
    response.json(persons)
})


app.get('/api/info',(request, response)=>{
    response.send(`<h1>PhoneBook has info for ${persons.length} people <br/>
    ${Date()}
    </h1>`)
})

//I Can access the :id wit the paramater request
app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
    console.log(person)
})

app.delete('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

})


app.post('/api/persons',(request,response)=>{
    const randomId = Math.floor(Math.random() * 9000)
    const person = request.body
    person.id = randomId
    if(!person.name || !person.number ){
        response.status(404).json(
            {error:'content Missing'}
        )
    }else if (persons.find(per => per.name === person.name)){
        response.status(404).json({
            error:'name must be unique'
        })
    }else{
        persons = persons.concat(person)
        console.log(person)
        response.json(person)
    }
        
    })

const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})









