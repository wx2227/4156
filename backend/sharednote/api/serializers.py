from rest_framework import serializers
from sharednote.models import User, Note, Comment, Commented, Course, CourseNote, Upload, Vote


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'user_name', 'lion_mail', 'avartar', 'credits')


class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = ('id', 'content')


class CommentedSerializer(serializers.ModelSerializer):
  class Meta:
    model = Commented
    fields = ('id', 'user_id', 'comment_id', 'time')


class NoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Note
    fields = ('id', 'file_name', 'file_url', 'up_votes', 'down_votes')


class VoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Vote
    fields = ('id', 'user_id', 'note_id', 'up')


class CourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Course
    fields = ('course_number', 'course_name', 'department_name', 'term')


class CourseNoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = CourseNote
    fields = ('id', 'course_number', 'note_id')


class UploadSerializer(serializers.ModelSerializer):
  class Meta:
    model = Upload
    fields = ('id', 'user_id', 'note_id', 'course_number', 'time')
