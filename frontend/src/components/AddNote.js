import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function AddNote () {
  const history = useHistory()

  function handleClick () {
    history.push('/airnote/upload')
  }

  return (
    <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={handleClick}>+ Add Note</Button>
  )
}

export default AddNote
