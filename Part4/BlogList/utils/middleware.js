const logger=require('./logger')
const jwt = require('jsonwebtoken')
const User=require('../models/User')

const requestLogger=(request,response,next) => {
	logger.info(request.method,request.path,request.body)
	next()
}

const unknownEndpoint=(request,response) => {
	response.status(404).send({
		error:'unknown endpoint'
	})
}

const errorHandler=(error,request,response,next) => {
	logger.error(error.message)
	if(error.name==='CastError'){
		response.status(400).send({
			error:'Incorrect ID format'
		})
	}
	else if(error.name==='ValidationError'){
		response.status(400).send({
			error:error.message
		})
	}
	else if(error.name==='JsonWebTokenError'){
		response.status(401).send({
			error:'Invalid Token'
		})
	}
	next(error)
}

const tokenExtractor=(request,response,next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		request.token= authorization.replace('Bearer ', '')
	}
	else{
		request.token=null
	}
	next()
}

const userExtractor=async (request,response,next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	request.user=await User.findById(decodedToken.id)
	next()
}

module.exports={ requestLogger,unknownEndpoint,errorHandler,tokenExtractor,userExtractor }
