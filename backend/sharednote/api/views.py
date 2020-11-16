from rest_framework import viewsets
from sharednote.api.serializers import *
from ..models import *


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

    def get_queryset(self):
        queryset = Note.objects.all()
        course_number = self.request.query_params.get('course_number')
        if course_number:
            queryset = queryset.filter(course_number=course_number)
        return queryset

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return NoteDynamicSerializer
        return NoteBaseSerializer


class UpVoteViewSet(viewsets.ModelViewSet):
    serializer_class = UpVoteSerializer
    queryset = UpVote.objects.all()


class DownVoteViewSet(viewsets.ModelViewSet):
    serializer_class = DownVoteSerializer
    queryset = DownVote.objects.all()


class CourseViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        queryset = Course.objects.all()
        course_num = self.request.query_params.get('course_number')
        if course_num:
            queryset = queryset.filter(course_num=course_num)
        return queryset

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return CourseSerializer
        return CourseBaseSerializer


