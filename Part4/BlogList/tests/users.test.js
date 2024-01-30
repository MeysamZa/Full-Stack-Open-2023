const userTestHelper=require('./users_test_helper')
const superTest=require('supertest')
const app=require('../app')
const User=require('../models/User')
const mongoose=require('mongoose')

const api=superTest(app)


beforeEach(async () => {
	await User.deleteMany({})
	for(let user of userTestHelper.initialUsers){
		await api.post('/api/users').send(user)
	}
},50000)

describe('User creation tests',() => {
	test('check successfull creation of a new user',async() => {
		const sampleUser={
			name: 'Meysam Zahedi',
			userName: 'MeysamZa',
			password: 'goodPassword',
		}

		let response=
		await api
			.post('/api/users')
			.send(sampleUser)
			.expect(201)

		response =await api.get('/api/users')
		expect(response.body).toHaveLength(userTestHelper.initialUsers.length+1)
	},50000)


	test('check if username or password properties are missed.',async() => {
		const sampleUser1={
			name: 'Sample User 1',
			username:'',
			password:'sampleUser1Password'
		}

		await api
			.post('/api/users')
			.send(sampleUser1)
			.expect(400)

		const sampleUser2={
			name: 'Sample User 2',
			userName: 'sampleUser2',
		}

		await api
			.post('/api/users')
			.send(sampleUser2)
			.expect(400)

		const usersInDB=await userTestHelper.usersInDB()
		expect(usersInDB).toHaveLength(userTestHelper.initialUsers.length)

	},50000)

	test('check if username or password lenght are less than 3 characters',async() => {
		const sampleUser1={
			name: 'Sample User 1',
			password:'sampleUser1Password'
		}

		await api
			.post('/api/users')
			.send(sampleUser1)
			.expect(400)

		const sampleUser2={
			name: 'Sample User 2',
			userName: 'sampleUser2',
			password:'p',
		}

		await api
			.post('/api/users')
			.send(sampleUser2)
			.expect(400)

		const usersInDB=await userTestHelper.usersInDB()
		expect(usersInDB).toHaveLength(userTestHelper.initialUsers.length)

	},50000)

	test('check if username is duplicated.',async() => {
		const sampleUser1={
			name: 'Sample User 1',
			userName:'user1',
			password:'sampleUser1Password'
		}

		await api
			.post('/api/users')
			.send(sampleUser1)
			.expect(400)

		const usersInDB=await userTestHelper.usersInDB()
		expect(usersInDB).toHaveLength(userTestHelper.initialUsers.length)

	},50000)

})


afterAll(async () => {
	await mongoose.connection.close()
})
