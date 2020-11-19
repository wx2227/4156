'''
Handle response format
'''
# pylint: disable=import-error
from rest_framework import viewsets
from django.db.models import Count, Q
from sharednote.api.serializers import CustomizeUserSerializer, CommentSerializer, \
    NoteDynamicSerializer, NoteBaseSerializer, CourseSerializer, \
    CourseBaseSerializer, VoteSerializer
from ..models import CustomizeUser, Comment, Note, Course, Vote


# pylint: disable=no-member
# pylint: disable=too-few-public-methods
class CustomizeUserViewSet(viewsets.ModelViewSet):
    """
    Define the format of response for customized user request
    """
    serializer_class = CustomizeUserSerializer
    queryset = CustomizeUser.objects.all()

    def get_queryset(self):
        """ Part of the Django requirement, get query set

        :return: The query set of customized user view
        """
        queryset = CustomizeUser.objects.all()
        email = self.request.query_params.get('email')
        identification = self.request.query_params.get('id')
        if email:
            queryset = queryset.filter(user__email=email)
        if identification:
            queryset = queryset.filter(user__id=identification)
        return queryset


# pylint: disable=no-member
# pylint: disable=too-few-public-methods
class CommentViewSet(viewsets.ModelViewSet):
    """
    Define the format of response for comment request
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


# pylint: disable=no-member
class NoteViewSet(viewsets.ModelViewSet):
    """
    Define the format of response for note request
    """
    def get_serializer_class(self):
        """ Part of the Django requirement, get query set serializer

        :return: A Serializer based on action type
        """
        if self.action == 'list' or self.action == 'retrieve':
            return NoteDynamicSerializer
        return NoteBaseSerializer

    def get_queryset(self):
        """ Return a queryset containing upvote and downvote number

        :return: queryset : object containing upvote and downvote number
        """
        queryset = Note.objects.all()
        course_number = self.request.query_params.get('course_number')
        if course_number:
            queryset = queryset.filter(course_number=course_number)

        up_votes = Count('votes', filter=Q(votes__vote=1))
        down_votes = Count('votes', filter=Q(votes__vote=-1))

        return queryset.annotate(
            up_votes=up_votes,
            down_votes=down_votes
        )


# pylint: disable=no-member
class CourseViewSet(viewsets.ModelViewSet):
    """
    Define the format of response for course request
    """
    def get_queryset(self):
        """ Get a query set of a course

        :return: queryset: A queryset object containing courses of certain course number
        """
        queryset = Course.objects.all()
        course_number = self.request.query_params.get('course_number')
        if course_number:
            queryset = queryset.filter(course_number=course_number)
        return queryset

    def get_serializer_class(self):
        """ Part of the Django requirement, get query set serializer

        :return: Serializer : A Serializer for course
        """
        if self.action == 'list' or self.action == 'retrieve':
            return CourseSerializer
        return CourseBaseSerializer


# pylint: disable=no-member
# pylint: disable=too-few-public-methods
class VoteViewSet(viewsets.ModelViewSet):
    """
    Define the format of response for vote request
    """
    def get_queryset(self):
        """ Get a query set of a Vote, with query params user_id and note_id

        :return: queryset: A queryset object containing courses of certain course number
        """
        queryset = Vote.objects.all()
        user_id = self.request.query_params.get('user_id')
        note_id = self.request.query_params.get('note_id')
        if user_id and note_id:
            queryset = queryset.filter(user_id=user_id, note_id=note_id)
        return queryset
    serializer_class = VoteSerializer
