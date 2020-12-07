import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

class AddNote extends React.Component {
  constructor (props) {
    super(props)
  }

  handleClick () {
    useHistory().push('/airnote/upload')
  }

  render () {
    return (
      <Button variant='outline-success' style={{ marginRight: '10px' }} onClick={() => this.handleClick()} id='button'>+ Add Note</Button>
    )
  }
}

export default AddNote
