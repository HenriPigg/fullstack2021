const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Blogs should be identified with id', async () => {
  const allBlogs = await helper.blogsInDb()

  const firstBlog = allBlogs[0]

  expect(firstBlog.id).toBeDefined()

})

test('a blog can be added', async () => {
  const testBlog = {
      title: 'Test',
      author: 'Meikä',
      url: 'https://www.koira.com',
      likes: 1
  }

  await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

  
  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

  const content = blogs.map(i => i.title)
  expect(content).toContain('Test')
})

test('likes is set to zero by default if no value is set', async () => {
  const testBlog = {
    title: 'Test',
    author: 'Meikä',
    url: 'https://www.koira.com',
}

  const res = await api
      .post('/api/blogs')
      .send(testBlog) 
      .expect(200)
      .expect('Content-Type', /application\/json/)

  const newBlog = await Blog.findById(res.body.id)

  expect(newBlog.likes).toEqual(0)
})

test('a blog without a title and an url is not valid', async () => {
  const nonValidBlog = {
      author: 'Meikä',
      likes: 1
  }

  await api
      .post('/api/blogs')
      .send(nonValidBlog)
      .expect(400)

})

  afterAll(() => {
    mongoose.connection.close()
  })
  