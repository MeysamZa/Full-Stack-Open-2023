const blogTestHelper=require('./blogs_test_helper')
const superTest=require('supertest')
const app=require('../app')
const Blog=require('../models/Blog')
const mongoose=require('mongoose')
const loginTestHelper=require('./login_test_helper')

const api=superTest(app)


let requestHeaders={}
beforeAll(async() => {
	const token=await loginTestHelper.userToken('user1','user1Password',api)
	requestHeaders = {
		'Authorization':`Bearer ${token}`
	}
})

beforeEach(async () => {
	await Blog.deleteMany({})
	for(let blog of blogTestHelper.initialBlogs){
		await api.post('/api/blogs')
			.send(blog)
			.set(requestHeaders)
	}
},50000)

describe('Blog list tests',() => {
	test('check returned amount of blogs',async() => {
		const response =
		await api.get('/api/blogs')
			.set(requestHeaders)
			.expect(200)
			.expect('Content-Type',/application\/json/)

		expect(response.body).toHaveLength(blogTestHelper.initialBlogs.length)
	},50000)

	test('check unique identifier property of the blog posts to be named id instead of _id',async() => {
		const response =
		await api.get('/api/blogs')
			.set(requestHeaders)
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
			.set(requestHeaders)
			.expect(201)

		delete response.body.id
		delete response.body.user
		expect(response.body).toEqual(sampleBlog)


		response =await api.get('/api/blogs').set(requestHeaders)
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
			.set(requestHeaders)
			.expect(201)

		expect(response.body.likes).toBe(0)
	},50000)

	test('check status code 400 if title or url properties are missed.',async() => {
		const sampleBlog1={
			author: 'Jack bean',
			url: 'https://example.com/',
			likes:10
		}

		await api
			.post('/api/blogs')
			.send(sampleBlog1)
			.set(requestHeaders)
			.expect(400)

		const sampleBlog2={
			title: 'OOP Programming',
			author: 'Jack bean',
			likes:10
		}

		await api
			.post('/api/blogs')
			.send(sampleBlog2)
			.set(requestHeaders)
			.expect(400)

	},50000)

	test('check status code 401 when token is not provided',async() => {
		const sampleBlog={
			title: 'OOP Programming',
			author: 'Jack bean',
			url: 'https://example.com/',
			likes: 3,
		}

		await api
			.post('/api/blogs')
			.send(sampleBlog)
			.expect(401)
	},50000)
})

describe('Blog deletion tests',() => {
	test('test an invalid id',async () => {
		const invalidId='24242423424'
		await api.delete(`/api/blogs/${invalidId}`)
			.set(requestHeaders)
			.expect(400)
	},50000)

	test('test successful deletion',async () => {
		const blogsInDBAtStart=await blogTestHelper.blogsInDB()
		const countAtStart=blogsInDBAtStart.length

		await api.delete(`/api/blogs/${blogsInDBAtStart[0].id}`)
			.set(requestHeaders)
			.expect(204)

		const blogsInDBAtEnd=await blogTestHelper.blogsInDB()
		const countAtEnd=blogsInDBAtEnd.length

		expect(countAtEnd).toBe(countAtStart-1)
	},5000)
})

describe('Blog update tests',() => {
	test('test an invalid id',async () => {
		const invalidId='24242423424'
		await api.put(`/api/blogs/${invalidId}`)
			.set(requestHeaders)
			.expect(400)
	},50000)

	test('test successful update',async () => {
		const blogsInDBAtStart=await blogTestHelper.blogsInDB()
		const randomBlogIndex=Math.floor((Math.random()*blogsInDBAtStart.length))

		const randomLikes=Math.floor((Math.random()*20))
		const blog={
			...blogsInDBAtStart[randomBlogIndex],
			likes:randomLikes
		}

		const updatedBlog=
		await api.put(`/api/blogs/${blogsInDBAtStart[randomBlogIndex].id}`)
			.send(blog)
			.set(requestHeaders)
			.expect(200)

		const blogInDB=await blogTestHelper.blogsInDbByID(blogsInDBAtStart[randomBlogIndex].id)

		expect(updatedBlog.body.likes).toBe(blogInDB.likes)
		expect(updatedBlog.body.likes).toBe(randomLikes)

	},5000)
})

afterAll(async () => {
	await mongoose.connection.close()
})
