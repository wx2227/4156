from rest_framework import viewsets
from sharednote.api.serializers import *
from ..models import *


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        lion_mail = self.request.query_params.get('lion_mail')
        if lion_mail:
            queryset = queryset.filter(lion_mail=lion_mail)
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
        return queryset


class UpVoteViewSet(viewsets.ModelViewSet):
    serializer_class = UpVoteSerializer
    queryset = UpVote.objects.all()


class DownVoteViewSet(viewsets.ModelViewSet):
    serializer_class = DownVoteSerializer
    queryset = DownVote.objects.all()


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = Course.objects.all()
        course_name = self.request.query_params.get('course_name')
        if course_name:
            queryset = queryset.filter(course_name=course_name)
        return queryset



