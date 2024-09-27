import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Display from '../Display'
import Show from '../Show'

import fetchShow from '../../api/fetchShow'
import { act } from 'react-dom/test-utils'
jest.mock('../../api/fetchShow')

const testShow = {
  name: 'Show Name',
  summary: 'Show summary',
  image: '',
  seasons: [
    {
      id: 0,
      name: 'Season 1',
      episodes: []
    },
    {
      id: 1,
      name: 'Season 2',
      episodes: []
    },
    {
      id: 2,
      name: 'Season 3',
      episodes: []
    },
    {
      id: 3,
      name: 'Season 4',
      episodes: []
    }
  ]
}

test('Display component renders without any passed props', () => {
  render(<Display />)
})

test('When button is clicked, show component displays', async () => {
  fetchShow.mockResolvedValueOnce(testShow)
  render(<Display />)
  const button = screen.getByRole('button')
  act(() => {
    userEvent.click(button)
  })
  const show = await screen.findByText('Show Name')
  expect(show).toBeInTheDocument()
})

test('When button is clicked, select options rendered is equal to the number of seasons', async () => {
  fetchShow.mockResolvedValueOnce(testShow)
  render(<Display />)
  const button = screen.getByRole('button')
  act(() => {
    userEvent.click(button)
  })
  const show = await screen.findByText('Show Name')
  expect(show).toBeInTheDocument()
  const dropdown = screen.getByRole('combobox')
  expect(dropdown).toHaveLength(5)
})

test('When button is clicked, function is called', async () => {
  fetchShow.mockResolvedValueOnce(testShow)
  const fakeFunc = jest.fn()
  render(<Display displayFunc={fakeFunc} />)
  const button = screen.getByRole('button')
  act(() => {
    userEvent.click(button)
  })
  const show = await screen.findByText('Show Name')
  expect(show).toBeInTheDocument()
  expect(fakeFunc).toBeCalledTimes(1)
})


/*
  Tasks:
    1. Add in necessary imports and values to establish the testing suite.
    2. Test that the Display component renders without any passed in props.
    3. Rebuild or copy a show test data element as used in the previous set of tests.
    4. Test that when the fetch button is pressed, the show component will display. Make sure to 
      account for the api call and change of state in building your test.
    5. Test that when the fetch button is pressed, the amount of select options rendered is equal 
      to the amount of seasons in your test data.
  6. Notice the optional functional prop passed in to the Display component client code. Test that 
     when the fetch button is pressed, this function is called.
*/