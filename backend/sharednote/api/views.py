from rest_framework import viewsets
from sharednote.api.serializers import *
from ..models import *


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class CommentedViewSet(viewsets.ModelViewSet):
    serializer_class = CommentedSerializer
    queryset = Commented.objects.all()


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    queryset = User.objects.all()


class VoteViewSet(viewsets.ModelViewSet):
    serializer_class = VoteSerializer
    queryset = Vote.objects.all()


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


class CourseNoteViewSet(viewsets.ModelViewSet):
    serializer_class = CourseNoteSerializer
    queryset = CourseNote.objects.all()


class UploadViewSet(viewsets.ModelViewSet):
    serializer_class = UploadSerializer
    queryset = Upload.objects.all()

