'''
Unit test for backend.
'''

from django.test import Client
from django.test import TestCase


class UnitTest(TestCase):
    '''
    set up
    '''
    def setUp(self):
        '''
        setup the client for this object
        '''
        self.client = Client()

    def test_user_valid(self):
        '''
        test the user endpoint on a valid user, should return the user's info
        '''
        response = self.client.get("/api/user/?id=14")
        assert response.status_code == 200
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0], {
            "avartar": "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            "credits": 0,
            "user": {
                "id": 14,
                "first_name": "Guancheng",
                "last_name": "Ren",
                "email": "gr2625@columbia.edu",
                "notes": [1]
            }
        })

    def test_user_not_exist(self):
        '''
        test the user endpoint on a non-exist user, should return nothing
        '''
        response = self.client.get("/api/user/?email=123@gmail.com")
        assert response.status_code == 200
        self.assertEqual(len(response.json()), 0)

    def test_note_valid(self):
        '''
        test the note endpoint to get notes for a particular class,
        should return notes info of that class
        '''
        response = self.client.get("/api/note/?course_number=4156")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0], {
            "id": 1,
            "user_id": 14,
            "course_number": "4156",
            "file_name": "name",
            "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/Assignment1-Spring2020.pdf",
            "description": "des",
            "time": "2020-11-19T05:20:43Z",
            "comments": [
                {
                    "id": 1,
                    "content": "comment1",
                    "time": "2020-11-19T00:52:16Z",
                    "user_id": 14,
                    "note_id": 1
                },
                {
                    "id": 2,
                    "content": "comment2",
                    "time": "2020-11-19T00:52:32Z",
                    "user_id": 14,
                    "note_id": 1
                },
                {
                    "id": 3,
                    "content": "comment3",
                    "time": "2020-11-19T00:53:09Z",
                    "user_id": 14,
                    "note_id": 1
                },
                {
                    "id": 4,
                    "content": "comment4",
                    "time": "2020-11-19T00:54:45Z",
                    "user_id": 14,
                    "note_id": 1
                },
                {
                    "id": 5,
                    "content": "comment5",
                    "time": "2020-11-19T00:56:12Z",
                    "user_id": 14,
                    "note_id": 1
                },
                {
                    "id": 6,
                    "content": "comment6",
                    "time": "2020-11-19T00:57:48Z",
                    "user_id": 14,
                    "note_id": 1
                },
                {
                    "id": 7,
                    "content": "comment7",
                    "time": "2020-11-19T00:57:56Z",
                    "user_id": 14,
                    "note_id": 1
                },
                {
                    "id": 8,
                    "content": "comment8",
                    "time": "2020-11-19T00:58:25Z",
                    "user_id": 14,
                    "note_id": 1
                },
                {
                    "id": 9,
                    "content": "comment9",
                    "time": "2020-11-19T00:58:34Z",
                    "user_id": 14,
                    "note_id": 1
                }
            ],
            "up_votes": 1,
            "down_votes": 0
        })

    def test_note_not_exist(self):
        '''
        test the note endpoint to get notes for a non-exist class,
        should return nothing
        '''
        response = self.client.get("/api/note/?course_number=asdf")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_comment_valid(self):
        '''
        test the comment endpoint to get a comment,
        should return info of that comment
        '''
        response = self.client.get("/api/comment/1", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "id": 1,
            "content": "comment1",
            "time": "2020-11-19T00:52:16Z",
            "user_id": 14,
            "note_id": 1
        })

    def test_comment_not_exist(self):
        '''
        test the comment endpoint to get comment of a non-exist comment id,
        should return not found
        '''
        response = self.client.get("/api/comment/100", follow=True)
        self.assertEqual(response.status_code, 404)

    def test_add_comment(self):
        '''
        test the comment endpoint to add a new comment
        '''
        response = self.client.post("/api/comment/", {
            'content': 'a lot of work',
            'time': '2020-11-10T21:33:00Z',
            'user_id': 14,
            'note_id': 1}, follow=True)
        self.assertEqual(response.status_code, 201)

    def test_vote_valid(self):
        '''
        test the vote endpoint to get a vote's info
        '''
        response = self.client.get("/api/vote/1", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "id": 1,
            "vote": 1,
            "user_id": 14,
            "note_id": 1
        })

    def test_vote_not_exist(self):
        '''
        test the vote endpoint to get info of a non-exist note, should return not found
        '''
        response = self.client.get("/api/vote/saddc", follow=True)
        self.assertEqual(response.status_code, 404)

    def test_upvote(self):
        '''
        test the vote endpoint to upvote a note
        '''
        response = self.client.post("/api/vote", {
            'vote': 1,
            'user_id': 14,
            'note_id': 1}, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_downvote(self):
        '''
        test the vote endpoint to downvote a note
        '''
        response = self.client.post("/api/vote", {
            'vote': -1, 'user_id': 14, 'note_id': 1}, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_course_valid(self):
        '''
        test the course endpoint to get course info
        '''
        response = self.client.get("/api/course/?course_number=4156")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0], {
            'course_number': '4156',
            'course_name': 'software engineering',
            'department_name': 'cs', 'term': '2020fall',
            'notes': [1]})

    def test_course_not_exist(self):
        '''
        test the course endpoint to get course info for a non-exist course, should get nothing
        '''
        response = self.client.get("/api/course/?course_number=asdf")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)
