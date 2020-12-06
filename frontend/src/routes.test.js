import React from 'react';
import { MemoryRouter} from 'react-router';
import { mount, shallow } from 'enzyme';
import BaseRouter from './routes.js'
import CoursePage from './containers/CoursePage'
import DepartmentsListView from '../src/components/DepartmentsListView'
import NoteDetailView from '../src/components/NoteDetailView'
import NotesListView from '../src/components/NotesListView'
import UploadForm from '../src/components/UploadForm'
import AddCourseView from '../src/components/AddCourseView'
import profile from '../src/components/PersonalPage'


describe('routes using memory router', () => {
  it('should show nothing for /random', () => {
    const component = mount(
    <MemoryRouter initialentries="{['/random']}">
      <BaseRouter/>
    </MemoryRouter>
    );
    expect(component.find(CoursePage)).toHaveLength(0);
    expect(component.find(DepartmentsListView)).toHaveLength(0);
    expect(component.find(NoteDetailView)).toHaveLength(0);
    expect(component.find(UploadForm)).toHaveLength(0);
    expect(component.find(NotesListView)).toHaveLength(0);
    expect(component.find(AddCourseView)).toHaveLength(0);
    expect(component.find(profile)).toHaveLength(0);
  })

  // it('should show CoursePage component for /airnote/courses router', () => {
  //   const component = mount(
  //   <MemoryRouter initialentries="{['/airnote/courses']}">
  //     <BaseRouter/>
  //   </MemoryRouter>
  //   );
  //   expect(component.debug()).toHaveLength(1);
  // })

  // it('should show DepartmentsListView component for route /airnote/department', () => {
  //   const component = mount(
  //   <MemoryRouter initialEntries="{['/airnote/department']}">
  //     <BaseRouter/>
  //   </MemoryRouter>
  //   );
  //   expect(component.find(DepartmentsListView)).toHaveLength(1);
  // })

  // it('should show CoursePage component for /airnote/courses/COMS router', () => {
  //   const component = mount(
  //   <MemoryRouter initialentries="{['/airnote/courses/COMS']}">
  //     <BaseRouter/>
  //   </MemoryRouter>
  //   );
  //   expect(component.find(CoursePage)).toHaveLength(1);
  // })

  // it('should show NoteDetailView component for /airnote/note/10 router', () => {
  //   const component = mount(
  //   <MemoryRouter initialentries="{['/airnote/note/10']}">
  //     <BaseRouter/>
  //   </MemoryRouter>
  //   );
  //   expect(component.find(NoteDetailView)).toHaveLength(1);
  // })

  // it('should show NotesListView component for /airnote/notes router', () => {
  //   const component = mount(
  //   <MemoryRouter initialentries="{['/airnote/notes']}">
  //     <BaseRouter/>
  //   </MemoryRouter>
  //   );
  //   expect(component.find(NotesListView)).toHaveLength(1);
  // })

  // it('should show NotesListView component for /airnote/notes/4156 router', () => {
  //   const component = mount(
  //   <MemoryRouter initialentries="{['/airnote/notes/4156']}">
  //     <BaseRouter/>
  //   </MemoryRouter>
  //   );
  //   expect(component.find(NotesListView)).toHaveLength(1);
  // })

  // it('should show UploadForm component for /airnote/upload router', () => {
  //   const component = mount(
  //   <MemoryRouter initialentries="{['/airnote/upload']}">
  //     <BaseRouter/>
  //   </MemoryRouter>
  //   );
  //   expect(component.find(UploadForm)).toHaveLength(1);
  // })

  // it('should show profile component for /airnote/profile router', () => {
  //   const component = mount(
  //   <MemoryRouter initialentries="{['/airnote/profile']}">
  //     <BaseRouter/>
  //   </MemoryRouter>
  //   );
  //   expect(component.find(profile)).toHaveLength(1);
  // })

  // it('should show AddCourseView component for /airnote/addcourse router', () => {
  //   const component = mount(
  //   <MemoryRouter initialentries="{['/airnote/addcourse']}">
  //     <BaseRouter/>
  //   </MemoryRouter>
  //   );
  //   expect(component.find(AddCourseView)).toHaveLength(1);
  // })
})