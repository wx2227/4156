import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Preview from '../src/components/Preview'

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('render Preview', () => {
  act(() => {
    render(<Preview url='test' />, container)
  })
  const iframe = document.querySelector('iframe')
  expect(iframe.textContent).toBe('Preview')
})
