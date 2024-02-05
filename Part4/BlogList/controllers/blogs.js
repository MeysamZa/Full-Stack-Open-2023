const blogsRouter=require('express').Router()
const Blog=require('../models/Blog')
const jwt = require('jsonwebtoken')
const User=require('../models/User')

blogsRouter.get('/',async (request, response) => {
	const returnedBlogs=await Blog.find({}).populate('user',{ userName:1,name:1 })
	response.json(returnedBlogs)
})

blogsRouter.post('/', async(request, response) => {
	const body = request.body
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url:body.url,
		likes:body.likes,
		user: user._id
	})
	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
	const id=request.params.id
	await Blog.findByIdAndDelete(id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
	const id=request.params.id
	const blog={
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes
	}
	const updatedBlog=	await Blog.findByIdAndUpdate(id,blog,{ new:true })
	response.json(updatedBlog)
})

module.exports=blogsRouter
