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

    def test_get_note_valid(self):
        '''
        test the note endpoint to get notes for a particular class,
        should return notes info of that class
        '''
        response = self.client.get("/api/note/?course_number=COMS 4118")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0], {
            'id': 6,
            'user_id': 2,
            'file_name': 'name',
            'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf',
            'description': 'des',
            'time': '2020-12-02T22:48:32.949327Z',
            'up_votes': 1,
            'down_votes': 0,
            'comments': [{
                'id': 11,
                'user_info': {
                    'id': 2,
                    'first_name': 'Wan',
                    'last_name': 'XU',
                    'email': 'wx2227@columbia.edu',
                    'avatar': 'https://lh6.googleusercontent.com/-mOFZSfmWuG8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl2Arj7Gqi7LTYuAieuGoIosc_2lQ/s96-c/photo.jpg',
                    'credits': 0,
                    'is_superuser': True,
                    'nick_name': 'Zafigevuk',
                    'notes': [{
                        'id': 5,
                        'user_id': 2,
                        'course_number':
                        'COMS 4156',
                        'file_name': 'name',
                        'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf',
                        'description': 'des',
                        'time': '2020-12-02T18:46:30.176473Z'
                    }, {
                        'id': 6,
                        'user_id': 2,
                        'course_number': 'COMS 4118',
                        'file_name': 'name',
                        'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf',
                        'description': 'des',
                        'time': '2020-12-02T22:48:32.949327Z'
                    }, {
                        'id': 7,
                        'user_id': 2,
                        'course_number': 'COMS 4156',
                        'file_name': 'name',
                        'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf',
                        'description': 'des', 'time': '2020-12-05T01:36:09.520937Z'
                    }],
                    'favorites': [{
                        'id': 4,
                        'note_info': {
                            'id': 6,
                            'user_id': 2,
                            'course_number': 'COMS 4118',
                            'file_name': 'name',
                            'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/a27726ab-5820-439e-a1aa-ed82902873b4.pdf',
                            'description': 'des',
                            'time': '2020-12-02T22:48:32.949327Z'
                        },
                        'favorite': 1,
                        'user_id': 2,
                        'note_id': 6
                    }, {
                        'id': 5,
                        'note_info': {
                            'id': 5,
                            'user_id': 2,
                            'course_number': 'COMS 4156',
                            'file_name': 'name',
                            'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/f030c473-61a1-4f3b-9193-08d45cf3b0c0.pdf',
                            'description': 'des',
                            'time': '2020-12-02T18:46:30.176473Z'
                        },
                        'favorite': 1,
                        'user_id': 2,
                        'note_id': 5
                    }, {
                        'id': 6,
                        'note_info': {
                            'id': 7,
                            'user_id': 2,
                            'course_number': 'COMS 4156',
                            'file_name': 'name',
                            'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf',
                            'description': 'des',
                            'time': '2020-12-05T01:36:09.520937Z'
                        },
                        'favorite': 1,
                        'user_id': 2,
                        'note_id': 7
                    }],
                    'comments': [{
                        'id': 9,
                        'content': 'comment1',
                        'time': '2020-12-02T22:31:37Z',
                        'user_id': 2,
                        'note_id': 5
                    }, {
                        'id': 10,
                        'content': 'comment2',
                        'time': '2020-12-02T22:31:39Z',
                        'user_id': 2,
                        'note_id': 5
                    }, {
                        'id': 11,
                        'content': 'comment1',
                        'time': '2020-12-02T22:48:45Z',
                        'user_id': 2,
                        'note_id': 6
                }]},
                'content': 'comment1',
                'time': '2020-12-02T22:48:45Z',
                'user_id': 2,
                'note_id': 6
            }],
                'favorites': [{
                    'id': 4,
                    'favorite': 1,
                    'user_id': 2,
                    'note_id': 6}],
                    'course_info': {
                        'course_number': 'COMS 4118',
                        'course_name': 'Operating System',
                        'term': '2020 Fall',
                        'department_name': 'Computer Science Department'
        }})

    def test_get_note_not_exist(self):
        '''
        test the note endpoint to get notes for a non-exist class,
        should return nothing
        '''
        response = self.client.get("/api/note/?course_number=asdf")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_post_note_already_exist(self):
        '''
        test the note endpoint to post an already-exist note,
        should return ???
        '''
        response = self.client.post("/api/note/", {
            'user_id': 2,
            'course_number': 'COMS 4156',
            'file_name': 'name',
            'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/4121a382-614b-4192-81db-5710744aac0f.pdf',
            'description': 'des'
        }, follow=True)
        self.assertEqual(response.status_code, 201)

    def test_post_note_valid(self):
        '''
        test the note endpoint to post an already-exist note,
        should return ???
        '''
        response = self.client.post("/api/note/", {
            'user_id': 2,
            'course_number': 'COMS 4156',
            'file_name': 'test',
            'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/test.pdf',
            'description': 'des'
        }, follow=True)
        self.assertEqual(response.status_code, 201)

    def test_delete_note_valid(self):
        '''
        test the note endpoint to post an already-exist note
        '''
        response = self.client.delete("/api/note/5", follow=True)
        self.assertEqual(response.status_code, 200)

    def test_comment_valid(self):
        '''
        test the comment endpoint to get a comment,
        should return info of that comment
        '''
        response = self.client.get("/api/comment/9", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 5)
        self.assertEqual(response.json(), {
            'id': 9,
            'content': 'comment1',
            'time': '2020-12-02T22:31:37Z',
            'user_id': 2,
            'note_id': 5
        })
        response = self.client.get("/api/comment/11", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 5)
        self.assertEqual(response.json(), {
            'id': 11,
            'content': 'comment1',
            'time': '2020-12-02T22:48:45Z',
            'user_id': 2,
            'note_id': 6
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
            'content': 'Still have a lot of work to do, keep it up!',
            'time': '2020-11-10T21:33:00Z',
            'user_id': 2,
            'note_id': 5
        }, follow=True)
        self.assertEqual(response.status_code, 201)

    def test_vote_valid(self):
        '''
        test the vote endpoint to get a vote's info
        '''
        response = self.client.get("/api/vote/3", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 4)
        self.assertEqual(response.json(), {
            'id': 3,
            'vote': 1,
            'user_id': 2,
            'note_id': 6
        })

        response = self.client.get("/api/vote/5", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 4)
        self.assertEqual(response.json(), {
            'id': 5,
            'vote': 1,
            'user_id': 2,
            'note_id': 7
        })

    def test_vote_not_exist(self):
        '''
        test the vote endpoint to get info of a non-exist note, should return not found
        '''
        response = self.client.get("/api/vote/1", follow=True)
        self.assertEqual(response.status_code, 404)
        response = self.client.get("/api/vote/abc", follow=True)
        self.assertEqual(response.status_code, 404)

    def test_upvote_valid(self):
        '''
        test the vote endpoint to upvote a note
        '''
        response = self.client.post("/api/vote", {
            'vote': 1,
            'user_id': 7,
            'note_id': 1
        }, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_vote_already_exist(self):
        '''
        test the vote endpoint to cover an existing vote
        '''
        response = self.client.post("/api/vote", {
            "vote": 0,
            "user_id": 2,
            "note_id": 5
        }, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_downvote_valid(self):
        '''
        test the vote endpoint to downvote a note
        '''
        response = self.client.post("/api/vote", {
            'vote': -1,
            'user_id': 7,
            'note_id': 1
        }, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_undo_downvote(self):
        '''
        test the vote endpoint to undo an downvote
        '''
        response = self.client.post("/api/vote", {
            'vote': 1,
            'user_id': 7,
            'note_id': 1
        }, follow=True)
        self.assertEqual(response.status_code, 200)

    def test_course_valid(self):
        '''
        test the course endpoint to get course info
        '''
        response = self.client.get("/api/course/?course_number=COMS 4156")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0], {
            'course_number': 'COMS 4156',
            'notes': [5, 7],
            'department_info': {
                'department_name': 'Computer Science Department',
                'url': 'https://www.columbia.edu/content/computer-science-department'},
                'course_name': 'Advanced Software Engineering',
                'term': '2020 Fall',
                'department_name': 'Computer Science Department'
            }
        )
        response = self.client.get("/api/course/?course_number=COMS 4118")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0], {
            'course_number': 'COMS 4118',
            'notes': [6],
            'department_info': {
                'department_name': 'Computer Science Department',
                'url': 'https://www.columbia.edu/content/computer-science-department'},
                'course_name': 'Operating System',
                'term': '2020 Fall',
                'department_name': 'Computer Science Department'
        })

    def test_course_not_exist(self):
        '''
        test the course endpoint to get course info for a non-exist course, should get nothing
        '''
        response = self.client.get("/api/course/?course_number=COMS 3147")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

        response = self.client.get("/api/course/?course_number=asdf")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_favorite_valid(self):
        '''
        test the favorite endpoint to get favorite info summary
        '''
        response = self.client.get("/api/favorite/4", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 4)
        self.assertEqual(response.json(), {
            'id': 4,
            'favorite': 1,
            'user_id': 2,
            'note_id': 6
        })
        response = self.client.get("/api/favorite/6", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 4)
        self.assertEqual(response.json(), {
            'id': 6,
            'favorite': 1,
            'user_id': 2,
            'note_id': 7
        })

    def test_favorite_not_valid(self):
        '''
        test the favorite endpoint with invalid id, should return nothing
        '''
        response = self.client.get("/api/favorite/123", follow=True)
        self.assertEqual(response.status_code, 404)

        response = self.client.get("/api/favorite/a", follow=True)
        self.assertEqual(response.status_code, 404)

    def test_post_favorite_note_already_exist(self):
        '''
        test the favorite endpoint to post an already-exist record,
        should return 201
        '''
        response = self.client.post("/api/favorite/", {
            'favorite': 1,
            'user_id': 2,
            'note_id': 7
        }, follow=True)
        self.assertEqual(response.status_code, 201)

    def test_post_favorite_note_already_exist(self):
        '''
        test the favorite endpoint to post an already-exist record,
        should return 201
        '''
        response = self.client.post("/api/favorite/", {
            'favorite': 1,
            'user_id': 3,
            'note_id': 7
        }, follow=True)
        self.assertEqual(response.status_code, 201)

    def test_post_favorite_note_already_exist(self):
        '''
        test the favorite endpoint to delete an existing record,
        should return 200
        '''
        response = self.client.delete("/api/favorite/4", follow=True)
        self.assertEqual(response.status_code, 200)

    def test_department_valid(self):
        '''
        test the department endpoint to get department info summary
        '''
        response = self.client.get("/api/department/Accounting Division", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
        self.assertEqual(response.json(), {
            'department_name': 'Accounting Division',
            'courses': 0,
            'url': 'https://www.columbia.edu/content/accounting-division'
        })

        response = self.client.get("/api/department/Global Support Department", follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
        self.assertEqual(response.json(), {
            "department_name": "Global Support Department",
            "courses": 0,
            "url": "https://www.columbia.edu/content/global-support-department"
        })

    def test_department_not_valid(self):
        '''
        test the department endpoint with invalid department name, should return nothing
        '''
        response = self.client.get("/api/favorite/random", follow=True)
        self.assertEqual(response.status_code, 404)

        response = self.client.get("/api/favorite/test123", follow=True)
        self.assertEqual(response.status_code, 404)