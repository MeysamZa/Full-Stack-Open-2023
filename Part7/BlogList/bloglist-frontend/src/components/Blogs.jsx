import Blog from './Blog'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const Blogs=() => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  if(!result.isSuccess){
    return (<div>blogs service not available due to problems in server</div>)
  }

  const blogs = result.data
  blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)

  return(
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </>
  )
}

export default Blogs