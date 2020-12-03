import React, { useState, Fragment } from 'react'
import { Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

export default function CourseAutoComplete (props) {
  const [singleSelections, setSingleSelections] = useState([])

  const options = props.courses.map(course => course.course_number)
  console.log('options')
  console.log(options)

  return (
    <>
      <Form.Group>
        <Typeahead
          id='basic-typeahead-single'
          labelKey='name'
          onChange={setSingleSelections}
          options={options}
          placeholder='Course Number'
          selected={singleSelections}
        />
      </Form.Group>
    </>
  )
}
