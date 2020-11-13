from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.


def validate_lion_mail(email):
    if not email.endswith('@columbia.edu'):
        raise ValidationError("Only @columbia.edu email address is allowed.")


class User(models.Model):
    user_name = models.CharField(max_length=120)
    lion_mail = models.EmailField(validators=[validate_lion_mail])
    avartar = models.CharField(max_length=200)
    credits = models.IntegerField(default=0)


class Course(models.Model):
    course_number = models.CharField(max_length=20, primary_key=True)
    course_name = models.CharField(max_length=50)
    department_name = models.CharField(max_length=50)
    term = models.CharField(max_length=10)


class Note(models.Model):
    user_id = models.ForeignKey(User, related_name='notes', on_delete=models.CASCADE)
    course_number = models.ForeignKey(Course, related_name='notes', on_delete=models.CASCADE)
    file_name = models.TextField(null=False, default="")
    file_url = models.TextField(null=False)
    description = models.TextField(default="")


class Comment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()
    time = models.DateTimeField()


class UpVote(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, related_name='ups', on_delete=models.CASCADE)


class DownVote(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, related_name='downs', on_delete=models.CASCADE)

