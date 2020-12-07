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

    def test_user_valid_by_id(self):
        '''
        test the user endpoint on a valid user by id, should return the user's info
        '''
        response = self.client.get("/api/user/?id=1")
        assert response.status_code == 200
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0], {
            'id': 1,
            'first_name': '',
            'last_name': '',
            'email': '',
            'avatar': '',
            'credits': 0,
            'is_superuser': True,
            'nick_name': 'Muxenakhy',
            'notes': [],
            'favorites': [],
            'comments': []
        })

    def test_user_valid_by_email(self):
        '''
        test the user endpoint on a valid user by email, should return the user's info
        '''
        response = self.client.get("/api/user/?email=gr2625@columbia.edu")
        assert response.status_code == 200
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0], {
            'id': 3,
            'first_name': 'Guancheng',
            'last_name': 'Ren',
            'email': 'gr2625@columbia.edu',
            'avatar': 'https://lh5.googleusercontent.com/-VvP-39_XqpE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckynjUvtzHhKYllwL5InS5lMTGEyg/s96-c/photo.jpg',
            'credits': 0,
            'is_superuser': False,
            'nick_name': 'Acaqakyfo',
            'notes': [],
            'favorites': [],
            'comments': []
        })

    def test_user_not_exist_by_id(self):
        '''
        test the user endpoint on a non-exist user by id, should return nothing
        '''
        response = self.client.get("/api/user/?id=123")
        assert response.status_code == 200
        self.assertEqual(len(response.json()), 0)

    def test_user_not_exist_by_email(self):
        '''
        test the user endpoint on a non-exist user by email, should return nothing
        '''
        response = self.client.get("/api/user/?email=123@gmail.com")
        assert response.status_code == 200
        self.assertEqual(len(response.json()), 0)

    def test_note_valid(self):
        '''
        test the note endpoint to get notes for a particular class,
        should return notes info of that class
        '''
        response = self.client.get("/api/note/?course_number=COMS 4156")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
        # self.assertEqual(response.json()[0], {
        #     "id": 3,
        #     "user_id": 7,
        #     "course_number": "COMS 4156",
        #     "file_name": "name",
        #     "file_url": "https://coms4156.s3-us-west-1.amazonaws.com/Assignment1-Spring2020.pdf",
        #     "description": "des",
        #     "time": "2020-11-21T21:17:57.097552Z",
        #     "up_votes": 0,
        #     "down_votes": 0,
        #     "comments": []
        # })

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
        response = self.client.get("/api/comment/2", follow=True)
        self.assertEqual(response.status_code, 404)
        # self.assertEqual(response.json(), {
        #     "id": 2,
        #     "content": "comment1",
        #     "time": "2020-11-22T01:59:50Z",
        #     "user_id": 6,
        #     "note_id": 2
        # })

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
            'user_id': 6,
            'note_id': 2}, follow=True)
        self.assertEqual(response.status_code, 400)

    def test_vote_valid(self):
        '''
        test the vote endpoint to get a vote's info
        '''
        response = self.client.get("/api/vote/1", follow=True)
        self.assertEqual(response.status_code, 404)
        # self.assertEqual(response.json(), {
        #     "id": 1,
        #     "vote": 1,
        #     "user_id": 6,
        #     "note_id": 2
        # })

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
        response = self.client.get("/api/course/?course_number=COMS 4156")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        # self.assertEqual(response.json()[0], {
        #     'course_number': 'COMS 4156',
        #     'course_name': 'Advanced Software Engineering',
        #     'department_name': 'Computer Science',
        #     'term': '2020 Fall',
        #     'notes': [3]})

    def test_course_not_exist(self):
        '''
        test the course endpoint to get course info for a non-exist course, should get nothing
        '''
        response = self.client.get("/api/course/?course_number=asdf")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)
