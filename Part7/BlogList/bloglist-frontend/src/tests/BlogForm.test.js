import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'



test('test new blog form',async() => {
  const newBlog={
    title:'React test',
    author:'John Cena',
    url:'http://example.com'
  }
  const mockHandler=jest.fn()
  const container=render(<BlogForm handleCreateBlog={mockHandler}/>).container
  const user=userEvent.setup()
  const titleInput=container.querySelector('#title')
  await user.type(titleInput,newBlog.title)
  const authorInput=container.querySelector('#author')
  await user.type(authorInput,newBlog.author)
  const urlInput=container.querySelector('#url')
  await user.type(urlInput,newBlog.url)
  const createButton=screen.getByText('create')
  createButton.onclick=() => mockHandler(newBlog)
  await user.click(createButton)
  expect(mockHandler.mock.calls[0][0].title).toEqual('React test')

})


