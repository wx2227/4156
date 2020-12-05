import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

export default function CourseAutoComplete (props) {
  const [singleSelections, setSingleSelections] = useState([])

  const options = props.courses.map(course => course.course_number)

  let changeSingleSelections = (option) => {
    setSingleSelections(option)
    props.handleSelectCourse(option)
  }

  return (
    <>
      <Form.Group>
        <Typeahead
          id='courseNumber'
          labelKey='name'
          onChange={changeSingleSelections}
          options={options}
          placeholder='Course Number'
          selected={singleSelections}
        />
      </Form.Group>
    </>
  )
}
