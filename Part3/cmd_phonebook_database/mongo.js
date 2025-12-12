const mongoose = require('mongoose')

if( process.argv.length < 3){
    console.log('password missing');
    process.exit(1)  
}
const password = process.argv[2]
const url = `mongodb+srv://user_1:${password}@cluster0.zftxiyq.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if( process.argv.length >3){
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
      name: name,
      number: number,
    })
    
    person.save().then(result => {
      console.log(`added ${result.name} ${result.number} to phonebook`)
      mongoose.connection.close()
    })

} else if ( process.argv.length == 3){
    Person.find({}).then(result=>{
        console.log('Phonebook: ');
        
        result.forEach(person=>{
            console.log(person.name, person.number);

        })
        
        mongoose.connection.close()
    })
}

