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

test('saves new blog succesfully', async ()=> {
    const newBlog = {
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    } 
    await api
    .post(`/api/blogs`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    assert.strictEqual(blogsInDb.length, helper.blogs.length+1)

    const titles = blogsInDb.map(b=> b.title)
    assert(titles.includes(newBlog.title))

})

test('likes default to 0 when new blog is created', async ()=> {
    const newBlog = {
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    } 
    await api
    .post(`/api/blogs`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const blogsInDb = await helper.blogsInDb()
    const blog = blogsInDb.find(b=> b.title == newBlog.title)
    
    assert.strictEqual(blog.likes, 0)

})
test('throws error when title is missing', async ()=> {
    const newBlog = {
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',

    } 
    await api
    .post(`/api/blogs`)
    .send(newBlog)
    .expect(400)

    const blogsInDb = await helper.blogsInDb()
    assert.strictEqual(blogsInDb.length, helper.blogs.length)

})
test('throws error when url is missing', async ()=> {
    const newBlog = {
        title: 'Go To Statement Considered Harmful 2',
        author: 'Edsger W. Dijkstra',
    } 
    await api
    .post(`/api/blogs`)
    .send(newBlog)
    .expect(400)

    const blogsInDb = await helper.blogsInDb()
    assert.strictEqual(blogsInDb.length, helper.blogs.length)

})
test('throws error when title and url are missing', async ()=> {
    const newBlog = {
        author: 'Edsger W. Dijkstra',
    } 
    await api
    .post(`/api/blogs`)
    .send(newBlog)
    .expect(400)

    const blogsInDb = await helper.blogsInDb()
    assert.strictEqual(blogsInDb.length, helper.blogs.length)

})
test('deletes blog succesfully', async ()=> {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b=> b.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.blogs.length-1)

})



after(async () => {
    await mongoose.connection.close()
})