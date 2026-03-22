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
    const users = await User.find({}).populate('blogs',{url:1, title:1, author: 1})
    res.json(users)
})

userRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate('blogs',{url:1, title:1, author: 1})
    res.json({username: user.username, name: user.name, blogs: user.blogs})
})

module.exports = userRouter

