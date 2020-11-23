import React from 'react'
import { Button } from 'react-bootstrap'

function AddNote () {
  function handleClick () {
    window.location.href = '/airnote/upload'
  }

  return (
    <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={handleClick}>+ Add Note</Button>
  )
}

export default AddNote
