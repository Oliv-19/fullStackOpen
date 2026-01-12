const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body
    if(password && password.length > 3){
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            name,
            passwordHash
        })
        const savedUser = await user.save()
        return res.status(201).json(savedUser)
    }
    return res.status(400).json({error: 'invalid user'}) 
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

module.exports = userRouter

