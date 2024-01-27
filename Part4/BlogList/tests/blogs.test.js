const blogTestHelper=require('./blogs_test_helper')
const superTest=require('supertest')
const app=require('../app')
const Blog=require('../models/Blog')
const mongoose=require('mongoose')

const api=superTest(app)


beforeEach(async () => {
	await Blog.deleteMany({})
	for(let blog of blogTestHelper.initialBlogs){
		let blogObject=new Blog(blog)
		await blogObject.save()
	}
},50000)

describe('Blog list tests',() => {
	test('check returned amount of blogs',async() => {
		const response =
		await api.get('/api/blogs')
			.expect(200)
			.expect('Content-Type',/application\/json/)

		expect(response.body).toHaveLength(blogTestHelper.initialBlogs.length)
	},50000)

	test('check unique identifier property of the blog posts to be named id instead of _id',async() => {
		const response =
		await api.get('/api/blogs')
			.expect(200)
			.expect('Content-Type',/application\/json/)

		expect(response.body[0].id).toBeDefined()
	},50000)

	test('check successfull creation of a new blog',async() => {
		const sampleBlog={
			title: 'OOP Programming',
			author: 'Jack bean',
			url: 'https://example.com/',
			likes: 3,
		}

		let response=
		await api
			.post('/api/blogs')
			.send(sampleBlog)
			.expect(201)

		delete response.body.id
		expect(response.body).toEqual(sampleBlog)


		response =await api.get('/api/blogs')
		expect(response.body).toHaveLength(blogTestHelper.initialBlogs.length+1)
	},50000)

	test('check default value of 0 for likes property if it is missed is the request',async() => {
		const sampleBlog={
			title: 'OOP Programming',
			author: 'Jack bean',
			url: 'https://example.com/',
		}

		let response=
		await api
			.post('/api/blogs')
			.send(sampleBlog)
			.expect(201)

		expect(response.body.likes).toBe(0)
	},50000)

})

afterAll(async () => {
	await mongoose.connection.close()
})
