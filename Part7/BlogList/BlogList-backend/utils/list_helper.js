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

const mostBlogs=(blogs) => {
	const authorBlogs={}
	let authorWithMostBlogs=''
	blogs.forEach(blog => {
		if(authorBlogs[blog.author]===undefined){
			authorBlogs[blog.author]=1
		}
		else{
			authorBlogs[blog.author]+=1
		}

		if(authorWithMostBlogs===''){
			authorWithMostBlogs=blog.author
		}

		if(authorBlogs[blog.author]>authorBlogs[authorWithMostBlogs]){
			authorWithMostBlogs=blog.author
		}
	})

	if(blogs.length===0){
		return null
	}

	return{
		author:authorWithMostBlogs,
		blogs:authorBlogs[authorWithMostBlogs]
	}
}

const mostLikes=(blogs) => {
	const authorLikes={}
	let authorWithMostLikes=''
	blogs.forEach(blog => {
		if(authorLikes[blog.author]===undefined){
			authorLikes[blog.author]=blog.likes
		}
		else{
			authorLikes[blog.author]+=blog.likes
		}

		if(authorWithMostLikes===''){
			authorWithMostLikes=blog.author
		}

		if(authorLikes[blog.author]>authorLikes[authorWithMostLikes]){
			authorWithMostLikes=blog.author
		}
	})

	if(blogs.length===0){
		return null
	}

	return{
		author:authorWithMostLikes,
		likes:authorLikes[authorWithMostLikes]
	}
}

module.exports={
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}