const blogsRouter=require('express').Router()
const Blog=require('../models/Blog')

blogsRouter.get('/',async (request, response) => {
	const returnedBlogs=await Blog.find({})
	response.json(returnedBlogs)
})

blogsRouter.post('/', (request, response,next) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
		.catch(error => next(error))
})

module.exports=blogsRouter
