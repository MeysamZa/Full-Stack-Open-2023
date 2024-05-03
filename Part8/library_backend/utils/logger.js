const info=(...parsms) => {
	console.log(`${new Date().toLocaleString()} -`,...parsms)
}

const error=(...params) => {
	console.error(`${new Date().toLocaleString()} -`,...params)
}

module.exports={ info,error }