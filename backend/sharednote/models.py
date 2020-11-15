from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


def validate_lion_mail(email):
    if not email.endswith('@columbia.edu'):
        raise ValidationError("Only @columbia.edu email address is allowed.")


class CustomizeUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avartar = models.TextField(max_length=200, default="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png")
    credits = models.IntegerField(default=0)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        CustomizeUser.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.customizeuser.save()


class Course(models.Model):
    course_number = models.CharField(max_length=20, primary_key=True)
    course_name = models.CharField(max_length=50)
    department_name = models.CharField(max_length=50)
    term = models.CharField(max_length=10)


class Note(models.Model):
    user_id = models.ForeignKey(get_user_model(), related_name='notes', on_delete=models.CASCADE)
    course_number = models.ForeignKey(Course, related_name='notes', on_delete=models.CASCADE)
    file_name = models.TextField(null=False, default="")
    file_url = models.TextField(null=False)
    description = models.TextField(default="")


class Comment(models.Model):
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    time = models.DateTimeField()


class UpVote(models.Model):
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, related_name='ups', on_delete=models.CASCADE)
    class Meta:
        unique_together = ('user_id', 'note_id',)


class DownVote(models.Model):
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, related_name='downs', on_delete=models.CASCADE)
    class Meta:
        unique_together = ('user_id', 'note_id',)
