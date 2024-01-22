const dummy=(blogs) => {
	return 1
}

const totalLikes=(blogs) => {
	return blogs.reduce((sum,item) => {
		sum+=item.likes
		return sum
	},0)
}

module.exports={
	dummy,
	totalLikes
}