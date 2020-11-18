from django.test import Client
from django.test import TestCase

class UnitTest(TestCase):
  def setUp(self):
    self.client = Client()

  def test_user_valid(self):
    response = self.client.get("/api/user/?email=niutian95@gmail.com", format='json')
    assert response.status_code == 200
    self.assertEqual(len(response.json()), 1)
    self.assertEqual(response.json()[0], {'avartar': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', 'credits': 0, 'user': {'id': 14, 'first_name': '', 'last_name': '', 'email': 'niutian95@gmail.com', 'notes': []}})

  def test_user_not_exist(self):
    response = self.client.get("/api/user/?email=123@gmail.com", format='json')
    assert response.status_code == 200
    self.assertEqual(len(response.json()), 0)

  def test_note_valid(self):
    response = self.client.get("/api/note/?course_number=4156")
    self.assertEqual(response.status_code, 200)
    self.assertEqual(len(response.json()), 21)
    self.assertEqual(response.json()[0], {'id': 2, 'user_id': 13, 'course_number': '4156', 'file_name': 'name', 'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/Assignment1-Spring2020.pdf', 'description': 'des', 'comments': [{'id': 4, 'content': 'comment1', 'time': '2020-11-10T21:33:00Z', 'user_id': 13, 'note_id': 2}, {'id': 5, 'content': 'comment2', 'time': '2020-11-10T21:33:00Z', 'user_id': 13, 'note_id': 2}, {'id': 6, 'content': 'comment2', 'time': '2020-11-10T21:33:00Z', 'user_id': 13, 'note_id': 2}, {'id': 7, 'content': 'comment2', 'time': '2020-11-10T21:33:00Z', 'user_id': 13, 'note_id': 2}, {'id': 8, 'content': 'comment3', 'time': '2020-11-10T21:33:00Z', 'user_id': 13, 'note_id': 2}, {'id': 9, 'content': 'comment4', 'time': '2020-11-10T21:33:00Z', 'user_id': 13, 'note_id': 2}], 'up_votes': 0, 'down_votes': 2})
    self.assertEqual(response.json()[20], {'id': 28, 'user_id': 13, 'course_number': '4156', 'file_name': 'name', 'file_url': 'https://coms4156.s3-us-west-1.amazonaws.com/Assignment1-Spring2020.pdf', 'description': 'des', 'comments': [], 'up_votes': 0, 'down_votes': 0})

  def test_note_not_exist(self):
    response = self.client.get("/api/note/?course_number=asdf")
    self.assertEqual(response.status_code, 200)
    self.assertEqual(len(response.json()), 0)

  def test_comment_valid(self):
    response = self.client.get("/api/comment/4", follow=True)
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.json(), {'id': 4, 'content': 'comment1', 'time': '2020-11-10T21:33:00Z', 'user_id': 13, 'note_id': 2})

  def test_comment_not_exist(self):
    response = self.client.get("/api/comment/100", follow=True)
    self.assertEqual(response.status_code, 404)

  def test_add_comment(self):
    response = self.client.post("/api/comment/", {'content': 'a lot of work', 'time': '2020-11-10T21:33:00Z', 'user_id': 13, 'note_id': 2}, follow=True)
    self.assertEqual(response.status_code, 201)

  def test_vote_valid(self):
    response = self.client.get("/api/vote/4", follow=True)
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.json(), {'id': 4, 'vote': -1, 'user_id': 13, 'note_id': 2})

  def test_vote_not_exist(self):
    response = self.client.get("/api/vote/saddc", follow=True)
    self.assertEqual(response.status_code, 404)

  def test_upvote(self):
    response = self.client.post("/api/vote", {'vote': 1, 'user_id': 13, 'note_id': 7}, follow=True)
    self.assertEqual(response.status_code, 200)

  def test_downvote(self):
    response = self.client.post("/api/vote", {'vote': -1, 'user_id': 13, 'note_id': 4}, follow=True)
    self.assertEqual(response.status_code, 200)

  def test_course_valid(self):
    response = self.client.get("/api/course/?course_number=4156")
    self.assertEqual(response.status_code, 200)
    self.assertEqual(len(response.json()), 1)
    self.assertEqual(response.json()[0], {'course_number': '4156', 'course_name': 'software engineering', 'department_name': 'cs', 'term': '2020fall', 'notes': [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 26, 27, 28]})

  def test_course_not_exist(self):
    response = self.client.get("/api/course/?course_number=asdf")
    self.assertEqual(response.status_code, 200)
    self.assertEqual(len(response.json()), 0)