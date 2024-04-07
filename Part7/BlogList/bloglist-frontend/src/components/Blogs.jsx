import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs=({ loggedInUser }) => {
  const blogs=useSelector(state => state.blogs)
  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          loggedInUser={loggedInUser}
        />
      ))}
    </>
  )
}

export default Blogs