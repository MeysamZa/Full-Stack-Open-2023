const blogsRouter=require('express').Router()
const Blog=require('../models/Blog')

blogsRouter.get('/',async (request, response) => {
	const returnedBlogs=await Blog.find({}).populate('user',{ userName:1,name:1 })
	response.json(returnedBlogs)
})

blogsRouter.post('/', async(request, response) => {
	const body = request.body
	const user = request.user
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url:body.url,
		likes:body.likes,
		user: user._id
	})
	const savedBlog = await blog.save()
	const savedBlogWithUser=await savedBlog.populate('user',{ userName:1,name:1 })
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlogWithUser)
})

blogsRouter.delete('/:id', async (request,response) => {
	const id=request.params.id
	const user = request.user
	const blog=await Blog.findById(id)
	if(blog.user.toString()===user._id.toString()){
		user.blogs=user.blogs.filter(blogId => blogId.toString()!==blog._id.toString())
		await user.save()
		await blog.deleteOne()
		response.status(204).end()
	}
	else{
		return response.status(401).json({ error: 'Invalid User' })
	}
})

blogsRouter.put('/:id', async (request,response) => {
	const id=request.params.id
	const blog=await Blog.findById(id)

	const blogToUpdate={
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
		user:request.body.user,
		...blog
	}

	const updatedBlog=	await Blog.findByIdAndUpdate(id,blogToUpdate,{ new:true })
	const updatedBlogWithUser=await updatedBlog.populate('user',{ userName:1,name:1 })
	response.json(updatedBlogWithUser)
})

blogsRouter.post('/:id/comments', async (request,response) => {
	const id=request.params.id
	const blog=await Blog.findById(id)
	blog.comments=blog.comments.concat(request.body.comment)

	const updatedBlog=	await Blog.findByIdAndUpdate(id,blog,{ new:true })
	const updatedBlogWithUser=await updatedBlog.populate('user',{ userName:1,name:1 })
	response.status(201).json(updatedBlogWithUser)
})

module.exports=blogsRouter
