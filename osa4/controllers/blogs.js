const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  await user.save(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)

  if (blog !== null) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedblog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
  }
  
  const updated = await Blog.findByIdAndUpdate(request.params.id, updatedblog, {new: true})
  response.json(updated.toJSON())
})

  module.exports = blogsRouter