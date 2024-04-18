const User=({ user }) => {
  if (!user){
    return null
  }
  return(
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul className="list-group">
        {user.blogs.map(blog => (
          <li className="list-group-item" key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </>
  )
}

export default User