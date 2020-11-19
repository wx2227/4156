from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


def validate_lion_mail(email):
    """ Check whether a email is from lion mail

    :param email: String: containing email address
    :return: None : Raise ValidationError if email is not lionmail
    """
    if not email.endswith('@columbia.edu'):
        raise ValidationError("Only @columbia.edu email address is allowed.")


class CustomizeUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avartar = models.TextField(max_length=200, default="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png")
    credits = models.IntegerField(default=0)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """ Create a new user profile in Django database
    If user profile created by built-in user table then we create a customized user table with extra fields

    :param sender: Django built-in placeholder parameter
    :param instance: built-in UserInstance
    :param created: Boolean : whether the user is already created
    :param kwargs: [args...] : additional arguments
    :return: CustomizedUserInstance
    """
    if created:
        CustomizeUser.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """ Modify a new user profile in Django database

    :param sender: Django built-in placeholder parameter
    :param instance: built-in UserInstance
    :param kwargs: [args...] : additional arguments
    :return: None
    """
    instance.customizeuser.save()


class Course(models.Model):
    course_number = models.CharField(max_length=20, primary_key=True)
    course_name = models.CharField(max_length=50)
    department_name = models.CharField(max_length=50)
    term = models.CharField(max_length=10)


class Note(models.Model):
    user_id = models.ForeignKey(
        get_user_model(), related_name='notes', on_delete=models.CASCADE)
    course_number = models.ForeignKey(
        Course, related_name='notes', on_delete=models.CASCADE)
    file_name = models.TextField(null=False, default="")
    file_url = models.TextField(null=False)
    description = models.TextField(default="")
    time = models.DateTimeField(null=True)


class Comment(models.Model):
    user_id = models.ForeignKey(get_user_model(), related_name="user_info",on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    time = models.DateTimeField()


class Vote(models.Model):
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
        unique_together = ('user_id', 'note_id',)
