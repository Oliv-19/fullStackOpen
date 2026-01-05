const BlogRouter = require('express').Router()
const Blog = require('../models/blog')


BlogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  
})

BlogRouter.post('/', async(request, response) => {
  if(request.body.title && request.body.url){
    const blog = new Blog(request.body)
    blog.likes = request.body.likes? request.body.likes : 0
  
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  }else {
    response.status(400).end()
  }
  
})
BlogRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = BlogRouter