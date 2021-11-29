const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {

    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]

      const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a421aa71b56a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Meikä',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 8,
            __v: 0
          }
      ]
    
    test('totaLikes returns 0', () => {

    const noBlogs = []

    const result = listHelper.totalLikes(noBlogs)
    expect(result).toBe(0)
    })

    test('totalLikes returns only one blog', () => {
        const blogs = [1] 
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('totalLikes returns the sum of a bigger list', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(13)
    })

})

describe('mostBlogs', () => {

    const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a421aa71b56a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Meikä',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 8,
            __v: 0
          },
          {
            _id: '5a421aa71b56a675234d17f9',
            title: 'Go To Statement Considered Harmful',
            author: 'Meikä',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 11,
            __v: 0
          }
      ]

    test('returns the author with the most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        expect(result).toStrictEqual({"author": "Meikä", "blogs": 2 })
    })
})

describe('mostBlogs', () => {

    const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a421aa71b56a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Meikä',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 8,
            __v: 0
          },
          {
            _id: '5a421aa71b56a675234d17f9',
            title: 'Go To Statement Considered Harmful',
            author: 'Meikä',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 11,
            __v: 0
          }
      ]

      test('returns the author and blogs with the most likes', () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs)
        expect(result).toStrictEqual({"author": "Meikä", "likes": 19})
    })

})