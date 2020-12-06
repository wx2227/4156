import CoursePage from '../src/containers/CoursePage'
import { Card } from 'react-bootstrap'
import React from 'react'

describe('test CoursePage rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = (<CoursePage />)
  })

  // test('test basic CoursePage rendering', () => {
  //   expect(wrapper)
  // })

  // test('test CoursePage rendering with query parameter', () => {
  //   const match = { params: { department_name: 'computer science' } }
  //   const component = <CoursePage match={match} />
  //   expect(component.find(Card.length).toEqual(props.courses.length))
  //   expect(component.find(ShowCard).length).toEqual(preload.shows.length);
  // })

})