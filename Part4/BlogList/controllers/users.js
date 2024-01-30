const usersRouter=require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')

usersRouter.get('/',async (request, response) => {
	const returnedUsers=await User.find({})
	response.json(returnedUsers)
})

usersRouter.post('/', async(request, response) => {
	const { userName,password,name } = request.body
	if(userName===undefined || password===undefined){
		const error= new Error('Both username and password are required')
		error.name='ValidationError'
		throw error
	}
	if(userName.length<3 || password.length<3){
		const error= new Error('Both username and password must be at least 3 characters long')
		error.name='ValidationError'
		throw error
	}
	const passwordHash=await bcrypt.hash(password,10)
	const user=new User({ name,userName,passwordHash })
	const saveduser=await user.save()
	response.status(201).json(saveduser)
})

module.exports=usersRouter
