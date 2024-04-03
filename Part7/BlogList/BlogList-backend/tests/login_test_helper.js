const userToken=async(userName,password,api) => {

	const response=await api
		.post('/api/login')
		.send({ userName,password })

	return response.body.token

}

module.exports={
	userToken,
}