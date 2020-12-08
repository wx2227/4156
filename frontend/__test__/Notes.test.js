import React from 'react'
import { mount, shallow } from 'enzyme'
import Notes from '../src/components/Notes.js'
import Cookie from 'js-cookie'
import axios from 'axios'
import { Card, Button, Row, Col } from 'react-bootstrap'

window.alert = jest.fn(); 
jest.mock('axios')
beforeEach(() => {
    jest.clearAllMocks();
})

afterAll(() => {
    jest.clearAllMocks();
})
const noteSample = [
        {
        "id": 5,
        "user_id": 2,
        "file_name": "name",
        "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf",
        "description": "des",
        "time": "2020-12-02T18:46:30.176473Z",
        "up_votes": 1,
        "down_votes": 0,
        "comments": [
            {
                "id": 9,
                "user_info": {
                    "id": 2,
                    "first_name": "Wan",
                    "last_name": "XU",
                    "email": "wx2227@columbia.edu",
                    "avatar": "https://lh6.googleusercontent.com/-mOFZSfmWuG8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl2Arj7Gqi7LTYuAieuGoIosc_2lQ/s96-c/photo.jpg",
                    "credits": 0,
                    "is_superuser": true,
                    "nick_name": "Zafigevuk",
                    "notes": [
                        {
                            "id": 5,
                            "user_id": 2,
                            "course_number": "COMS 4156",
                            "file_name": "name",
                            "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf",
                            "description": "des",
                            "time": "2020-12-02T18:46:30.176473Z"
                        },
                        {
                            "id": 6,
                            "user_id": 2,
                            "course_number": "COMS 4118",
                            "file_name": "name",
                            "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf",
                            "description": "des",
                            "time": "2020-12-02T22:48:32.949327Z"
                        },
                        {
                            "id": 7,
                            "user_id": 2,
                            "course_number": "COMS 4156",
                            "file_name": "name",
                            "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf",
                            "description": "des",
                            "time": "2020-12-05T01:36:09.520937Z"
                        }
                    ],
                    "favorites": [
                        {
                            "id": 4,
                            "note_info": {
                                "id": 6,
                                "user_id": 2,
                                "course_number": "COMS 4118",
                                "file_name": "name",
                                "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf",
                                "description": "des",
                                "time": "2020-12-02T22:48:32.949327Z"
                            },
                            "favorite": 1,
                            "user_id": 2,
                            "note_id": 6
                        },
                        {
                            "id": 5,
                            "note_info": {
                                "id": 5,
                                "user_id": 2,
                                "course_number": "COMS 4156",
                                "file_name": "name",
                                "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf",
                                "description": "des",
                                "time": "2020-12-02T18:46:30.176473Z"
                            },
                            "favorite": 1,
                            "user_id": 2,
                            "note_id": 5
                        },
                        {
                            "id": 6,
                            "note_info": {
                                "id": 7,
                                "user_id": 2,
                                "course_number": "COMS 4156",
                                "file_name": "name",
                                "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf",
                                "description": "des",
                                "time": "2020-12-05T01:36:09.520937Z"
                            },
                            "favorite": 1,
                            "user_id": 2,
                            "note_id": 7
                        }
                    ],
                    "comments": [
                        {
                            "id": 9,
                            "content": "comment1",
                            "time": "2020-12-02T22:31:37Z",
                            "user_id": 2,
                            "note_id": 5
                        },
                        {
                            "id": 10,
                            "content": "comment2",
                            "time": "2020-12-02T22:31:39Z",
                            "user_id": 2,
                            "note_id": 5
                        },
                        {
                            "id": 11,
                            "content": "comment1",
                            "time": "2020-12-02T22:48:45Z",
                            "user_id": 2,
                            "note_id": 6
                        }
                    ]
                },
                "content": "comment1",
                "time": "2020-12-02T22:31:37Z",
                "user_id": 2,
                "note_id": 5
            },
            {
                "id": 10,
                "user_info": {
                    "id": 2,
                    "first_name": "Wan",
                    "last_name": "XU",
                    "email": "wx2227@columbia.edu",
                    "avatar": "https://lh6.googleusercontent.com/-mOFZSfmWuG8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl2Arj7Gqi7LTYuAieuGoIosc_2lQ/s96-c/photo.jpg",
                    "credits": 0,
                    "is_superuser": true,
                    "nick_name": "Zafigevuk",
                    "notes": [
                        {
                            "id": 5,
                            "user_id": 2,
                            "course_number": "COMS 4156",
                            "file_name": "name",
                            "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf",
                            "description": "des",
                            "time": "2020-12-02T18:46:30.176473Z"
                        },
                        {
                            "id": 6,
                            "user_id": 2,
                            "course_number": "COMS 4118",
                            "file_name": "name",
                            "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf",
                            "description": "des",
                            "time": "2020-12-02T22:48:32.949327Z"
                        },
                        {
                            "id": 7,
                            "user_id": 2,
                            "course_number": "COMS 4156",
                            "file_name": "name",
                            "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf",
                            "description": "des",
                            "time": "2020-12-05T01:36:09.520937Z"
                        }
                    ],
                    "favorites": [
                        {
                            "id": 4,
                            "note_info": {
                                "id": 6,
                                "user_id": 2,
                                "course_number": "COMS 4118",
                                "file_name": "name",
                                "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf",
                                "description": "des",
                                "time": "2020-12-02T22:48:32.949327Z"
                            },
                            "favorite": 1,
                            "user_id": 2,
                            "note_id": 6
                        },
                        {
                            "id": 5,
                            "note_info": {
                                "id": 5,
                                "user_id": 2,
                                "course_number": "COMS 4156",
                                "file_name": "name",
                                "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf",
                                "description": "des",
                                "time": "2020-12-02T18:46:30.176473Z"
                            },
                            "favorite": 1,
                            "user_id": 2,
                            "note_id": 5
                        },
                        {
                            "id": 6,
                            "note_info": {
                                "id": 7,
                                "user_id": 2,
                                "course_number": "COMS 4156",
                                "file_name": "name",
                                "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf",
                                "description": "des",
                                "time": "2020-12-05T01:36:09.520937Z"
                            },
                            "favorite": 1,
                            "user_id": 2,
                            "note_id": 7
                        }
                    ],
                    "comments": [
                        {
                            "id": 9,
                            "content": "comment1",
                            "time": "2020-12-02T22:31:37Z",
                            "user_id": 2,
                            "note_id": 5
                        },
                        {
                            "id": 10,
                            "content": "comment2",
                            "time": "2020-12-02T22:31:39Z",
                            "user_id": 2,
                            "note_id": 5
                        },
                        {
                            "id": 11,
                            "content": "comment1",
                            "time": "2020-12-02T22:48:45Z",
                            "user_id": 2,
                            "note_id": 6
                        }
                    ]
                },
                "content": "comment2",
                "time": "2020-12-02T22:31:39Z",
                "user_id": 2,
                "note_id": 5
            }
        ],
        "favorites": [
            {
                "id": 5,
                "favorite": 1,
                "user_id": 2,
                "note_id": 5
            }
        ],
        "course_info": {
            "course_number": "COMS 4156",
            "course_name": "Advanced Software Engineering",
            "term": "2020 Fall",
            "department_name": "Computer Science Department"
        }
    }]



describe('default content checked', () => {
    it('default content should render each note', () => {
        let wrapper = shallow(<Notes notes={noteSample} />)
        let instance = wrapper.instance()
        expect(wrapper.contains( <Card.Text>name</Card.Text>)).toBe(true)
    })

   
})