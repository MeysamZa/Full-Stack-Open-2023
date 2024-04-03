const User=require('../models/User')
const initialUsers = [{
	name: 'User 1',
	userName: 'user1',
	password: 'user1Password',
},
{
	name: 'User 2',
	userName: 'user2',
	password: 'user2Password',
}
]

const usersInDB=async() => {
	const returnedUsers= await User.find({})
	return returnedUsers.map(user => user.toJSON())
}

const usersInDbByID=async( id ) => {
	const returnedUser= await User.findById(id)
	return returnedUser.toJSON()
}

module.exports={
	initialUsers,
	usersInDB,
	usersInDbByID
}