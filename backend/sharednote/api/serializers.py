'''
Define serialization format
'''
# pylint: disable=import-error
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, IntegerField
from django.contrib.auth import get_user_model
from sharednote.models import Note, Comment, Course, Vote, CustomizeUser


# pylint: disable=too-few-public-methods
class CommentSerializer(ModelSerializer):
    """
    define serialization format for comment
    """
    class Meta:
        """
        define serialization format for comment
        """
        model = Comment
        fields = '__all__'


# pylint: disable=too-few-public-methods
class UserSerializer(ModelSerializer):
    """
    define serialization format for user
    """
    notes = PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        """
        define serialization format for comment
        """
        model = get_user_model()
        fields = ('id', 'first_name', 'last_name', 'email', 'notes')


# pylint: disable=too-few-public-methods
class CustomizeUserSerializer(ModelSerializer):
    """
    define serialization format for customized user
    """
    user = UserSerializer(read_only=True)
    class Meta:
        """
        define serialization format for comment
        """
        model = CustomizeUser
        fields = ('avartar', 'credits', 'user')


# pylint: disable=too-few-public-methods
class VoteSerializer(ModelSerializer):
    """
    define serialization format for vote
    """
    class Meta:
        """
        define serialization format for comment
        """
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
        # pylint: disable=no-member
        obj, _ = Vote.objects.update_or_create(
            **validated_data,
            defaults={'vote': vote},
        )
        return obj


# pylint: disable=too-few-public-methods
class NoteBaseSerializer(ModelSerializer):
    """
    define serialization format for note POST method
    """
    class Meta:
        """
        define serialization format for comment
        """
        model = Note
        fields = ('id', 'user_id', 'course_number', 'file_name', 'file_url',
                  'description', 'time')


# pylint: disable=too-few-public-methods
class NoteSerializer(ModelSerializer):
    """
    define serialization format for note
    """
    comments = CommentSerializer(many=True, read_only=True)
    votes = VoteSerializer(many=True, read_only=True)

    class Meta:
        """
        define serialization format for comment
        """
        model = Note
        fields = ('id', 'user_id', 'course_number', 'file_name', 'file_url',
                  'description', 'time', 'comments', 'votes')


# pylint: disable=too-few-public-methods
class NoteDynamicSerializer(NoteSerializer):
    """
    define serialization format for note by removing votes filed
    """
    up_votes = IntegerField()
    down_votes = IntegerField()

    class Meta:
        """
        define serialization format for comment
        """
        model = Note
        fields = ('id', 'user_id', 'course_number', 'file_name',
                  'file_url', 'description', 'time', 'comments', 'up_votes', 'down_votes')


# pylint: disable=too-few-public-methods
class CourseSerializer(ModelSerializer):
    """
    define serialization format for course with additional notes
    """
    notes = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        """
        define serialization format for comment
        """
        model = Course
        fields = ('course_number', 'course_name', 'department_name', 'term', 'notes')


# pylint: disable=too-few-public-methods
class CourseBaseSerializer(ModelSerializer):
    """
    define serialization format for course used for POST method
    """
    class Meta:
        """
        define serialization format for comment
        """
        model = Course
        fields = '__all__'
