import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function AddNote () {

  return (
    <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={useHistory().push('/airnote/upload')} id='button'>+ Add Note</Button>
  )
}

export default AddNote
