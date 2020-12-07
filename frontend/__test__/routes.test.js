import React from 'react'
import { shallow } from 'enzyme'
import BaseRouter from '../src/routes.js' 

import { Route, Switch } from 'react-router-dom'

import NotesListView from '../src/components/NotesListView'
import NoteDetailView from '../src/components/NoteDetailView'
import UploadForm from '../src/components/UploadForm'
import CoursePage from '../src/containers/CoursePage'
import profile from '../src/components/PersonalPage'
import DepartmentsListView from '../src/components/DepartmentsListView'
import AddCourseView from '../src/components/AddCourseView'


describe('Basic Routes', () => {
  it('Should show all basic routes', () => {
    let wrapper = shallow(<BaseRouter />)
    const basicRoutes =  (<Switch>
    <Route exact path='/airnote/department' component={DepartmentsListView} />
    <Route exact path='/airnote/courses' component={CoursePage} />
    <Route exact path='/airnote/courses/:department_name' component={CoursePage} />
    <Route exact path='/airnote/note/:noteID' component={NoteDetailView} />
    <Route exact path='/airnote/notes' component={NotesListView} />
    <Route exact path='/airnote/notes/:course_number' component={NotesListView} />
    <Route exact path='/airnote/upload' component={UploadForm} />
    <Route exact path='/airnote/profile' component={profile} />
    <Route exact path='/airnote/addcourse' component={AddCourseView} />
  </Switch>)
    expect(wrapper.contains(basicRoutes)).toEqual(true)
  })

})



