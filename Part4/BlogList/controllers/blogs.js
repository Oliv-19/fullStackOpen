const BlogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtactor } = require('../utils/middlewares')

BlogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
  
})
BlogRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

BlogRouter.post('/', userExtactor, async(request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  blog.likes = request.body.likes? request.body.likes : 0

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  response.status(201).json(newBlog)
})

BlogRouter.put('/:id', userExtactor, async(request, response) => {
  const { likes } = request.body
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() == user.id.toString()){
    blog.likes = likes
    const updated = await blog.save()
    response.json(updated)

  }
})

BlogRouter.delete('/:id', userExtactor, async(request, response) => {
  const user = request.user
  
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() == user.id.toString()){
    await blog.deleteOne()
    response.status(204).end()
  }
  
  
})

module.exports = BlogRouter