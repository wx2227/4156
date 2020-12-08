import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotesListView from './components/NotesListView'
import NoteDetailView from './components/NoteDetailView'
import UploadForm from './components/UploadForm'
import CoursePage from './containers/CoursePage'
import profile from './components/PersonalPage'
import DepartmentsListView from './components/DepartmentsListView'
import AddCourseView from './components/AddCourseView'

const BaseRouter = () => (
  <Switch>
    <Route exact path='/airnote/department' component={DepartmentsListView} />
    <Route exact path='/airnote/courses' component={CoursePage} />
    <Route exact path='/airnote/courses/:department_name' component={CoursePage} />
    <Route exact path='/airnote/note/:noteID' component={NoteDetailView} />
    <Route exact path='/airnote/notes' component={NotesListView} />
    <Route exact path='/airnote/notes/:course_number' component={NotesListView} />
    <Route exact path='/airnote/upload' component={UploadForm} />
    <Route exact path='/airnote/profile' component={profile} />
    <Route exact path='/airnote/addcourse' component={AddCourseView} />
  </Switch>
)

export default BaseRouter
