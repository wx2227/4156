import React from 'react'
import { Route } from 'react-router-dom'

import NotesView from './components/NotesListView'
import NoteDetailView from './components/NoteDetailView'
import UploadForm from './components/UploadForm'
import Mainpage from './containers/MainPage'
import profile from './componets/PersonalPage'

const BaseRouter = () => (
  <div>
    <Route exact path='/airnote/main' component={Mainpage} />
    <Route exact path='/airnote/note/:noteID' component={NoteDetailView} />
    <Route exact path='/airnote/notes' component={NotesView} />
    <Route exact path='/airnote/notes/:course_number' component={NotesView} />
    <Route exact path='/airnote/upload' component={UploadForm} />
    <Route exact path='/airnote/profile' component={profile} />
  </div>
)

export default BaseRouter
