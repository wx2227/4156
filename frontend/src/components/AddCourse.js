import React from 'react'
import { Button } from 'react-bootstrap'
import Cookies from 'js-cookie'

export default function AddCourse () {
  function handleClick () {
    window.location.href = '/airnote/addcourse'
  }

  console.log(Cookies.get('admin'))

  return (
    <>
      {/* <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={handleClick}>+ Add Course</Button> */}
      {
        Cookies.get('admin') === 'true'
          ? <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={handleClick}>+ Add Course</Button>
          : <div />
      }
    </>
  )
}
