from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.


def validate_lion_mail(email):
    if not email.endswith('@columbia.edu'):
        raise ValidationError("Only .edu email address is allowed.")


class User(models.Model):
    user_name = models.CharField(max_length=120)
    lion_mail = models.EmailField(validators=[validate_lion_mail])
    avartar = models.CharField(max_length=200)
    credits = models.IntegerField(default=0)


class Comment(models.Model):
    content = models.TextField()


class Commented(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_id = models.ForeignKey(Comment, on_delete=models.CASCADE)
    time = models.DateTimeField()


class Note(models.Model):
    file_name = models.TextField(null=False, default="")
    file_url = models.TextField(null=False)
    up_votes = models.IntegerField(default=0)
    down_votes = models.IntegerField(default=0)


class Vote(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, on_delete=models.CASCADE)
    up = models.BooleanField(null=False)


class Course(models.Model):
    course_number = models.CharField(max_length=20, primary_key=True)
    course_name = models.CharField(max_length=50)
    department_name = models.CharField(max_length=50)
    term = models.CharField(max_length=10)


class CourseNote(models.Model):
    course_number = models.ForeignKey(Course, on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('course_number', 'note_id'),)


class Upload(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    note_id = models.ForeignKey(Note, on_delete=models.CASCADE)
    course_number = models.ForeignKey(Course, on_delete=models.CASCADE)
    time = models.DateTimeField()

    class Meta:
        unique_together = (('user_id', 'note_id', 'course_number'),)






