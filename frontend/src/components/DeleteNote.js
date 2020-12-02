import React from 'react'
import Cookies from 'js-cookie'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from '../services/axios'

export default function DeleteNote (props) {
  const history = useHistory()

  function handleClick () {
    axios.delete(`http://127.0.0.1:8000/api/note/${props.note.id}`)
      .then(() => history.push((`/airnote/notes/?course_number=${props.note.course_number}`)))
      .catch(() => alert('cannot delete note'))
  }

  return (
    <>
      {props.note.user_id === parseInt(Cookies.get('user_id'))
        ? (<Button variant='danger' onClick={handleClick} style={{ width: '150px' }}> Delete File </Button>)
        : (<div />)}
    </>
  )
}
