from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, SerializerMethodField, IntegerField, SlugRelatedField
from sharednote.models import User, Note, Comment, Course, UpVote, DownVote


class CommentSerializer(ModelSerializer):
  class Meta:
    model = Comment
    fields = ('id', 'user_id', 'note_id', 'content', 'time')


class UpVoteSerializer(ModelSerializer):
  class Meta:
    model = UpVote
    fields = ('id', 'user_id', 'note_id')


class DownVoteSerializer(ModelSerializer):
  class Meta:
    model = UpVote
    fields = ('id', 'user_id', 'note_id')


class UserSerializer(ModelSerializer):
  notes = PrimaryKeyRelatedField(many=True, read_only=True)
  class Meta:
    model = User
    fields = ('id', 'user_name', 'lion_mail', 'avartar', 'credits', 'notes')


class NoteSerializer(ModelSerializer):
  comments = CommentSerializer(many=True)
  ups = UpVoteSerializer(many=True)
  downs = UpVoteSerializer(many=True)
  up_votes = IntegerField(
    source='ups.count',
    read_only=True
  )
  down_votes = IntegerField(
    source='downs.count',
    read_only=True
  )

  class Meta:
    model = Note
    fields = ('id', 'course_number', 'file_name', 'file_url', 'description', 'comments', 'ups', 'downs', 'up_votes', 'down_votes')


class NoteDynamicSerializer(NoteSerializer):

    class Meta:
        model = Note
        fields = ('id', 'course_number', 'file_name', 'file_url', 'description', 'comments', 'up_votes', 'down_votes')


class CourseSerializer(ModelSerializer):
  notes = PrimaryKeyRelatedField(many=True, read_only=True)
  class Meta:
    model = Course
    fields = ('course_number', 'course_name', 'department_name', 'term', 'notes')



