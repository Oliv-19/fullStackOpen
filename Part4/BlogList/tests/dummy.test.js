const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

  
test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes ', ()=> {
    test('is zero when empty', ()=>{
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })
    test('returns likes of blog when is only one', ()=>{
        const result = listHelper.totalLikes(helper.listWithOneBlog)
        assert.strictEqual(result, 5)
    })
    test('returns correct number of likes', ()=>{
        const result = listHelper.totalLikes(helper.blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favorite blog', ()=>{
   
    test('returns {} when empty', () => {
        const result = listHelper.favoriteBlog([])
        assert.deepStrictEqual(result, {})
    })
    test('returns blog when is only one', () => {
        const result = listHelper.favoriteBlog(helper.listWithOneBlog)
        assert.deepStrictEqual(result, helper.listWithOneBlog[0])
    })
    test('returns correct blog', () => {
        const result = listHelper.favoriteBlog(helper.blogs)
        assert.deepStrictEqual(result, helper.blogs[2])
    })
})

describe('most blogs', ()=>{
   
    test('returns {} when empty', () => {
        const result = listHelper.mostBlogs([])
        assert.deepStrictEqual(result, {})
    })
    test('returns author when is only one', () => {
        const result = listHelper.mostBlogs(helper.listWithOneBlog)
        assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', blogs: 1})
    })
    test('returns correct author', () => {
        const result = listHelper.mostBlogs(helper.blogs)
        assert.deepStrictEqual(result, {author: 'Robert C. Martin', blogs: 3})
    })
})
describe('most likes', ()=>{

    test('returns {} when empty', () => {
        const result = listHelper.mostLikes([])
        assert.deepStrictEqual(result, {})
    })
    test('returns author when is only one', () => {
        const result = listHelper.mostLikes(helper.listWithOneBlog)
        assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', likes: 5})
    })
    test('returns correct author', () => {
        const result = listHelper.mostLikes(helper.blogs)
        assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', likes: 17})
    })
})

