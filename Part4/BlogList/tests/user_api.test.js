const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)
describe('user tests', () => {
    beforeEach(async()=>{
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({username: 'root',passwordHash})
        await user.save()
    })
    test('returns all users', async()=> {
        const usersAtStart = await helper.usersInDb()

        const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, usersAtStart.length)
    })
    test('creates new user succesfully', async () => {
        const usersAtStart = await helper.usersInDb()
        const user = {
            username: 'test',
            user: 'test',
            password: 'secret'
        }
        await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        const usernames = usersAtEnd.map(user=> user.username)
        assert(usernames.includes(user.username))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length +1)
    })
    test('throws error when username is missing', async() =>{
         const usersAtStart = await helper.usersInDb()
        const user = {
            username: '',
            user: 'test',
            password: 'secret'
        }
        await api
        .post('/api/users')
        .send(user)
        .expect(400)

        const usersAtEnd = await helper.usersInDb()

        const usernames = usersAtEnd.map(user=> user.username)
        assert(!usernames.includes(user.username))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length )
    })
    test('throws error when username length is less than 3 characters', async() =>{
         const usersAtStart = await helper.usersInDb()
        const user = {
            username: 'hi',
            user: 'test',
            password: 'secret'
        }
        await api
        .post('/api/users')
        .send(user)
        .expect(400)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test('user without password is not added', async() =>{
         const usersAtStart = await helper.usersInDb()
        const user = {
            username: 'hi',
            user: 'test',
        }
        await api
        .post('/api/users')
        .send(user)
        .expect(400)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test('user with password length less than 3 characters is not added', async() =>{
         const usersAtStart = await helper.usersInDb()
        const user = {
            username: 'hi',
            user: 'test',
        }
        await api
        .post('/api/users')
        .send(user)
        .expect(400)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    
})
after(async () => {
    await mongoose.connection.close()
})
