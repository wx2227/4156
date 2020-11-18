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
        response = self.client.get("/api/user/?id=13")
        assert response.status_code == 200
        print(response.json()[0])
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0],
          {'avartar': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          'credits': 0,
          'user': {'id': 13,
            'first_name': 'WAN',
            'last_name': 'XU',
            'email': '15221288637xw@gmail.com',
            'notes': [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 26, 27, 28]
          }})

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
        self.assertEqual(len(response.json()), 21)
        self.assertEqual(response.json()[0], {'id': 2, 'user_id': 13,
         'course_number': '4156',
         'file_name': 'name',
         'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/Assignment1-Spring2020.pdf',
         'description': 'des',
         'comments': [{'id': 4, 'content': 'comment1', 'time': '2020-11-10T21:33:00Z',
            'user_id': 13, 'note_id': 2},
          {'id': 5, 'content': 'comment2',
            'time': '2020-11-10T21:33:00Z',
            'user_id': 13, 'note_id': 2},
          {'id': 6, 'content': 'comment2',
            'time': '2020-11-10T21:33:00Z',
            'user_id': 13, 'note_id': 2},
            {'id': 7,
            'content': 'comment2',
            'time': '2020-11-10T21:33:00Z',
            'user_id': 13, 'note_id': 2},
            {'id': 8, 'content': 'comment3',
            'time': '2020-11-10T21:33:00Z',
            'user_id': 13, 'note_id': 2},
            {'id': 9, 'content': 'comment4',
            'time': '2020-11-10T21:33:00Z',
            'user_id': 13, 'note_id': 2}],
            'up_votes': 0, 'down_votes': 2})
        self.assertEqual(response.json()[20],
          {'id': 28, 'user_id': 13,
          'course_number': '4156',
          'file_name': 'name',
          'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/Assignment1-Spring2020.pdf',
          'description': 'des',
          'comments': [],
          'up_votes': 0,
          'down_votes': 0})

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
        response = self.client.get("/api/comment/4", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'id': 4,
          'content': 'comment1',
          'time': '2020-11-10T21:33:00Z',
          'user_id': 13,
          'note_id': 2})

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
        response = self.client.post("/api/comment/",
          {'content': 'a lot of work',
          'time': '2020-11-10T21:33:00Z',
          'user_id': 13,
          'note_id': 2},
          follow=True)
        self.assertEqual(response.status_code, 201)

    def test_vote_valid(self):
        '''
        test the vote endpoint to get a vote's info
        '''
        response = self.client.get("/api/vote/4", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'id': 4,
          'vote': -1,
          'user_id': 13,
          'note_id': 2})

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
        response = self.client.post("/api/vote",
          {'vote': 1,
          'user_id': 13,
          'note_id': 7},
          follow=True)
        self.assertEqual(response.status_code, 200)

    def test_downvote(self):
        '''
        test the vote endpoint to downvote a note
        '''
        response = self.client.post("/api/vote",
          {'vote': -1, 'user_id': 13, 'note_id': 4}, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_course_valid(self):
        '''
        test the course endpoint to get course info
        '''
        response = self.client.get("/api/course/?course_number=4156")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0],
          {'course_number': '4156',
          'course_name': 'software engineering',
          'department_name': 'cs', 'term': '2020fall',
          'notes': [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 26, 27, 28]})

    def test_course_not_exist(self):
        '''
        test the course endpoint to get course info for a non-exist course, should get nothing
        '''
        response = self.client.get("/api/course/?course_number=asdf")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)
