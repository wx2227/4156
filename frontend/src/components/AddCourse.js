import React from 'react'
import { Button } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

export default function AddCourse (props) {
  function handleClick () {
    props.onClick({})
    history.push('/airnote/addcourse')
  }

  const history = useHistory()

  return (
    <>
      {
        Cookies.get('admin') === 'true'
          ? <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={handleClick} id='button'>+ Add Course</Button>
          : <div />
      }
    </>
  )
}
