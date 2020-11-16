from rest_framework import viewsets
from sharednote.api.serializers import *
from ..models import *
from django.db.models import Count, Q


class CustomizeUserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomizeUserSerializer
    queryset = CustomizeUser.objects.all()

    def get_queryset(self):
        queryset = CustomizeUser.objects.all()
        email = self.request.query_params.get('email')
        if email:
            queryset = queryset.filter(user__email=email)
        return queryset


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteDynamicSerializer

    def get_queryset(self):
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


class CourseViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Course.objects.all()
        course_number = self.request.query_params.get('course_number')
        if course_number:
            queryset = queryset.filter(course_number=course_number)
        return queryset

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return CourseSerializer
        return CourseBaseSerializer


class VoteViewSet(viewsets.ModelViewSet):
    serializer_class = VoteSerializer
    queryset = Vote.objects.all()


