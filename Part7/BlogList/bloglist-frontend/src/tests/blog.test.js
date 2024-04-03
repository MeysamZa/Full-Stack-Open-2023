import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'


const loggedInUser={
  name:'Meysam Zahedi',
  userName:'MeysamZa'
}
const blog={
  title:'test React',
  author:'John Cena',
  url:'https://www.example.com',
  likes:5,
  user:{
    name:'Meysam Zahedi',
    userName:'MeysamZa'
  }
}

test('test Blog\'s default render',() => {
  const container=render(<Blog blog={blog} loggedInUser={loggedInUser} />).container
  const element1=screen.getByText(`${blog.title} ${blog.author}`)
  expect(element1).toBeDefined()
  const element2=container.querySelector('.extraBlogInfo')
  expect(element2).toHaveStyle('display:none')
})

test('test of blog\'s render after view button clicked',async() => {
  const container=render(<Blog blog={blog} loggedInUser={loggedInUser} />).container
  const user=userEvent.setup()
  const viewButton=screen.getByText('view')
  await user.click(viewButton)
  const element2=container.querySelector('.extraBlogInfo')
  expect(element2).not.toHaveStyle('display:none')
})

test('test number of calls of like button\'s event handler',async() => {
  const mockhandler=jest.fn()
  const container=render(<Blog blog={blog} loggedInUser={loggedInUser} handleLikeBlog={mockhandler} />).container
  const user=userEvent.setup()
  const viewButton=screen.getByText('view')
  await user.click(viewButton)
  const likeButton=screen.getByText('like')
  likeButton.onclick=mockhandler
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockhandler.mock.calls).toHaveLength(2)
})