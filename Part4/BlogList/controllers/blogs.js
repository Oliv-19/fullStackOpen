const BlogRouter = require('express').Router()
const Blog = require('../models/blog')


BlogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  
})

BlogRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  blog.likes = request.body.likes? request.body.likes : 0

  const newBlog = await blog.save()
  response.status(201).json(newBlog)
  
})

module.exports = BlogRouter