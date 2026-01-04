const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
})

test('all blogs are returned', async ()=> {
    const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)


    assert.strictEqual(response.body.length, helper.blogs.length)
})

test('unique identifier is named id instead of _id', async ()=> {
    const response = await api
    .get(`/api/blogs`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual('_id' in response.body[0], false)
    assert.strictEqual('id' in response.body[0], true)

})

after(async () => {
    await mongoose.connection.close()
})