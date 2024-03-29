const mongoose = require('mongoose')

if (process.argv.length<3) {
	console.log('Password is required.')
	process.exit(1)
}
else if(process.argv.length===4){
	console.log('Number field of person is required.')
	process.exit(1)
}

const password = process.argv[2]

const url =`mongodb+srv://MeysamZa:${password}@cluster0.uzxlipp.mongodb.net/PhonebookDB?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){
	Person.find({}).then(result => {
		console.log('PhoneBook:')
		result.forEach(person => console.log(`${person.name} ${person.number}`))
		mongoose.connection.close()
	})
}
else{
	const person=new Person({
		name:process.argv[3],
		number:process.argv[4]
	})
	person.save().then(() => {
		console.log(`added ${person.name} number ${person.number} to phonebook`)
		mongoose.connection.close()
	})
}

