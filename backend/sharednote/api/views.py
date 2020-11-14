from rest_framework import viewsets
from sharednote.api.serializers import *
from ..models import *
from django.contrib.auth import get_user_model
from drf_multiple_model.viewsets import FlatMultipleModelAPIViewSet


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomizeUserSerializer
    queryset = CustomizeUser.objects.all()

    def get_queryset(self):
        queryset = CustomizeUser.objects.all()
        email = self.request.query_params.get('email')
        if email:
            queryset = queryset.filter(user__email=email)
        return queryset

    # def get_queryset_base(self):
    #     return get_user_model().obkects.all()
    #
    # def get_queryset_customize(self):
    #     return CustomizeUser.objects.all()


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



