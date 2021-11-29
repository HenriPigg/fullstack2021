const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
    const authorBlogs = _.countBy(blogs, 'author')

    const theMostBlogs = _.max(Object.keys(authorBlogs), authors => authorBlogs[authors])

    return {
        author: theMostBlogs,
        blogs: authorBlogs[theMostBlogs]
    }
}

const mostLikes = (blogs) => {
    const groupByAuthor = _.groupBy(blogs, 'author')
    const authorLikes = _(groupByAuthor).map((blog, author) => ({
        author: author,
        likes: _.sumBy(blog, 'likes')
    })).value()

    return _.maxBy(authorLikes, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    mostBlogs,
    mostLikes
}