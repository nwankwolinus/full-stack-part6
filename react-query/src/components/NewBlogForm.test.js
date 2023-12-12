import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/'
import CreateForm from './CreateForm'

test('<CreateForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateForm createBlog={createBlog} />)

  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')


  fireEvent.change(author, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
})