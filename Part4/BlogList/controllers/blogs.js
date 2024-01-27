const blogsRouter=require('express').Router()
const Blog=require('../models/Blog')

blogsRouter.get('/',async (request, response) => {
	const returnedBlogs=await Blog.find({})
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

module.exports=blogsRouter
