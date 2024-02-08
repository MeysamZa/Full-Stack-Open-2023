import { useState } from "react"
const Blog = ({ blog }) => {
  const [visible,setVisible]=useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const extraInfoDisplayStyle={display:visible?'':'none'}

  const toggleVisible=()=>setVisible(!visible)

return (  
  <div style={blogStyle}>
    {blog.title} <button onClick={toggleVisible}>{visible?'hide':'view'}</button>
    <div style={extraInfoDisplayStyle}>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button>like</button></p>
      <p>{blog.author}</p>
    </div>
  </div>  
)
}

export default Blog