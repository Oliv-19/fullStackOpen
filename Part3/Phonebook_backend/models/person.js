const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})
.then(result=> console.log('connected to MongoDB'))
.catch(error=> console.log('error connecting to mongodDB:', error.message))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
personSchema.set('toJSON', {
    transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
}})

module.exports = mongoose.model('Person', personSchema)


