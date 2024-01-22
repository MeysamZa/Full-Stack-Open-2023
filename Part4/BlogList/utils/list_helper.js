const dummy=(blogs) => {
	return 1
}

const totalLikes=(blogs) => {
	return blogs.reduce((sum,item) => {
		sum+=item.likes
		return sum
	},0)
}

const favoriteBlog=(blogs) => {
	const blogWithMostLikes = blogs.reduce((blog_With_Most_Likes,item) => {
		if(item.likes>blog_With_Most_Likes.likes){
			return item
		}
		else{
			return blog_With_Most_Likes
		}	}
	,blogs[0])

	if(!blogWithMostLikes){
		return null
	}

	return {
		title:blogWithMostLikes.title,
		author:blogWithMostLikes.author,
		likes:blogWithMostLikes.likes
	}
}

module.exports={
	dummy,
	totalLikes,
	favoriteBlog
}