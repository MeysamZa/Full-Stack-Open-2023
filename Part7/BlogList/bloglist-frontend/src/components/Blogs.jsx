import { Link } from 'react-router-dom'

const Blogs=({ blogs }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }
  return (
    <>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="list-group"
        >
          <Link class="list-group-item list-group-item-action" to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </>
  )
}

export default Blogs