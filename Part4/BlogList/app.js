const express = require('express')
const mongoose = require('mongoose')
const BlogRouter = require('./controllers/blogs')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
const { unknownEndpoint, errorHandler } = require('./utils/middlewares')

const app = express()
mongoose.connect(config.MONGODB_URI, { family: 4 })
.then(() => {
    console.log('connected to MongoDB');
})
.catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
    
})

app.use(express.json())

app.use('/api/blogs', BlogRouter)
app.use('/api/users', userRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports= app