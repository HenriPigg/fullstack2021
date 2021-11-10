var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack2021:${password}@cluster0.qipog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
  type: String,
  minlength: 3,
  required: true,
  unique: true,
  }, 
  number: {
  type: String,
  minlength: 8,
  required: true,
  unique: true,
  }
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})


person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
  

Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
