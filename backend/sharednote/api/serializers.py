'''
Define serialization format
'''
# pylint: disable=import-error
# pylint: disable=too-few-public-methods
# pylint: disable=no-member
# pylint: disable=missing-class-docstring
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, \
    IntegerField, SerializerMethodField
from django.contrib.auth import get_user_model
from sharednote.models import Note, Comment, Course, Vote, CustomizeUser, Favorite, Department


class CommentSerializer(ModelSerializer):
    user_info = SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'

    # pylint: disable=no-self-use
    def get_user_info(self, obj):
        """
        add the user_info fields to comment serializer
        :param obj:
        :return:
        """
        data = CustomizeUserSerializer(obj.user_id).data
        return data


class CommentBaseSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


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


class NoteBaseSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'user_id', 'course_number', 'file_name', 'file_url',
                  'description', 'time')


class FavoriteBaseSerializer(ModelSerializer):

    class Meta:
        model = Favorite
        fields = '__all__'
        validators = []

    # pylint: disable=no-self-use
    def create(self, validated_data):
        """
        Helper function for favorite,
        so user can create a vote or change a vote in one POST method

        :param validated_data: Dictionary containing the vote instance
        :return: A valid JSON object (a dictionary) containing votes information for a favorite
        """
        favorite = validated_data.pop('favorite')
        obj, _ = Favorite.objects.update_or_create(
            **validated_data,
            defaults={'favorite': favorite},
        )
        return obj


class NoteSerializer(ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    votes = VoteSerializer(many=True, read_only=True)
    favorites = FavoriteBaseSerializer(many=True, read_only=True)

    class Meta:
        model = Note
        fields = '__all__'


class NoteDynamicSerializer(NoteSerializer):
    up_votes = IntegerField()
    down_votes = IntegerField()
    course_info = SerializerMethodField(read_only=True)

    class Meta:
        model = Note
        fields = ('id', 'user_id', 'file_name',
                  'file_url', 'description', 'time', 'up_votes',
                  'down_votes', 'comments', 'favorites', 'course_info')

    # pylint: disable=no-self-use
    def get_course_info(self, obj):
        """
        add the course_info fields to note serializer
        :param obj:
        :return:
        """
        data = CourseBaseSerializer(obj.course_number).data
        return data


class FavoriteSerializer(ModelSerializer):
    note_info = SerializerMethodField(read_only=True)

    class Meta:
        model = Favorite
        fields = '__all__'

    # pylint: disable=no-self-use
    def get_note_info(self, obj):
        """
        add the note_info fields to note serializer
        :param obj:
        :return:
        """
        data = NoteBaseSerializer(obj.note_id).data
        return data


class UserSerializer(ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'first_name', 'last_name', 'email', 'is_superuser')


class CustomizeUserSerializer(ModelSerializer):
    notes = NoteBaseSerializer(many=True, read_only=True)
    favorites = FavoriteSerializer(many=True, read_only=True)
    comments = CommentBaseSerializer(many=True, read_only=True)

    class Meta:
        model = CustomizeUser
        fields = ('id', 'first_name', 'last_name', 'email', 'avatar', 'credits',
                  'is_superuser', 'nick_name', 'notes', 'favorites', 'comments')


class CourseBaseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

    # pylint: disable=no-self-use
    def create(self, validated_data):
        """
        Helper function for course,
        so user can create a vote or change a vote in one POST method

        :param validated_data: Dictionary containing the vote instance
        :return: A valid JSON object (a dictionary) containing votes information for a favorite
        """
        course_number = validated_data.pop('course_number')
        obj, _ = Course.objects.update_or_create(
            **validated_data,
            defaults={'course_number': course_number},
        )
        return obj


class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class DepartmentBaseSerializer(ModelSerializer):
    courses_detail = CourseBaseSerializer(many=True, read_only=True)
    courses = IntegerField()

    class Meta:
        model = Department
        fields = '__all__'


class DepartmentDynamicSerializer(DepartmentBaseSerializer):

    class Meta:
        model = Department
        fields = ('department_name', 'courses', 'url')


class CourseSerializer(ModelSerializer):
    notes = PrimaryKeyRelatedField(many=True, read_only=True)
    department_info = SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = '__all__'

