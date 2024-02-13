import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

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