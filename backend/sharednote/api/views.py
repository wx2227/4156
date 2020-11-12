from rest_framework import viewsets
from sharednote.api.serializers import *
from ..models import *


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class CommentedView(viewsets.ModelViewSet):
    serializer_class = CommentedSerializer
    queryset = Commented.objects.all()


class NoteView(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    queryset = User.objects.all()


class VoteView(viewsets.ModelViewSet):
    serializer_class = VoteSerializer
    queryset = Vote.objects.all()


class CourseView(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


class CourseNoteView(viewsets.ModelViewSet):
    serializer_class = CourseNoteSerializer
    queryset = CourseNote.objects.all()


class UploadView(viewsets.ModelViewSet):
    serializer_class = UploadSerializer
    queryset = Upload.objects.all()

