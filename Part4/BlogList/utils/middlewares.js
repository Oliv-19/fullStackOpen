const jwt = require('jsonwebtoken')
const User = require('../models/user')
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler =(error, req, res, next) => {
  if (error.name === 'CastError'){
    return res.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return res.status(400).json({ error: error.message })
  }else if(error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return res.status(400).json({error: 'expected "username" to be unique'})
  } else if (error.name === 'JsonWebTokenError'){
    return error.message == 'jwt must be provided' ?
      res.status(401).json({error: 'token must be provided'})
      : res.status(400).json({error: 'token invalid'})

  }
  next(error)
}

const tokenExtactor = ( request, response, next) => {
  const authorization = request.headers.authorization
  if(authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}


const userExtactor = async ( request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken. id){
      return response.status(400).json({error: 'token invalid'})
    }
    const user = await User.findById(decodedToken.id)
    if(user){
      request.user = user
    }
  next()
}

module.exports = {unknownEndpoint, errorHandler, tokenExtactor, userExtactor}