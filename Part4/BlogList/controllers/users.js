const usersRouter=require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')

usersRouter.get('/',async (request, response) => {
	const returnedUsers=await User.find({})
	response.json(returnedUsers)
})

usersRouter.post('/', async(request, response) => {
	const { userName,password,name } = request.body
	const passwordHash=await bcrypt.hash(password,10)
	const user=new User({ name,userName,passwordHash })
	const saveduser=await user.save()
	response.status(201).json(saveduser)
})

module.exports=usersRouter
