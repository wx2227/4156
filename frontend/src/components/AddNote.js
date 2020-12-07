import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function AddNote (props) {
  const history = useHistory()

  function handleClick () {
    props.onClick({})
    history.push('/airnote/upload')
  }

  return (
    <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={handleClick} id='button'>+ Add Note</Button>
  )
}

export default AddNote
