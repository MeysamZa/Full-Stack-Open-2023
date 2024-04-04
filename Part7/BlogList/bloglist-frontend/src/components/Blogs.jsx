import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs=({ handleLikeBlog,loggedInUser,handleRemoveBlog }) => {
  const blogs=useSelector(state => state.blogs)
  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeBlog={handleLikeBlog}
          loggedInUser={loggedInUser}
          handleRemoveBlog={handleRemoveBlog}
        />
      ))}
    </>
  )
}

export default Blogs