from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, IntegerField
from sharednote.models import Note, Comment, Course, Vote, CustomizeUser
from django.contrib.auth import get_user_model


class CommentSerializer(ModelSerializer):
  class Meta:
    model = Comment
    fields = '__all__'


class UserSerializer(ModelSerializer):
  notes = PrimaryKeyRelatedField(many=True, read_only=True)
  class Meta:
    model = get_user_model()
    fields = ('id', 'first_name', 'last_name', 'email', 'notes')


class CustomizeUserSerializer(ModelSerializer):
  user = UserSerializer(read_only=True)
  class Meta:
    model = CustomizeUser
    fields = ('avartar', 'credits', 'user')


class VoteSerializer(ModelSerializer):
  class Meta:
    model = Vote
    fields = '__all__'
    validators = []

  def create(self, validated_data):
    vote = validated_data.pop('vote')
    obj, created = Vote.objects.update_or_create(
      **validated_data,
      defaults={'vote': vote},
    )
    return obj


class NoteBaseSerializer(ModelSerializer):
  class Meta:
    model = Note
    fields = '__all__'


class NoteSerializer(ModelSerializer):
  comments = CommentSerializer(many=True, read_only=True)
  votes = VoteSerializer(many=True, read_only=True)

  class Meta:
    model = Note
    fields = ('id', 'user_id', 'course_number', 'file_name', 'file_url', 'description', 'comments', 'votes')


class NoteDynamicSerializer(NoteSerializer):
    up_votes = IntegerField()
    down_votes = IntegerField()
    class Meta:
        model = Note
        fields = ('id', 'user_id', 'course_number', 'file_name', 'file_url', 'description', 'comments', 'up_votes', 'down_votes')


class CourseSerializer(ModelSerializer):
  notes = PrimaryKeyRelatedField(many=True, read_only=True)
  class Meta:
    model = Course
    fields = ('course_number', 'course_name', 'department_name', 'term', 'notes')


class CourseBaseSerializer(ModelSerializer):
  class Meta:
    model = Course
    fields = '__all__'



