const config=require('./utils/config')
const logger=require('./utils/logger')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const blogsRouter=require('./controllers/blogs')
const middleware=require('./utils/middleware' )
const usersRouter=require('./controllers/users')
const loginRouter=require('./controllers/login')
const mongoose = require('mongoose')


const mongoUrl = config.MONGODB_URI
logger.info('connecting to', mongoUrl.replace(/(.+:\/\/)(\w+:)(.+)(@.+)/,'$1$2********$4'))
mongoose.connect(mongoUrl)
	.then(() => logger.info('Successfully connected to MongoDB'))
	.catch(error => logger.error('Error in connecting to MongoDB:',error.message))

const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/users',usersRouter)
app.use('/api/blogs',middleware.userExtractor,blogsRouter)
app.use('/api/login',loginRouter)
if(process.env.NODE_ENV==='test'){
	const testingRouter=require('./controllers/testing')
	app.use('/api/testing',testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports =app