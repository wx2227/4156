'''
Data model for database
'''
# pylint: disable=too-few-public-methods
# pylint: disable=no-member
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from nickname_generator import generate

# Create your models here.


class CustomizeUser(AbstractUser):
    """
    define data schema for customized user
    """
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.TextField(
        null=True,
        max_length=200,
        default="")
    credits = models.IntegerField(default=0)
    nick_name = models.TextField(max_length=30, default=generate())


class Department(models.Model):
    """
    define data schema for department
    """
    department_name = models.CharField(max_length=50, primary_key=True)


class Course(models.Model):
    """
    define data schema for course
    """
    course_number = models.CharField(max_length=20, primary_key=True)
    course_name = models.CharField(max_length=50)
    department_name = models.ForeignKey(Department, related_name='courses_detail', on_delete=models.CASCADE)
    term = models.CharField(max_length=10)


class Note(models.Model):
    """
    define data schema for note
    """
    user_id = models.ForeignKey(get_user_model(), related_name='notes',
                                on_delete=models.CASCADE)
    course_number = models.ForeignKey(Course, related_name='notes',
                                      on_delete=models.CASCADE)
    file_name = models.TextField(null=False, default="")
    file_url = models.TextField(null=False)
    description = models.TextField(default="")
    time = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    """
    define data schema for comment
    """
    user_id = models.ForeignKey(get_user_model(), related_name="comments",
                                on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    time = models.DateTimeField()


class Vote(models.Model):
    """
    define data schema for vote
    """
    UPVOTE = 1
    NOVOTE = 0
    DOWNVOTE = -1
    VOTE_CHOICES = [
        (1, UPVOTE),
        (0, NOVOTE),
        (-1, DOWNVOTE),
    ]
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, related_name='votes', on_delete=models.CASCADE)
    vote = models.IntegerField(choices=VOTE_CHOICES, default=0)

    class Meta:
        """
        set user_id and note_id as unique pair
        """
        unique_together = ('user_id', 'note_id',)


class Favorite(models.Model):
    """
    define data schema for favorite
    """
    FAVORITE = 1
    NOACTION = 0
    CHOICES = [
        (1, FAVORITE),
        (0, NOACTION),
    ]
    user_id = models.ForeignKey(get_user_model(), related_name='favorites', on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, on_delete=models.CASCADE)
    favorite = models.IntegerField(choices=CHOICES, default=0)

    class Meta:
        """
        set user_id and note_id as unique pair
        """
        unique_together = ('user_id', 'note_id',)
