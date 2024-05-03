const config=require('./utils/config')
const logger=require('./utils/logger')
const mongoose = require('mongoose')


const mongoUrl = config.MONGODB_URI
logger.info('connecting to', mongoUrl.replace(/(.+:\/\/)(\w+:)(.+)(@.+)/,'$1$2********$4'))
mongoose.connect(mongoUrl)
	.then(() => logger.info('Successfully connected to MongoDB'))
	.catch(error => logger.error('Error in connecting to MongoDB:',error.message))


module.exports=mongoose