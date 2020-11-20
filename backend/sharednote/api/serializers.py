'''
Define serialization format
'''
# pylint: disable=import-error
# pylint: disable=too-few-public-methods
# pylint: disable=no-member
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, IntegerField
from django.contrib.auth import get_user_model
from sharednote.models import Note, Comment, Course, Vote, CustomizeUser


class CommentSerializer(ModelSerializer):
    """
    define serialization format for comment
    """
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

    # pylint: disable=no-self-use
    def create(self, validated_data):
        """
        Helper function for upvote/downvote,
        so user can create a vote or change a vote in one POST method

        :param validated_data: Dictionary containing the vote instance
        :return: A valid JSON object (a dictionary) containing votes information for a course
        """
        vote = validated_data.pop('vote')
        obj, _ = Vote.objects.update_or_create(
            **validated_data,
            defaults={'vote': vote},
        )
        return obj


class CourseSerializer(ModelSerializer):
    notes = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ('course_number', 'course_name', 'department_name', 'term', 'notes')


class NoteBaseSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'user_id', 'course_number', 'file_name', 'file_url',
                  'description', 'time')


class NoteSerializer(ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    votes = VoteSerializer(many=True, read_only=True)
    course = PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Note
        fields = ('id', 'user_id', 'course_number', 'file_name', 'file_url',
                  'description', 'time', 'comments', 'votes')


class NoteDynamicSerializer(NoteSerializer):
    up_votes = IntegerField()
    down_votes = IntegerField()

    class Meta:
        model = Note
        fields = ('id', 'user_id', 'course_number', 'file_name',
                  'file_url', 'description', 'time', 'up_votes',
                  'down_votes', 'comments')


class CourseBaseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
