const blogsRouter=require('express').Router()
const Blog=require('../models/Blog')

blogsRouter.get('/',async (request, response) => {
	const returnedBlogs=await Blog.find({}).populate('user',{ userName:1,name:1 })
	response.json(returnedBlogs)
})

blogsRouter.post('/', async(request, response) => {
	const blog = new Blog(request.body)
	const savedBlog=await blog.save()
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
